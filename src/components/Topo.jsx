import { useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { waLink } from "../data.js"
import { IconWhats, Logo, easeOut, useUnidade } from "../ui.jsx"

const links = [
  { href: "#linhas", nome: "Linhas" },
  { href: "#calculadora", nome: "Calculadora" },
  { href: "#videos", nome: "Vídeos" },
  { href: "#unidades", nome: "Unidades" },
]

export function Topo() {
  const { unidade } = useUnidade()
  const { scrollY } = useScroll()
  const [oculto, setOculto] = useState(false)
  const [solido, setSolido] = useState(false)
  const [aberto, setAberto] = useState(false)

  useMotionValueEvent(scrollY, "change", (y) => {
    const anterior = scrollY.getPrevious() ?? 0
    setSolido(y > 48)
    setOculto(y > anterior && y > 320 && !aberto)
  })

  return (
    <motion.header
      className="topo"
      data-solido={solido}
      data-oculto={oculto}
      animate={{ y: oculto ? "-105%" : "0%" }}
      transition={{ duration: 0.32, ease: easeOut }}
    >
      <a className="topo__marca" href="#inicio" aria-label="João da Roçadeira, início">
        <Logo tamanho={52} />
        <span className="topo__nome">
          João da
          <br />
          Roçadeira
        </span>
      </a>

      <nav className="topo__nav" aria-label="Principal">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.nome}
          </a>
        ))}
      </nav>

      <div className="topo__acoes">
        <a
          className="btn btn--zap btn--compacto"
          href={waLink(unidade, "Olá! Vim pelo site da João da Roçadeira.")}
          target="_blank"
          rel="noreferrer"
        >
          <IconWhats size={20} />
          <span>
            WhatsApp <b>{unidade.cidade}</b>
          </span>
        </a>
        <button
          type="button"
          className="topo__menu"
          aria-expanded={aberto}
          aria-controls="menu-movel"
          onClick={() => setAberto((a) => !a)}
        >
          <span className="topo__menu-barras" data-aberto={aberto} aria-hidden="true" />
          <span className="sr-only">{aberto ? "Fechar menu" : "Abrir menu"}</span>
        </button>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.nav
            id="menu-movel"
            className="menu-movel"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.38, ease: easeOut }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setAberto(false)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: easeOut }}
              >
                {l.nome}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
