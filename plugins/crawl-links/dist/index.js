// plugins/crawl-links/src/transformer.ts
import {
  stripSlashes,
  simplifySlug,
  splitAnchor,
  transformLink,
  isAbsoluteURL
} from "@quartz-community/utils";
import path from "path";
import { visit } from "unist-util-visit";
var defaultOptions = {
  markdownLinkResolution: "absolute",
  prettyLinks: true,
  openLinksInNewTab: false,
  lazyLoad: false,
  externalLinkIcon: true,
  disableBrokenWikilinks: false
};
var CrawlLinks = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts };
  return {
    name: "LinkProcessing",
    htmlPlugins(ctx) {
      return [
        () => {
          return (tree, file) => {
            const fileSlug = file.data.slug;
            const curSlug = simplifySlug(fileSlug);
            const outgoing = /* @__PURE__ */ new Set();
            const transformOptions = {
              strategy: opts.markdownLinkResolution,
              allSlugs: ctx.allSlugs
            };
            visit(tree, "element", (node) => {
              if (node.tagName === "a" && node.properties && typeof node.properties.href === "string") {
                let dest = node.properties.href;
                const classes = node.properties.className ?? [];
                const isExternal = isAbsoluteURL(dest);
                if (isExternal) {
                  classes.push("external", "external-link");
                } else {
                  classes.push("internal", "internal-link");
                }
                if (isExternal && opts.externalLinkIcon) {
                  node.children.push({
                    type: "element",
                    tagName: "svg",
                    properties: {
                      "aria-hidden": "true",
                      class: "external-icon",
                      style: "max-width:0.8em;max-height:0.8em",
                      viewBox: "0 0 512 512"
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "path",
                        properties: {
                          d: "M320 0H288V64h32 82.7L201.4 265.4 178.7 288 224 333.3l22.6-22.6L448 109.3V192v32h64V192 32 0H480 320zM32 32H0V64 480v32H32 456h32V480 352 320H424v32 96H64V96h96 32V32H160 32z"
                        },
                        children: []
                      }
                    ]
                  });
                }
                const firstChild = node.children[0];
                if (node.children.length === 1 && firstChild?.type === "text" && firstChild.value !== dest) {
                  classes.push("alias");
                }
                node.properties.className = classes;
                if (isExternal && opts.openLinksInNewTab) {
                  node.properties.target = "_blank";
                }
                const isInternal = !(isAbsoluteURL(dest) || dest.startsWith("#"));
                if (isInternal) {
                  dest = node.properties.href = transformLink(fileSlug, dest, transformOptions);
                  const url = new URL(dest, "https://base.com/" + stripSlashes(curSlug, true));
                  const canonicalDest = url.pathname;
                  const [destCanonicalRaw, _destAnchor] = splitAnchor(canonicalDest);
                  let destCanonical = destCanonicalRaw;
                  if (destCanonical.endsWith("/")) {
                    destCanonical += "index";
                  }
                  const full = decodeURIComponent(stripSlashes(destCanonical, true));
                  const simple = simplifySlug(full);
                  outgoing.add(simple);
                  node.properties["data-slug"] = full;
                  if (opts.disableBrokenWikilinks && !ctx.allSlugs.includes(full)) {
                    classes.push("broken");
                    node.properties.className = classes;
                  }
                }
                if (opts.prettyLinks && isInternal && node.children.length === 1) {
                  const textChild = node.children[0];
                  if (textChild?.type === "text" && !textChild.value.startsWith("#")) {
                    textChild.value = path.basename(textChild.value);
                  }
                }
              }
              if (["img", "video", "audio", "iframe", "embed"].includes(node.tagName) && node.properties && typeof node.properties.src === "string") {
                if (opts.lazyLoad) {
                  node.properties.loading = "lazy";
                }
                if (!isAbsoluteURL(node.properties.src)) {
                  let dest = node.properties.src;
                  dest = node.properties.src = transformLink(fileSlug, dest, transformOptions);
                  node.properties.src = dest;
                }
              }
              if (node.tagName === "object" && node.properties && typeof node.properties.data === "string") {
                if (!isAbsoluteURL(node.properties.data)) {
                  let dest = node.properties.data;
                  dest = node.properties.data = transformLink(fileSlug, dest, transformOptions);
                  node.properties.data = dest;
                }
              }
            });
            const frontmatterLinks = file.data.frontmatterLinks ?? [];
            for (const fmLink of frontmatterLinks) {
              const [targetRaw] = splitAnchor(fmLink);
              if (!targetRaw) continue;
              const dest = transformLink(fileSlug, targetRaw, transformOptions);
              const url = new URL(dest, "https://base.com/" + stripSlashes(curSlug, true));
              const [canonicalRaw] = splitAnchor(url.pathname);
              let canonical = canonicalRaw;
              if (canonical.endsWith("/")) canonical += "index";
              const full = decodeURIComponent(stripSlashes(canonical, true));
              outgoing.add(simplifySlug(full));
            }
            file.data.links = [...outgoing];
          };
        }
      ];
    }
  };
};
export {
  CrawlLinks
};
