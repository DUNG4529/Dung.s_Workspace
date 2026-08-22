import test, { describe, beforeEach, afterEach } from "node:test"
import assert from "node:assert"
import fs from "fs"
import path from "path"
import os from "os"
import { Assets } from "./assets"
import { BuildCtx } from "../../util/ctx"
import { FilePath } from "../../util/path"
import { QuartzConfig } from "../../cfg"

describe("Assets Emitter", () => {
  let tempDir: string
  let contentDir: string
  let outputDir: string

  beforeEach(async () => {
    tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "quartz-assets-test-"))
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

  test("emits assets located in an assets/ subdirectory next to markdown note", async () => {
    const noteDir = path.join(contentDir, "test-assets")
    const assetsDir = path.join(noteDir, "assets")
    await fs.promises.mkdir(assetsDir, { recursive: true })

    await fs.promises.writeFile(path.join(noteDir, "test.md"), "# Test\n![Test](assets/test.svg)")
    await fs.promises.writeFile(
      path.join(assetsDir, "test.svg"),
      '<svg><circle cx="50" cy="50" r="40" /></svg>',
    )

    const plugin = Assets()
    const ctx = makeMockCtx()

    const emitted: string[] = []
    for await (const dest of plugin.emit(ctx, [], {} as any) as AsyncGenerator<FilePath>) {
      emitted.push(dest)
    }

    const expectedDest = path.join(outputDir, "test-assets", "assets", "test.svg")
    assert.strictEqual(fs.existsSync(expectedDest), true)
    assert.strictEqual(
      await fs.promises.readFile(expectedDest, "utf8"),
      '<svg><circle cx="50" cy="50" r="40" /></svg>',
    )

    // Markdown file should NOT be emitted by Assets plugin
    const markdownDest = path.join(outputDir, "test-assets", "test.md")
    const markdownHtmlDest = path.join(outputDir, "test-assets", "test.html")
    assert.strictEqual(fs.existsSync(markdownDest), false)
    assert.strictEqual(fs.existsSync(markdownHtmlDest), false)
  })

  test("emits colocated assets directly next to markdown note", async () => {
    const noteDir = path.join(contentDir, "notes")
    await fs.promises.mkdir(noteDir, { recursive: true })

    await fs.promises.writeFile(path.join(noteDir, "note.md"), "# Note\n![Diagram](diagram.svg)")
    await fs.promises.writeFile(
      path.join(noteDir, "diagram.svg"),
      '<svg><rect width="10" height="10" /></svg>',
    )

    const plugin = Assets()
    const ctx = makeMockCtx()

    for await (const _dest of plugin.emit(ctx, [], {} as any) as AsyncGenerator<FilePath>) {}

    const expectedDest = path.join(outputDir, "notes", "diagram.svg")
    assert.strictEqual(fs.existsSync(expectedDest), true)
  })

  test("ignores files in directories matching ignorePatterns", async () => {
    const privateDir = path.join(contentDir, "private", "assets")
    const templatesDir = path.join(contentDir, "templates")
    await fs.promises.mkdir(privateDir, { recursive: true })
    await fs.promises.mkdir(templatesDir, { recursive: true })

    await fs.promises.writeFile(path.join(privateDir, "secret.png"), "image-bytes")
    await fs.promises.writeFile(path.join(templatesDir, "template-img.png"), "image-bytes")

    const plugin = Assets()
    const ctx = makeMockCtx()

    for await (const _dest of plugin.emit(ctx, [], {} as any) as AsyncGenerator<FilePath>) {}

    assert.strictEqual(fs.existsSync(path.join(outputDir, "private", "assets", "secret.png")), false)
    assert.strictEqual(fs.existsSync(path.join(outputDir, "templates", "template-img.png")), false)
  })

  test("partialEmit handles add, change, and delete events", async () => {
    const assetsDir = path.join(contentDir, "section", "assets")
    await fs.promises.mkdir(assetsDir, { recursive: true })

    const plugin = Assets()
    const ctx = makeMockCtx()

    // 1. Add event
    const svgContent = '<svg id="1"/>'
    await fs.promises.writeFile(path.join(assetsDir, "chart.svg"), svgContent)

    const partial = plugin.partialEmit
    if (partial) {
      for await (const _ of (partial(ctx, [], {} as any, [
        { type: "add", path: "section/assets/chart.svg" as FilePath },
      ]) as AsyncGenerator<FilePath>)) {}
    }

    const dest = path.join(outputDir, "section", "assets", "chart.svg")
    assert.strictEqual(fs.existsSync(dest), true)
    assert.strictEqual(await fs.promises.readFile(dest, "utf8"), svgContent)

    // 2. Change event
    const updatedContent = '<svg id="2"/>'
    await fs.promises.writeFile(path.join(assetsDir, "chart.svg"), updatedContent)

    if (partial) {
      for await (const _ of (partial(ctx, [], {} as any, [
        { type: "change", path: "section/assets/chart.svg" as FilePath },
      ]) as AsyncGenerator<FilePath>)) {}
    }
    assert.strictEqual(await fs.promises.readFile(dest, "utf8"), updatedContent)

    // 3. Delete event
    await fs.promises.unlink(path.join(assetsDir, "chart.svg"))
    if (partial) {
      for await (const _ of (partial(ctx, [], {} as any, [
        { type: "delete", path: "section/assets/chart.svg" as FilePath },
      ]) as AsyncGenerator<FilePath>)) {}
    }
    assert.strictEqual(fs.existsSync(dest), false)
  })
})
