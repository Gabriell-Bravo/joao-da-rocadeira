import { motion } from "motion/react"
import { unidades, waLink } from "../data.js"
import { Barcode, IconWhats, easeOut, useUnidade } from "../ui.jsx"

export function Unidades() {
  const { unidade: atual, setUnidadeId } = useUnidade()

  return (
    <section className="unidades" id="unidades" aria-labelledby="unidades-titulo">
      <h2 id="unidades-titulo" className="titulo-secao titulo-secao--amarelo">
        Duas unidades. Um WhatsApp para cada.
      </h2>

      <div className="unidades__remessas">
        {unidades.map((u, i) => {
          const escolhida = u.id === atual.id
          return (
            <motion.article
              key={u.id}
              className="remessa"
              data-escolhida={escolhida}
              initial={{ opacity: 0, y: 40, rotate: i === 0 ? -2.5 : 2.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: i === 0 ? -1.2 : 1.2 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ type: "spring", bounce: 0.18, visualDuration: 0.7, delay: i * 0.1 }}
            >
              <header className="remessa__topo">
                <span>Destino</span>
                <span>RJ</span>
              </header>
              <h3 className="remessa__cidade">{u.cidade}</h3>
              <p className="remessa__fone">
                <span>WhatsApp</span>
                <a href={`tel:+${u.wa}`}>{u.fone}</a>
              </p>
              <p className="remessa__nota">Endereço e horário: peça pelo WhatsApp.</p>
              <Barcode texto={`${u.id}${u.fone}`} className="remessa__barras" height={44} />
              <a
                className="btn btn--zap"
                href={waLink(u, `Olá! Vim pelo site e quero falar com a unidade de ${u.cidade}.`)}
                target="_blank"
                rel="noreferrer"
                onClick={() => setUnidadeId(u.id)}
              >
                <IconWhats size={24} />
                <span>
                  Chamar {u.cidade}
                  <small>{u.fone}</small>
                </span>
              </a>
              {escolhida && (
                <motion.span
                  className="remessa__carimbo"
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 1.5, rotate: 14 }}
                  animate={{ opacity: 1, scale: 1, rotate: -9 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  Sua unidade
                </motion.span>
              )}
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
