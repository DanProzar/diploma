import { type H3Event, defineEventHandler } from 'h3'
import MobileDetect from 'mobile-detect'
import { SSR_BREAKPOINT } from '@/types'

/**
 * Serverhandler that tries to guess the breakpoint for the request
 * and saves it to the nuxt cache context
 */
export default defineEventHandler(async (event: H3Event) => {
  const headers = event.node.req.headers
  let breakpoint = SSR_BREAKPOINT.Desktop
  if (headers['user-agent']) {
    const mobileDetect = new MobileDetect(headers['user-agent'])
    if (mobileDetect.mobile() && !mobileDetect.tablet()) {
      breakpoint = SSR_BREAKPOINT.Mobile
    } else if (mobileDetect.tablet()) {
      breakpoint = SSR_BREAKPOINT.Tablet
    }
    if (!event.context.nuxtCacheContext) {
      event.context.nuxtCacheContext = {}
    }
  }
  event.context.nuxtCacheContext.breakpoint = breakpoint
  event.context.breakpoint = breakpoint
})
