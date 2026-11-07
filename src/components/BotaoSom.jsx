import { motion } from "motion/react"
import { IconMudo, IconSom, useSom } from "../ui.jsx"

export function BotaoSom() {
  const { comSom, toggleSom } = useSom()

  return (
    <motion.button
      type="button"
      className="botao-som"
      aria-pressed={comSom}
      aria-label={comSom ? "Desligar som" : "Ligar som"}
      title={comSom ? "Desligar som" : "Ligar som"}
      onClick={toggleSom}
      whileTap={{ scale: 0.88 }}
      animate={comSom ? { scale: 1 } : { scale: [1, 1.08, 1] }}
      transition={
        comSom
          ? { type: "spring", bounce: 0.2, visualDuration: 0.28 }
          : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
      }
    >
      {comSom ? <IconSom size={28} /> : <IconMudo size={28} />}
    </motion.button>
  )
}
