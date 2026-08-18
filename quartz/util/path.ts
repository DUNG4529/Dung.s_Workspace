import {
  isFilePath,
  isFullSlug,
  isSimpleSlug,
  isRelativeURL,
  isAbsoluteURL,
  getFullSlug,
  slugifyFilePath,
  simplifySlug,
  joinSegments,
  endsWith,
  trimSuffix,
  stripSlashes,
  getFileExtension,
  isFolderPath,
  getAllSegmentPrefixes,
  pathToRoot,
  resolveRelative,
  splitAnchor,
  slugTag,
  normalizeHastElement,
} from "@quartz-community/utils"
import type {
  FilePath,
  FullSlug,
  SimpleSlug,
  RelativeURL,
  TransformOptions,
} from "@quartz-community/utils"

export {
  isFilePath,
  isFullSlug,
  isSimpleSlug,
  isRelativeURL,
  isAbsoluteURL,
  getFullSlug,
  slugifyFilePath,
  simplifySlug,
  joinSegments,
  endsWith,
  trimSuffix,
  stripSlashes,
  getFileExtension,
  isFolderPath,
  getAllSegmentPrefixes,
  pathToRoot,
  resolveRelative,
  splitAnchor,
  slugTag,
  normalizeHastElement,
}

export type { FilePath, FullSlug, SimpleSlug, RelativeURL, TransformOptions }

function _isRelativeSegment(s: string): boolean {
  return /^\.{0,2}$/.test(s)
}

function _addRelativeToStart(s: string): string {
  if (s === "") {
    s = "."
  }
  if (!s.startsWith(".")) {
    s = joinSegments(".", s)
  }
  return s
}

function _getPosixDirname(s: string): string {
  const lastSlash = s.lastIndexOf("/")
  return lastSlash === -1 ? "" : s.slice(0, lastSlash)
}

function _normalizePosixPath(s: string): string {
  const parts = s.split("/")
  const normalizedParts: string[] = []
  for (const part of parts) {
    if (part === "." || part === "") continue
    if (part === "..") {
      if (normalizedParts.length > 0 && normalizedParts[normalizedParts.length - 1] !== "..") {
        normalizedParts.pop()
      } else {
        normalizedParts.push("..")
      }
    } else {
      normalizedParts.push(part)
    }
  }
  return normalizedParts.join("/")
}

export function transformInternalLink(link: string): RelativeURL {
  const [fplike, anchor] = splitAnchor(decodeURI(link))
  const segments = fplike.split("/").filter((x) => x.length > 0)
  const prefix = segments.filter(_isRelativeSegment).join("/")
  const fp = segments.filter((seg) => !_isRelativeSegment(seg) && seg !== "").join("/")
  const slugged = slugifyFilePath(fp as FilePath)
  const simpleSlug = simplifySlug(slugged)
  const folderPath = isFolderPath(fplike) || isFolderPath(slugged)
  const joined = joinSegments(stripSlashes(prefix), stripSlashes(simpleSlug))
  const trail = folderPath ? "/" : ""
  const res = _addRelativeToStart(joined) + trail + anchor
  return res as RelativeURL
}

