import type { QuartzTransformerPlugin } from "@quartz-community/types"
import type { TransformOptions } from "@quartz-community/utils"

export interface CrawlLinksOptions {
  markdownLinkResolution: TransformOptions["strategy"]
  prettyLinks: boolean
  openLinksInNewTab: boolean
  lazyLoad: boolean
  externalLinkIcon: boolean
  disableBrokenWikilinks: boolean
}

export declare const CrawlLinks: QuartzTransformerPlugin<Partial<CrawlLinksOptions>>
