import { useEffect, useId, useMemo, useState } from "react"
import { AnimatePresence, motion, useSpring, useTransform } from "motion/react"
import { waLink } from "../data.js"
import { IconWhats, easeOut, useUnidade } from "../ui.jsx"
import { TrocaUnidade } from "./Hero.jsx"

const COLUNAS = 5
const MAX_CAIXAS_NA_TELA = 60
const PERDAS = [5, 10, 15]

function numero(texto) {
  const n = parseFloat(String(texto).trim().replace(",", "."))
  return Number.isFinite(n) ? n : 0
}

function fmt(n) {
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 2 })
}

function Contador({ valor }) {
  const mola = useSpring(0, { stiffness: 150, damping: 24 })
  const texto = useTransform(mola, (v) => Math.round(v).toLocaleString("pt-BR"))
  useEffect(() => {
    mola.set(valor)
  }, [valor, mola])
  return <motion.span>{texto}</motion.span>
}

function Pallet({ caixas }) {
  const mostradas = Math.min(caixas, MAX_CAIXAS_NA_TELA)
  const fileiras = Math.max(1, Math.ceil(mostradas / COLUNAS))
  const altura = Math.max(14, Math.min(46, Math.floor(300 / fileiras) - 4))

  const linhas = []
  for (let f = 0; f < fileiras; f++) {
    const inicio = f * COLUNAS
    const qtd = Math.min(COLUNAS, mostradas - inicio)
    if (qtd > 0) linhas.push({ f, inicio, qtd })
  }

  return (
    <div className="pallet" role="img" aria-label={`Pallet com ${caixas} caixas`} style={{ "--caixa-h": `${altura}px` }}>
      <div className="pallet__pilha">
        {linhas.map(({ f, inicio, qtd }) => (
          <div className="pallet__fileira" key={f}>
            <AnimatePresence initial={false}>
              {Array.from({ length: qtd }, (_, c) => (
                <motion.span
                  key={inicio + c}
                  className="pallet__caixa"
                  initial={{ opacity: 0, y: -60, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.12 } }}
                  transition={{ type: "spring", bounce: 0.28, visualDuration: 0.42, delay: Math.min(0.012 * (inicio + c), 0.35) }}
                />
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>
      {caixas === 0 && (
        <div className="pallet__vazio" aria-hidden="true">
          {[0, 1, 2, 3].map((f) => (
            <div className="pallet__fileira" key={f}>
              {[0, 1, 2, 3, 4].map((c) => (
                <span className="pallet__fantasma" key={c} />
              ))}
            </div>
          ))}
          <p>Digite a área e as caixas aparecem aqui.</p>
        </div>
      )}
      <div className="pallet__base" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      {caixas > MAX_CAIXAS_NA_TELA && (
        <p className="pallet__nota">Mostrando {MAX_CAIXAS_NA_TELA} caixas. O total é maior.</p>
      )}
    </div>
  )
}

export function Calculadora() {
  const { unidade } = useUnidade()
  const id = useId()
  const [modo, setModo] = useState("m2")
  const [m2, setM2] = useState("")
  const [largura, setLargura] = useState("")
  const [comprimento, setComprimento] = useState("")
  const [porCaixa, setPorCaixa] = useState("2,00")
  const [perda, setPerda] = useState(10)

  const calculo = useMemo(() => {
    const area = modo === "m2" ? numero(m2) : numero(largura) * numero(comprimento)
    const pc = numero(porCaixa)
    if (!(area > 0) || !(pc > 0)) return { ok: false, area, pc }
    const necessario = area * (1 + perda / 100)
    const caixas = Math.ceil(Math.round((necessario / pc) * 1e6) / 1e6)
    const comprados = caixas * pc
    return { ok: true, area, pc, caixas, comprados, sobra: comprados - area }
  }, [modo, m2, largura, comprimento, porCaixa, perda])

  const erroCaixa = porCaixa.trim() !== "" && !(numero(porCaixa) > 0)
  const mensagem = calculo.ok
    ? `Olá! Vim pelo site. Meu ambiente tem ${fmt(calculo.area)} m². Com ${perda}% de perda, preciso de ${calculo.caixas} caixas de ${fmt(calculo.pc)} m². Pode me passar os valores?`
    : "Olá! Vim pelo site e quero um orçamento de piso."

  return (
    <section className="calc" id="calculadora" aria-labelledby="calc-titulo">
      <div className="calc__cabeca">
        <h2 id="calc-titulo" className="titulo-secao titulo-secao--amarelo">
          Monte o seu pallet
        </h2>
        <p>
          Diga a área e a gente conta as caixas. A conta é só de quantidade: o valor você pede no WhatsApp.
        </p>
      </div>

      <div className="calc__corpo">
        <form className="romaneio" onSubmit={(e) => e.preventDefault()} noValidate>
          <div className="romaneio__linha">
            <span className="romaneio__rotulo" id={`${id}-modo`}>
              Área do ambiente
            </span>
            <div className="seg" role="radiogroup" aria-labelledby={`${id}-modo`}>
              {[
                ["m2", "Em m²"],
                ["medidas", "Largura × comprimento"],
              ].map(([v, nome]) => (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  aria-checked={modo === v}
                  className="seg__opcao"
                  onClick={() => setModo(v)}
                >
                  {modo === v && (
                    <motion.span
                      layoutId={`${id}-seg`}
                      className="seg__pilula"
                      transition={{ type: "spring", bounce: 0.1, visualDuration: 0.32 }}
                    />
                  )}
                  <span className="seg__texto">{nome}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {modo === "m2" ? (
              <motion.div
                key="m2"
                className="campos"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <label className="campo">
                  <span>Metros quadrados</span>
                  <input
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="ex.: 38"
                    value={m2}
                    onChange={(e) => setM2(e.target.value)}
                  />
                  <em>m²</em>
                </label>
              </motion.div>
            ) : (
              <motion.div
                key="medidas"
                className="campos campos--duplo"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <label className="campo">
                  <span>Largura</span>
                  <input
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="ex.: 4,5"
                    value={largura}
                    onChange={(e) => setLargura(e.target.value)}
                  />
                  <em>m</em>
                </label>
                <label className="campo">
                  <span>Comprimento</span>
                  <input
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="ex.: 8"
                    value={comprimento}
                    onChange={(e) => setComprimento(e.target.value)}
                  />
                  <em>m</em>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="campos">
            <label className="campo" data-erro={erroCaixa}>
              <span>m² por caixa</span>
              <input
                inputMode="decimal"
                autoComplete="off"
                value={porCaixa}
                aria-invalid={erroCaixa}
                aria-describedby={`${id}-caixa`}
                onChange={(e) => setPorCaixa(e.target.value)}
              />
              <em>m²</em>
            </label>
            <p className="campo__dica" id={`${id}-caixa`} role={erroCaixa ? "alert" : undefined}>
              {erroCaixa ? "Use um número maior que zero." : "Está escrito na caixa do piso. 2,00 é só um ponto de partida."}
            </p>
          </div>

          <div className="romaneio__linha">
            <span className="romaneio__rotulo" id={`${id}-perda`}>
              Perda por corte e quebra
            </span>
            <div className="seg" role="radiogroup" aria-labelledby={`${id}-perda`}>
              {PERDAS.map((p) => (
                <button
                  key={p}
                  type="button"
                  role="radio"
                  aria-checked={perda === p}
                  className="seg__opcao"
                  onClick={() => setPerda(p)}
                >
                  {perda === p && (
                    <motion.span
                      layoutId={`${id}-perda-pilula`}
                      className="seg__pilula"
                      transition={{ type: "spring", bounce: 0.1, visualDuration: 0.32 }}
                    />
                  )}
                  <span className="seg__texto">{p}%</span>
                </button>
              ))}
            </div>
          </div>

          <div className="romaneio__envio">
            <span className="romaneio__rotulo">Enviar para a unidade</span>
            <TrocaUnidade nome="Unidade que vai receber o pedido" />
            <a
              className="btn btn--zap"
              aria-disabled={!calculo.ok}
              tabIndex={calculo.ok ? 0 : -1}
              href={calculo.ok ? waLink(unidade, mensagem) : undefined}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                if (!calculo.ok) e.preventDefault()
              }}
            >
              <IconWhats size={24} />
              <span>
                {calculo.ok ? `Pedir ${calculo.caixas} caixas no WhatsApp` : "Informe a área para continuar"}
                <small>{unidade.cidade}</small>
              </span>
            </a>
          </div>
        </form>

        <div className="resultado" aria-live="polite">
          <Pallet caixas={calculo.ok ? calculo.caixas : 0} />
          <dl className="resultado__numeros">
            <div className="resultado__principal">
              <dt>Caixas</dt>
              <dd>{calculo.ok ? <Contador valor={calculo.caixas} /> : "0"}</dd>
            </div>
            <div>
              <dt>m² comprados</dt>
              <dd>{calculo.ok ? fmt(calculo.comprados) : "0"}</dd>
            </div>
            <div>
              <dt>Sobra</dt>
              <dd>{calculo.ok ? `${fmt(calculo.sobra)} m²` : "0 m²"}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