export function transformLink(
  src: FullSlug,
  target: string,
  opts: TransformOptions,
): RelativeURL {
  const targetSlug = transformInternalLink(target)
  if (opts.strategy === "relative") {
    return targetSlug
  }

  const effectiveSrc =
    !endsWith(src, "index") && opts.allSlugs.includes(`${src}/index` as FullSlug)
      ? (`${src}/index` as FullSlug)
      : src

  const [rawPath, targetAnchor] = splitAnchor(decodeURI(target))
  const isExplicitRootRelative = rawPath.startsWith("/")
  const isFolderTarget = isFolderPath(targetSlug)

  // Clean canonicalSlug from targetSlug
  let canonicalSlug = targetSlug as string
  if (canonicalSlug.startsWith("./")) {
    canonicalSlug = canonicalSlug.slice(2)
  } else if (canonicalSlug.startsWith(".")) {
    canonicalSlug = canonicalSlug.slice(1)
  }
  canonicalSlug = stripSlashes(canonicalSlug)
  const [targetCanonical] = splitAnchor(canonicalSlug)

  // 1. If target is relative to current directory (or explicitly ./ or ../, or an asset/file next to the note)
  const srcDir = _getPosixDirname(effectiveSrc)

  if (!isExplicitRootRelative && rawPath !== "index") {
    const rawRelativePath = rawPath.startsWith("./") ? rawPath.slice(2) : rawPath
    const normalizedRelative = _normalizePosixPath(
      srcDir ? `${srcDir}/${rawRelativePath}` : rawRelativePath,
    )

    if (!normalizedRelative.startsWith("../")) {
      const relativeSlug = slugifyFilePath(normalizedRelative as FilePath)
      const simpleRelativeSlug = simplifySlug(relativeSlug)

      // Check if this relative path exists in allSlugs (either as full slug or simplified folder slug)
      if (
        opts.allSlugs.includes(relativeSlug) ||
        opts.allSlugs.includes(simpleRelativeSlug as FullSlug)
      ) {
        const matchedSlug = opts.allSlugs.includes(relativeSlug)
          ? relativeSlug
          : (simpleRelativeSlug as FullSlug)
        return (resolveRelative(effectiveSrc, matchedSlug) + targetAnchor) as RelativeURL
      }

      if (isFolderTarget) {
        const withIndex = `${relativeSlug}/index` as FullSlug
        if (opts.allSlugs.includes(withIndex)) {
          return (resolveRelative(effectiveSrc, withIndex) + targetAnchor) as RelativeURL
        }
      }
    }
  }

  // 2. Shortest strategy: search across allSlugs
  if (opts.strategy === "shortest") {
    const isMultiSegment = targetCanonical.includes("/")
    const matchingFileNames = opts.allSlugs.filter((slug) => {
      if (isMultiSegment) {
        if (slug === targetCanonical || slug.endsWith("/" + targetCanonical)) {
          return true
        }
        if (isFolderTarget) {
          const withIndex = targetCanonical + "/index"
          return slug === withIndex || slug.endsWith("/" + withIndex)
        }
        return false
      }
      const parts = slug.split("/")
      const fileName = parts.at(-1)
      return targetCanonical === fileName
    })

    if (matchingFileNames.length === 1) {
      const matchedSlug = matchingFileNames[0]
      return (resolveRelative(effectiveSrc, matchedSlug) + targetAnchor) as RelativeURL
    } else if (matchingFileNames.length > 1) {
      // If multiple files match shortest, prefer the one closest to effectiveSrc (longest common prefix)
      const srcSegments = effectiveSrc.split("/")
      let bestMatch = matchingFileNames[0]
      let bestScore = -1
      for (const match of matchingFileNames) {
        const matchSegments = match.split("/")
        let score = 0
        while (
          score < srcSegments.length &&
          score < matchSegments.length &&
          srcSegments[score] === matchSegments[score]
        ) {
          score++
        }
        if (score > bestScore) {
          bestScore = score
          bestMatch = match
        }
      }
      return (resolveRelative(effectiveSrc, bestMatch) + targetAnchor) as RelativeURL
    }
  }

  // 3. Fallback: absolute resolution from root
  const folderTail = isFolderTarget || targetCanonical === "" ? "/" : ""
  return (joinSegments(pathToRoot(effectiveSrc), targetCanonical) +
    folderTail +
    targetAnchor) as RelativeURL
}

export type {
  FilePath,
  FullSlug,
  SimpleSlug,
  RelativeURL,
  TransformOptions,
} from "@quartz-community/utils"

// --- v5-specific exports below ---

export const QUARTZ = "quartz"

// from micromorph/src/utils.ts
// https://github.com/natemoo-re/micromorph/blob/main/src/utils.ts#L5
const _rebaseHtmlElement = (el: Element, attr: string, newBase: string | URL) => {
  const rebased = new URL(el.getAttribute(attr)!, newBase)
  el.setAttribute(attr, rebased.pathname + rebased.hash)
}
export function normalizeRelativeURLs(el: Element | Document, destination: string | URL) {
  el.querySelectorAll('[href=""], [href^="./"], [href^="../"]').forEach((item) => {
    _rebaseHtmlElement(item, "href", destination)
  })
  el.querySelectorAll('[src=""], [src^="./"], [src^="../"]').forEach((item) => {
    _rebaseHtmlElement(item, "src", destination)
  })
}
