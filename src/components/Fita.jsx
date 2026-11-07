import { useRef } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"
import { IconSeta } from "../ui.jsx"

const frases = [
  "Cubro orçamentos",
  "Desde 1988",
  "Saquarema",
  "Araruama",
  "Fábrica de móveis em tricô náutico",
]

function Grupo() {
  return (
    <span className="fita__grupo">
      {frases.map((f) => (
        <span className="fita__item" key={f}>
          {f}
          <i className="fita__quadro" aria-hidden="true" />
        </span>
      ))}
    </span>
  )
}

const VELOCIDADE_BASE = -3.2 // % do grupo por segundo

function enrolar(min, max, v) {
  const faixa = max - min
  return ((((v - min) % faixa) + faixa) % faixa) + min
}

export function Fita() {
  const reduzir = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocidade = useVelocity(scrollY)
  const suave = useSpring(velocidade, { damping: 50, stiffness: 400 })
  const fator = useTransform(suave, [-2000, 0, 2000], [-5, 0, 5], { clamp: false })
  const direcao = useRef(-1)

  const pausada = useRef(false)

  useAnimationFrame((_, delta) => {
    if (reduzir || pausada.current) return
    const f = fator.get()
    if (f > 0.2) direcao.current = -1
    else if (f < -0.2) direcao.current = 1
    const mover = direcao.current * Math.abs(VELOCIDADE_BASE) * (delta / 1000) * (1 + Math.abs(f))
    baseX.set(enrolar(-25, 0, baseX.get() + mover))
  })

  const x = useTransform(baseX, (v) => `${v}%`)

  return (
    <div
      className="fita"
      onPointerEnter={() => (pausada.current = true)}
      onPointerLeave={() => (pausada.current = false)}
      role="marquee" aria-label="Cubro orçamentos. Desde 1988. Saquarema e Araruama. Fábrica de móveis em tricô náutico.">
      <motion.div className="fita__trilho" style={{ x }} aria-hidden="true">
        <Grupo />
        <Grupo />
        <Grupo />
        <Grupo />
      </motion.div>
    </div>
  )
}

export function FaixaBlackFriday({ onAbrir }) {
  return (
    <div className="faixa-bf">
      <div className="faixa-bf__tira">
        <p>
          <strong>Black Friday na João da Roçadeira.</strong> Veja o vídeo da campanha.
        </p>
        <button type="button" className="faixa-bf__botao" onClick={onAbrir}>
          Ver o vídeo
          <IconSeta size={18} />
        </button>
      </div>
    </div>
  )
}
