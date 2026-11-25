import { useEffect, useState } from 'react'

/* A tiny path-based router — enough for the marketing pages without pulling
   in a full routing library. Supports clean URLs plus cross-page #anchors. */

export const normalizePath = (path) => {
  const clean = path.replace(/\/+$/, '')
  return clean || '/'
}

const readLocation = () => ({
  path: normalizePath(window.location.pathname),
  hash: window.location.hash,
  search: window.location.search,
})

export function scrollToTarget(hash) {
  const id = hash?.replace(/^#/, '')
  if (!id) return
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -120 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function scrollToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
  else window.scrollTo({ top: 0, behavior: 'auto' })
}

export function useRoute() {
  const [route, setRoute] = useState(readLocation)

  useEffect(() => {
    const onPop = () => setRoute(readLocation())

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = event.target.closest?.('a[href]')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const href = anchor.getAttribute('href')
      // In-page hashes are handled by the Lenis click handler in App.
      if (!href || href.startsWith('#') || /^(?:https?:|mailto:|tel:)/i.test(href)) return

      const url = new URL(href, window.location.origin)
      if (url.origin !== window.location.origin) return

      event.preventDefault()

      const next = { path: normalizePath(url.pathname), hash: url.hash, search: url.search }
      const samePath = next.path === normalizePath(window.location.pathname)

      window.history.pushState({}, '', url.pathname + url.search + url.hash)
      setRoute(next)

      // The scroll effect only re-runs when path/hash changes — if both are
      // unchanged (or only the path is), nudge the viewport here.
      if (samePath && next.hash) requestAnimationFrame(() => scrollToTarget(next.hash))
      if (samePath && !next.hash) scrollToTop()
    }

    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPop)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  return route
}

export function useRouteScroll(route) {
  useEffect(() => {
    // Let the new page paint before measuring anchor positions.
    const timer = window.setTimeout(() => {
      if (route.hash) scrollToTarget(route.hash)
      else scrollToTop()
    }, 80)
    return () => window.clearTimeout(timer)
  }, [route.path, route.hash])
}
