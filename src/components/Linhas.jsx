import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { linhas, tambem, waLink } from "../data.js"
import { IconWhats, LoopVideo, easeOut, useMedia, useUnidade } from "../ui.jsx"

const mola = { type: "spring", bounce: 0.1, visualDuration: 0.55 }

function Caixa({ linha, ativa, estreita, onAtivar, indice }) {
  const { unidade } = useUnidade()
  const painelId = `linha-${linha.id}`

  const alvo = estreita
    ? { height: ativa ? 470 : 84 }
    : { flexGrow: ativa ? 4.2 : 1, flexBasis: 0 }

  return (
    <motion.article
      className="carton"
      data-ativa={ativa}
      initial={false}
      animate={alvo}
      transition={mola}
      onMouseEnter={estreita ? undefined : onAtivar}
    >
      <div className="carton__midia" aria-hidden="true">
        <LoopVideo
          src={linha.midia.video}
          poster={linha.midia.poster}
          ativo={ativa}
          className="carton__video"
        />
      </div>
      <span className="carton__cinta" aria-hidden="true" />

      <button
        type="button"
        className="carton__titulo"
        aria-expanded={ativa}
        aria-controls={painelId}
        onClick={onAtivar}
        onFocus={estreita ? undefined : onAtivar}
      >
        <span className="carton__nome">{linha.titulo}</span>
      </button>

      <AnimatePresence initial={false}>
        {ativa && (
          <motion.div
            key="conteudo"
            id={painelId}
            className="carton__etiqueta"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.12 }}
          >
            <p>{linha.texto}</p>
            <a
              className="btn btn--preto btn--compacto"
              href={waLink(unidade, `Olá! Vim pelo site e quero saber de ${linha.zap}.`)}
              target="_blank"
              rel="noreferrer"
            >
              <IconWhats size={19} />
              Pedir no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export function Linhas() {
  const [ativaId, setAtivaId] = useState(linhas[0].id)
  const estreita = useMedia("(max-width: 820px)")

  return (
    <section className="linhas" id="linhas" aria-labelledby="linhas-titulo">
      <div className="linhas__cabeca">
        <h2 id="linhas-titulo" className="titulo-secao titulo-secao--tinta">
          Piso na caixa. Móvel de fábrica.
        </h2>
        <p className="linhas__apoio">
          Passe o mouse ou toque numa caixa para abrir. Imagens reais, tiradas dos vídeos da própria loja.
        </p>
      </div>

      <div className="linhas__palete" key={estreita ? "coluna" : "linha"}>
        {linhas.map((l, i) => (
          <Caixa
            key={l.id}
            linha={l}
            indice={i}
            ativa={ativaId === l.id}
            estreita={estreita}
            onAtivar={() => setAtivaId(l.id)}
          />
        ))}
      </div>

      <p className="linhas__tambem">
        Também tem <strong>{tambem.join(", ")}</strong>.
      </p>
    </section>
  )
}
