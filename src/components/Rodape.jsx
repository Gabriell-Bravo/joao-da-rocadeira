import { instagram, waLink } from "../data.js"
import { IconExterno, IconInsta, IconWhats, Logo, useUnidade } from "../ui.jsx"

export function Rodape() {
  const { unidade } = useUnidade()
  return (
    <footer className="rodape">
      <div className="rodape__chamada">
        <p className="rodape__frase">
          Pisos, porcelanato e móveis.
          <br />
          Chame a unidade mais perto.
        </p>
        <a
          className="btn btn--zap"
          href={waLink(unidade, "Olá! Vim pelo site da João da Roçadeira.")}
          target="_blank"
          rel="noreferrer"
        >
          <IconWhats size={26} />
          <span>
            Corre pra cá: WhatsApp
            <small>{unidade.cidade}</small>
          </span>
        </a>
      </div>

      <div className="rodape__base">
        <div className="rodape__marca">
          <Logo tamanho={64} />
          <p>
            João da Roçadeira
            <small>Desde 1988 · Saquarema e Araruama, RJ</small>
          </p>
        </div>
        <ul className="rodape__links">
          <li>
            <a href={instagram.url} target="_blank" rel="noreferrer">
              <IconInsta size={20} />
              {instagram.usuario}
              <IconExterno size={15} />
            </a>
          </li>
          <li>
            <a href={instagram.linktree} target="_blank" rel="noreferrer">
              linktr.ee/JoaodaRocadeira
              <IconExterno size={15} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
