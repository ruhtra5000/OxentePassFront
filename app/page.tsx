
import { chamadaAPI } from "../backend/chamadaPadrao";
import { getS3URL, converterData } from "../funcoes/helpers";
import Link from 'next/link';
import Image from "next/image";
import "./globals.css";

const paginaAtivos = 0
const paginaFuturos = 0

async function getEventosAtivos () {
  const data = new Date().toISOString().slice(0, 19)

  const response = await chamadaAPI(
    `/evento/comImg?ativos=${data}&page=${paginaAtivos}&size=3`,
    "GET"
  )

  if (!response) {
    console.error("Falha no carregamento de eventos")
    return []
  }

  return response.content
}

async function getEventosFuturos () {
  const data = new Date().toISOString().slice(0, 19)

  const response = await chamadaAPI(
    `/evento/comImg?naoIniciados=${data}&page=${paginaFuturos}&size=3`,
    "GET"
  )

  if (!response) {
    console.error("Falha no carregamento de eventos")
    return []
  }

  return response.content
}

export default async function home() {
  const eventosAtivos = await getEventosAtivos()
  const eventosFuturos = await getEventosFuturos()

  return (
    <div>
      <main>
        {/* Eventos ativos */}
        <h1 className="titulo ml-50">Acontecendo agora</h1>
        <div className="flex flex-row flex-wrap mt-5 gap-4 justify-center">
          {eventosAtivos.map((item: any) => (
            <Link
              key={item.id} 
              href={`/evento/${item.id}`}
              className="cursor-pointer"
            >
              <div className="evento-card">
                <div className="relative w-120 h-60 text-center">
                  <Image
                    src={item.imagem ? getS3URL(item.imagem.chaveS3) : "/placeholder.png"}
                    alt={item.imagem?.nome || "placeholder"}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
                <div className="evento-card-data">
                  <h2 className="text-xl">{item.nome}</h2>
                  <p>De {converterData(item.dataHoraInicio)} à {converterData(item.dataHoraFim)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Eventos futuros */}
        <h1 className="titulo ml-50">Não perca o que vem por ai!</h1>
        <div className="flex flex-row flex-wrap mt-5 gap-4 justify-center">
          {eventosFuturos.map((item: any) => (
            <Link
              key={item.id} 
              href={`/evento/${item.id}`}
              className="cursor-pointer"
            >
              <div className="evento-card">
                <div className="relative w-120 h-60 text-center">
                  <Image
                    src={item.imagem ? getS3URL(item.imagem.chaveS3) : "/placeholder.png"}
                    alt={item.imagem?.nome || "placeholder"}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
                <div className="evento-card-data">
                  <h2 className="text-xl">{item.nome}</h2>
                  <p>De {converterData(item.dataHoraInicio)} à {converterData(item.dataHoraFim)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
