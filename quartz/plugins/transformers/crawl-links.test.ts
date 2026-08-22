import test, { describe, beforeEach, afterEach } from "node:test"
import assert from "node:assert"
import fs from "fs"
import path from "path"
import os from "os"
import { visit } from "unist-util-visit"
import { CrawlLinks } from "../../../plugins/crawl-links/src/transformer"
import { Assets } from "../emitters/assets"
import { BuildCtx } from "../../util/ctx"
import { FilePath, FullSlug, slugifyFilePath } from "../../util/path"
import { QuartzConfig } from "../../cfg"
import { VFile } from "vfile"
import type { Root as HTMLRoot, Element } from "hast"

describe("CrawlLinks - SVG object[data] Resolution", () => {
  let tempDir: string
  let contentDir: string
  let outputDir: string

  beforeEach(async () => {
    tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "quartz-crawllinks-test-"))
    contentDir = path.join(tempDir, "content")
    outputDir = path.join(tempDir, "public")
    await fs.promises.mkdir(contentDir, { recursive: true })
    await fs.promises.mkdir(outputDir, { recursive: true })
  })

  afterEach(async () => {
    await fs.promises.rm(tempDir, { recursive: true, force: true })
  })

  function makeMockCtx(overrides?: Partial<BuildCtx>): BuildCtx {
    const mockCfg = {
      configuration: {
        pageTitle: "Test",
        enableSPA: true,
        enablePopovers: true,
        analytics: null,
        locale: "en-US",
        baseUrl: "localhost",
        ignorePatterns: ["private", "templates", ".obsidian"],
        theme: {
          typography: { header: "sans", body: "sans", code: "mono" },
          colors: { lightMode: {} as any, darkMode: {} as any },
          fontOrigin: "googleFonts",
        },
      },
      plugins: {
        transformers: [],
        filters: [],
        emitters: [],
        pageTypes: [],
      },
    } as unknown as QuartzConfig

    return {
      buildId: "test-build",
      argv: {
        directory: contentDir,
        verbose: false,
        output: outputDir,
        serve: false,
        port: 8080,
        wsPort: 3001,
        watch: false,
      },
      cfg: mockCfg,
      allSlugs: [],
      allFiles: [],
      incremental: false,
      virtualPages: [],
      ...overrides,
    }
  }

  test("transforms <object data='...'> pointing to note-local assets/ SVG", async () => {
    const noteSlug = "mas291/material/11-regression-analysis/11-0-overview" as FullSlug
    const assetSlug = "mas291/material/11-regression-analysis/assets/11-0-overview.diagram-1.svg" as FullSlug

    const ctx = makeMockCtx({
      allSlugs: [noteSlug, assetSlug],
    })

    const plugin = CrawlLinks({ markdownLinkResolution: "shortest" })
    const htmlPlugins = plugin.htmlPlugins!(ctx)

    const file = new VFile({
      data: {
        slug: noteSlug,
      },
    })

    const hast: HTMLRoot = {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "object",
          properties: {
            data: "11-0-overview.diagram-1.svg",
            type: "image/svg+xml",
          },
          children: [],
        },
      ],
    }

    const transformerFn = (htmlPlugins[0] as () => (tree: HTMLRoot, file: VFile) => void)()
    transformerFn(hast, file)

    const objectNode = hast.children[0] as Element
    assert.strictEqual(
      objectNode.properties.data,
      "../../../mas291/material/11-regression-analysis/assets/11-0-overview.diagram-1.svg",
      "object data attribute should be resolved to the note-local assets/ directory path",
    )
  })

  test("preserves external URLs in <object data='...'>", async () => {
    const noteSlug = "my-note" as FullSlug
    const ctx = makeMockCtx({
      allSlugs: [noteSlug],
    })

    const plugin = CrawlLinks({ markdownLinkResolution: "shortest" })
    const htmlPlugins = plugin.htmlPlugins!(ctx)

    const file = new VFile({
      data: {
        slug: noteSlug,
      },
    })

    const externalUrl = "https://example.com/diagram.svg"
    const hast: HTMLRoot = {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "object",
          properties: {
            data: externalUrl,
            type: "image/svg+xml",
          },
          children: [],
        },
      ],
    }

    const transformerFn = (htmlPlugins[0] as () => (tree: HTMLRoot, file: VFile) => void)()
    transformerFn(hast, file)

    const objectNode = hast.children[0] as Element
    assert.strictEqual(objectNode.properties.data, externalUrl, "External URLs must not be modified")
  })

  test("end-to-end: emits SVG into public/ and resolves HTML AST <object data='...'> to assets/ path", async () => {
    const sectionDir = path.join(contentDir, "mas291", "material", "11 - regression analysis")
    const assetsDir = path.join(sectionDir, "assets")
    await fs.promises.mkdir(assetsDir, { recursive: true })

    const notePath = path.join(sectionDir, "11. 0 - Overview.md")
    const svgPath = path.join(assetsDir, "11. 0 - Overview.diagram-1.svg")
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="5"/></svg>'

    await fs.promises.writeFile(
      notePath,
      "# Overview\n\n![[11. 0 - Overview.diagram-1.svg]]",
    )
    await fs.promises.writeFile(svgPath, svgContent)

    const noteRelativePath = "mas291/material/11 - regression analysis/11. 0 - Overview.md" as FilePath
    const svgRelativePath = "mas291/material/11 - regression analysis/assets/11. 0 - Overview.diagram-1.svg" as FilePath

    const noteSlug = slugifyFilePath(noteRelativePath)
    const svgSlug = slugifyFilePath(svgRelativePath)

    const ctx = makeMockCtx({
      allFiles: [noteRelativePath, svgRelativePath],
      allSlugs: [noteSlug, svgSlug],
    })

    // 1. Verify Assets emitter copies the SVG to public/
    const assetsPlugin = Assets()
    for await (const _ of assetsPlugin.emit(ctx, [], {} as any) as AsyncGenerator<FilePath>) {}

    const expectedPublicSvg = path.join(
      outputDir,
      "mas291",
      "material",
      "11---regression-analysis",
      "assets",
      "11.-0---overview.diagram-1.svg",
    )
    assert.strictEqual(fs.existsSync(expectedPublicSvg), true, "SVG asset must be emitted to public/ folder")
    assert.strictEqual(
      await fs.promises.readFile(expectedPublicSvg, "utf8"),
      svgContent,
      "Emitted SVG content must match source",
    )

    // 2. Verify CrawlLinks transforms the HTML AST <object data="...">
    const crawlLinksPlugin = CrawlLinks({ markdownLinkResolution: "shortest" })
    const htmlPlugins = crawlLinksPlugin.htmlPlugins!(ctx)

    const file = new VFile({
      data: {
        slug: noteSlug,
      },
    })

    const hast: HTMLRoot = {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "object",
          properties: {
            data: "11.-0---overview.diagram-1.svg",
            type: "image/svg+xml",
          },
          children: [],
        },
      ],
    }

    const transformFn = (htmlPlugins[0] as () => (tree: HTMLRoot, file: VFile) => void)()
    transformFn(hast, file)

    let foundObjectData: string | undefined
    visit(hast, "element", (node: Element) => {
      if (node.tagName === "object" && typeof node.properties?.data === "string") {
        foundObjectData = node.properties.data
      }
    })

    const expectedResolvedPath =
      "../../../mas291/material/11---regression-analysis/assets/11.-0---overview.diagram-1.svg"
    assert.strictEqual(
      foundObjectData,
      expectedResolvedPath,
      "HTML AST <object data='...'> must resolve to the correct note-local assets/ path",
    )
  })
})
