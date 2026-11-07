export const unidades = [
  { id: "saquarema", cidade: "Saquarema", fone: "(22) 99830-6657", wa: "5522998306657" },
  { id: "araruama", cidade: "Araruama", fone: "(22) 99608-0318", wa: "5522996080318" },
]

export const instagram = {
  usuario: "@joaodarocadeira",
  url: "https://www.instagram.com/joaodarocadeira/",
  linktree: "https://linktr.ee/JoaodaRocadeira",
}

export function waLink(unidade, texto) {
  return `https://wa.me/${unidade.wa}?text=${encodeURIComponent(texto)}`
}

export const midia = {
  logo: "/media/logo-150.jpg",
  pisos: { video: "/media/pisos.mp4?v=som", poster: "/media/pisos-poster.jpg" },
  tricot: { video: "/media/tricot.mp4?v=som", poster: "/media/tricot-poster.jpg" },
  mesas: { video: "/media/mesas.mp4?v=som", poster: "/media/mesas-poster.jpg" },
  geradores: { video: "/media/geradores.mp4?v=som", poster: "/media/geradores-poster.jpg" },
  showroom: { video: "/media/showroom.mp4?v=som", poster: "/media/showroom-poster.jpg" },
  blackfriday: { video: "/media/blackfriday.mp4?v=som", poster: "/media/blackfriday-poster.jpg" },
}

export const linhas = [
  {
    id: "pisos",
    titulo: "Pisos e porcelanato",
    texto: "Vendo 10 carretas por mês. Tenho preço e cubro orçamentos.",
    midia: midia.pisos,
    zap: "pisos e porcelanato",
  },
  {
    id: "tricot",
    titulo: "Móveis em tricô náutico",
    texto: "A gente é fábrica de móveis em tricô náutico. Peça o seu pelo WhatsApp.",
    midia: midia.tricot,
    zap: "móveis em tricô náutico",
  },
  {
    id: "mesas",
    titulo: "Mesas cascata",
    texto: "Mesas cascata direto de fábrica.",
    midia: midia.mesas,
    zap: "mesas cascata",
  },
  {
    id: "geradores",
    titulo: "Geradores de energia",
    texto: "Geradores de energia, direto na loja.",
    midia: midia.geradores,
    zap: "geradores de energia",
  },
]

export const tambem = ["Banheiras de hidromassagem"]

export const clipes = [
  {
    id: "queima",
    titulo: "Queima em pisos e porcelanatos",
    midia: midia.pisos,
    reel: "https://www.instagram.com/reel/DYdQ10vAcAs/",
  },
  {
    id: "blackfriday",
    titulo: "Black Friday na João da Roçadeira",
    midia: midia.blackfriday,
    reel: "https://www.instagram.com/reel/DfXlBc9g3cV/",
  },
  {
    id: "fabrica",
    titulo: "Fábrica de móveis em tricô náutico",
    midia: midia.tricot,
    reel: "https://www.instagram.com/reel/Dc6n9qLgZLZ/",
  },
  {
    id: "cascata",
    titulo: "Mesas cascata direto de fábrica",
    midia: midia.mesas,
    reel: "https://www.instagram.com/reel/DaFqeeBxLC6/",
  },
  {
    id: "banheiras",
    titulo: "Banheiras de hidromassagem e móveis de fábrica",
    midia: midia.showroom,
    reel: "https://www.instagram.com/reel/DYSHwtKOd9t/",
  },
  {
    id: "geradores",
    titulo: "Geradores de energia na loja",
    midia: midia.geradores,
    reel: "https://www.instagram.com/reel/DdOxJm6RxJ6/",
  },
]
