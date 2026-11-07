import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useReducedMotion } from "motion/react"
import { clipes, instagram } from "../data.js"
import { IconExterno, IconInsta, IconMudo, IconPause, IconPlay, IconSom, easeOut } from "../ui.jsx"

export function Videos({ clipeId, setClipeId }) {
  const secao = useRef(null)
  const videoRef = useRef(null)
  const reduzir = useReducedMotion()
  const [tocando, setTocando] = useState(!reduzir)
  const [comSom, setComSom] = useState(false)
  const [visivel, setVisivel] = useState(false)
  const progresso = useMotionValue(0)

  const indice = Math.max(0, clipes.findIndex((c) => c.id === clipeId))
  const clipe = clipes[indice]

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.3 })
    io.observe(secao.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    progresso.set(0)
  }, [clipeId, progresso])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !comSom
    v.volume = 1
    if (tocando && visivel) {
      v.play().catch(() => {
        if (comSom) {
          v.muted = true
          v.play().catch(() => {})
        }
      })
    } else {
      v.pause()
    }
  }, [tocando, visivel, clipeId, comSom])

  const proximo = () => setClipeId(clipes[(indice + 1) % clipes.length].id)

  return (
    <section className="videos" id="videos" ref={secao} aria-labelledby="videos-titulo">
      <div className="videos__cabeca">
        <h2 id="videos-titulo" className="titulo-secao titulo-secao--tinta">
          A loja rodando
        </h2>
        <p>
          Os reels do <a href={instagram.url} target="_blank" rel="noreferrer">{instagram.usuario}</a>, com 30,5 mil
          seguidores. Toque no som para ouvir a loja.
        </p>
      </div>

      <div className="videos__corpo">
        <div className="celular">
          <div className="celular__tela">
            <AnimatePresence initial={false}>
              <motion.video
                key={clipe.id}
                ref={(n) => {
                  if (n) videoRef.current = n
                }}
                className="celular__video"
                src={clipe.midia.video}
                poster={clipe.midia.poster}
                muted={!comSom}
                playsInline
                preload="metadata"
                aria-label={clipe.titulo}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: easeOut }}
                onTimeUpdate={(e) => {
                  const v = e.currentTarget
                  if (v.duration) progresso.set(v.currentTime / v.duration)
                }}
                onEnded={proximo}
              />
            </AnimatePresence>
            <div className="celular__controles">
              {!comSom && (
                <span className="celular__aviso" aria-hidden="true">
                  Ligar o som
                </span>
              )}
              <button
                type="button"
                className="celular__controle"
                onClick={() => {
                  setComSom((s) => !s)
                  setTocando(true)
                  setVisivel(true)
                }}
                aria-label={comSom ? "Desligar som" : "Ligar som"}
                aria-pressed={comSom}
              >
                {comSom ? <IconSom size={22} /> : <IconMudo size={22} />}
              </button>
              <button
                type="button"
                className="celular__controle"
                onClick={() => setTocando((t) => !t)}
                aria-label={tocando ? "Pausar vídeo" : "Tocar vídeo"}
              >
                {tocando ? <IconPause size={22} /> : <IconPlay size={22} />}
              </button>
            </div>
          </div>
        </div>

        <ol className="fila">
          {clipes.map((c, i) => {
            const ativo = c.id === clipe.id
            return (
              <li key={c.id} className="fila__item" data-ativo={ativo}>
                <button
                  type="button"
                  className="fila__botao"
                  aria-current={ativo ? "true" : undefined}
                  onClick={() => {
                    setClipeId(c.id)
                    setTocando(true)
                  }}
                >
                  <span className="fila__titulo">{c.titulo}</span>
                  <span className="fila__barra" aria-hidden="true">
                    {ativo && <motion.span className="fila__preenche" style={{ scaleX: progresso }} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {ativo && (
                    <motion.a
                      className="fila__link"
                      href={c.reel}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: easeOut }}
                    >
                      <span>
                        <IconInsta size={18} />
                        Ver no Instagram
                        <IconExterno size={16} />
                      </span>
                    </motion.a>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
