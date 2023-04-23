import { SSR_BREAKPOINT } from '@/types'

export function getBreakpointFromSsrBreakpoint (
  ssrBreakpoint: SSR_BREAKPOINT,
) {
  let breakpoint

  switch (ssrBreakpoint) {
    case SSR_BREAKPOINT.Mobile:
      breakpoint = 'xs'
      break
    case SSR_BREAKPOINT.Tablet:
      breakpoint = 'md'
      break
    case SSR_BREAKPOINT.Desktop:
      breakpoint = 'xl'
      break
    default:
      breakpoint = 'xs'
      break
  }

  return {
    name: breakpoint,
    xs: breakpoint === 'xs',
    sm: false,
    md: breakpoint === 'md',
    lg: false,
    xl: breakpoint === 'xl',
    xxl: false,
    smAndUp: ['sm', 'md', 'lg', 'xl', 'xxl'].includes(breakpoint),
    mdAndUp: ['md', 'lg', 'xl', 'xxl'].includes(breakpoint),
    lgAndUp: ['lg', 'xl', 'xxl'].includes(breakpoint),
    xlAndUp: ['xl', 'xxl'].includes(breakpoint),
    smAndDown: ['xs', 'sm'].includes(breakpoint),
    mdAndDown: ['xs', 'sm', 'md'].includes(breakpoint),
    lgAndDown: ['xs', 'sm', 'md', 'lg'].includes(breakpoint),
    xlAndDown: ['xs', 'sm', 'md', 'lg', 'xl'].includes(breakpoint),
  }
}
