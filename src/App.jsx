import { useMemo, useState } from "react"
import { MotionConfig } from "motion/react"
import { unidades } from "./data.js"
import { UnidadeContext } from "./ui.jsx"
import { Topo } from "./components/Topo.jsx"
import { Hero } from "./components/Hero.jsx"
import { Fita, FaixaBlackFriday } from "./components/Fita.jsx"
import { Linhas } from "./components/Linhas.jsx"
import { Calculadora } from "./components/Calculadora.jsx"
import { Videos } from "./components/Videos.jsx"
import { Unidades } from "./components/Unidades.jsx"
import { Rodape } from "./components/Rodape.jsx"

export default function App() {
  const [unidadeId, setUnidadeId] = useState(unidades[0].id)
  const [clipeId, setClipeId] = useState("queima")

  const valor = useMemo(
    () => ({ unidade: unidades.find((u) => u.id === unidadeId), setUnidadeId }),
    [unidadeId],
  )

  const abrirBlackFriday = () => {
    setClipeId("blackfriday")
    document.getElementById("videos")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <MotionConfig reducedMotion="user">
      <UnidadeContext.Provider value={valor}>
        <a className="pular" href="#linhas">
          Pular para o conteúdo
        </a>
        <Topo />
        <main>
          <Hero />
          <Fita />
          <FaixaBlackFriday onAbrir={abrirBlackFriday} />
          <Linhas />
          <Calculadora />
          <Videos clipeId={clipeId} setClipeId={setClipeId} />
          <Unidades />
        </main>
        <Rodape />
      </UnidadeContext.Provider>
    </MotionConfig>
  )
}
