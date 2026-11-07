import { useId, useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { midia, unidades, waLink } from "../data.js"
import { Barcode, IconBaixo, IconWhats, LoopVideo, Logo, easeOut, useUnidade } from "../ui.jsx"

function Linha({ texto, atraso = 0, className }) {
  const letras = Array.from(texto)
  return (
    <span className={`hero__linha ${className ?? ""}`} aria-hidden="true">
      {letras.map((l, i) => (
        <span className="hero__recorte" key={i}>
          <motion.span
            className="hero__letra"
            initial={{ y: "108%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.85, ease: easeOut, delay: atraso + i * 0.04 }}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function TrocaUnidade({ nome = "Escolha a unidade" }) {
  const { unidade, setUnidadeId } = useUnidade()
  const id = useId()
  return (
    <div className="troca" role="radiogroup" aria-label={nome}>
      {unidades.map((u) => {
        const ativo = u.id === unidade.id
        return (
          <button
            key={u.id}
            type="button"
            role="radio"
            aria-checked={ativo}
            className="troca__opcao"
            onClick={() => setUnidadeId(u.id)}
          >
            {ativo && (
              <motion.span
                layoutId={`troca-${id}`}
                className="troca__pilula"
                transition={{ type: "spring", bounce: 0.12, visualDuration: 0.38 }}
              />
            )}
            <span className="troca__texto">{u.cidade}</span>
          </button>
        )
      })}
    </div>
  )
}

export function Hero() {
  const { unidade } = useUnidade()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const reduzir = useReducedMotion()
  const y = useTransform(scrollYProgress, [0, 1], reduzir ? [0, 0] : [0, -70])
  const girar = useTransform(scrollYProgress, [0, 1], reduzir ? [-1, -1] : [-2.4, 1.2])
  const recorte = (de, para) => ({ initial: reduzir ? false : { clipPath: de }, animate: { clipPath: para } })

  return (
    <section className="hero" id="inicio" ref={ref}>
      <div className="hero__texto">
        <h1 className="hero__titulo" aria-label="Rei do piso e porcelanato">
          <Linha texto="REI DO" atraso={0.05} />
          <Linha texto="PISO" atraso={0.28} />
          <motion.span
            className="hero__faixa"
            aria-hidden="true"
            {...recorte("inset(0 100% 0 0)", "inset(0 0% 0 0)")}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.7 }}
          >
            E PORCELANATO
          </motion.span>
        </h1>

        <motion.p
          className="hero__lead"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.95 }}
        >
          Vendo 10 carretas de piso por mês. Tenho preço e cubro orçamentos.
          <span> Também somos fábrica de móveis em tricô náutico.</span>
        </motion.p>

        <motion.div
          className="hero__acao"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 1.1 }}
        >
          <div className="acao">
            <TrocaUnidade />
            <a
              className="btn btn--zap"
              href={waLink(unidade, "Olá! Vim pelo site da João da Roçadeira e quero um orçamento de piso.")}
              target="_blank"
              rel="noreferrer"
            >
              <IconWhats size={26} />
              <span>
                Chamar no WhatsApp
                <small>{unidade.fone}</small>
              </span>
            </a>
          </div>
          <a className="link-baixo" href="#calculadora">
            <IconBaixo size={18} />
            Calcular quantas caixas eu preciso
          </a>
        </motion.div>
      </div>

      <div className="hero__caixa">
        <motion.figure className="caixa" style={{ y, rotate: girar }}>
          <span className="caixa__fundo" aria-hidden="true" />
          <motion.div
            className="caixa__video"
            {...recorte("inset(100% 0 0 0)", "inset(0% 0 0 0)")}
            transition={{ duration: 1, ease: easeOut, delay: 0.35 }}
          >
            <LoopVideo src={midia.pisos.video} poster={midia.pisos.poster} eager />
          </motion.div>
          <span className="caixa__cinta" aria-hidden="true" />
          <motion.figcaption
            className="etiqueta"
            initial={{ opacity: 0, scale: 1.35, rotate: 7 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ duration: 0.5, ease: easeOut, delay: 1.25 }}
          >
            <span className="etiqueta__topo">
              <Logo tamanho={34} />
              <span>
                João da Roçadeira
                <small>Saquarema · Araruama / RJ</small>
              </span>
            </span>
            <span className="etiqueta__meio">Desde 1988</span>
            <Barcode texto={unidade.fone} className="etiqueta__barras" />
          </motion.figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
