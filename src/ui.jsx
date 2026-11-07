import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"

export const easeOut = [0.16, 1, 0.3, 1]

export const UnidadeContext = createContext(null)
export const useUnidade = () => useContext(UnidadeContext)

export const SomContext = createContext(null)
export const useSom = () => useContext(SomContext)

function visivelDe(video) {
  const r = video.getBoundingClientRect()
  return Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0)
}

function escolherVideo(videos) {
  const ativos = videos.filter((v) => v.hasAttribute("data-som-ativo"))
  const visiveis = (lista) =>
    lista
      .map((v) => ({ v, visivel: visivelDe(v) }))
      .filter((item) => item.visivel > 48)
      .sort((a, b) => b.visivel - a.visivel)
  const preferidos = visiveis(ativos)
  if (preferidos.length) return preferidos[0].v
  const qualquer = visiveis(videos)
  return qualquer[0]?.v ?? null
}

function aplicarSom(ligado) {
  const videos = [...document.querySelectorAll("video[data-som]")]
  if (!ligado) {
    for (const v of videos) v.muted = true
    return
  }
  const dono = escolherVideo(videos)
  for (const v of videos) {
    if (v === dono) {
      v.muted = false
      v.volume = 1
      v.play().catch(() => {})
    } else {
      v.muted = true
    }
  }
}

export function SomProvider({ children }) {
  const [comSom, setComSom] = useState(false)
  const comSomRef = useRef(false)
  comSomRef.current = comSom

  const setSom = (ligado) => {
    aplicarSom(ligado)
    setComSom(ligado)
  }

  const toggleSom = () => setSom(!comSomRef.current)

  useEffect(() => {
    const onScroll = () => {
      if (comSomRef.current) aplicarSom(true)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const valor = useMemo(() => ({ comSom, setSom, toggleSom, atualizar: () => aplicarSom(comSomRef.current) }), [comSom])

  return <SomContext.Provider value={valor}>{children}</SomContext.Provider>
}

export function useMedia(query) {
  const [ok, setOk] = useState(() => (typeof window === "undefined" ? false : window.matchMedia(query).matches))
  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setOk(m.matches)
    on()
    m.addEventListener("change", on)
    return () => m.removeEventListener("change", on)
  }, [query])
  return ok
}

export function IconWhats({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.5a9.4 9.4 0 0 0-8.05 14.26L2.6 21.4l4.78-1.3A9.4 9.4 0 1 0 12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 7.9c-.3-.6-.6-.6-.9-.6-.25 0-.5 0-.77.3-.26.3-1 1-1 2.4 0 1.4 1 2.8 1.15 3 .14.2 2 3.2 4.95 4.35 2.45.97 2.95.78 3.48.73.53-.05 1.7-.7 1.95-1.38.24-.68.24-1.27.17-1.4-.07-.12-.27-.2-.57-.35-.3-.15-1.7-.84-1.97-.93-.27-.1-.47-.15-.67.15-.2.3-.77.93-.94 1.12-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.78-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.6-.9-2.17Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconInsta({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  )
}

export function IconSeta({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15M13 5.5 19.5 12 13 18.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
    </svg>
  )
}

export function IconBaixo({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v15M5.5 13 12 19.5 18.5 13" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
    </svg>
  )
}

export function IconPlay({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4.5v15l12.5-7.5L7 4.5Z" fill="currentColor" />
    </svg>
  )
}

export function IconPause({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="4.5" width="4.2" height="15" fill="currentColor" />
      <rect x="13.8" y="4.5" width="4.2" height="15" fill="currentColor" />
    </svg>
  )
}

export function IconExterno({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 5h11v11M19 5 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  )
}

export function IconSom({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 9.2h3.1L12.4 5v14L7.6 14.8H4.5V9.2Z" fill="currentColor" />
      <path d="M15.4 9.2c1.3 1.2 1.3 4.4 0 5.6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square" />
      <path d="M17.8 7c2.2 2.1 2.2 7.9 0 10" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square" />
    </svg>
  )
}

export function IconMudo({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 9.2h3.1L12.4 5v14L7.6 14.8H4.5V9.2Z" fill="currentColor" />
      <path d="M16 9.2 21 15.2M21 9.2 16 15.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square" />
    </svg>
  )
}

/* Barras decorativas derivadas de um texto (aria-hidden): etiqueta de remessa. */
export function Barcode({ texto, height = 34, className }) {
  const larguras = []
  const base = `${texto}`.replace(/\s+/g, "")
  for (let i = 0; i < 44; i++) {
    const c = base.charCodeAt(i % base.length) + i * 7
    larguras.push(1 + (c % 4))
  }
  let x = 0
  const barras = []
  larguras.forEach((w, i) => {
    if (i % 2 === 0) barras.push(<rect key={i} x={x} y="0" width={w} height={height} />)
    x += w
  })
  return (
    <svg
      className={className}
      viewBox={`0 0 ${x} ${height}`}
      preserveAspectRatio="none"
      height={height}
      aria-hidden="true"
      fill="currentColor"
    >
      {barras}
    </svg>
  )
}

/* Video em loop: toca só quando visível; o mudo fica a cargo do SomProvider. */
export function LoopVideo({ src, poster, ativo = true, eager = false, className, ...rest }) {
  const ref = useRef(null)
  const reduzir = useReducedMotion()
  const som = useSom()
  const somRef = useRef(som)
  somRef.current = som

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
  }, [src])

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (reduzir || !ativo) {
      v.pause()
      v.muted = true
      somRef.current?.atualizar()
      return
    }
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          v.play().catch(() => {})
          somRef.current?.atualizar()
        } else {
          v.pause()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [ativo, reduzir, src])

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      data-som
      {...(ativo ? { "data-som-ativo": "" } : {})}
      loop
      playsInline
      preload={eager ? "auto" : "metadata"}
      aria-hidden="true"
      tabIndex={-1}
      {...rest}
    />
  )
}

export function Logo({ tamanho = 56, className = "" }) {
  return (
    <img
      className={`logo-disco ${className}`}
      src="/media/logo-150.jpg"
      width={tamanho}
      height={tamanho}
      alt="João da Roçadeira, desde 1988"
    />
  )
}
