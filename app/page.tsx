
import { chamadaAPI } from "../backend/chamadaPadrao";
import { EventoCard } from "./_components/EventoCard";
import { Paginacao } from "./_components/Paginacao";
import "./globals.css";

async function getEventosAtivos (paginaAtivos: number) {
  const data = new Date().toISOString().slice(0, 19)

  const response = await chamadaAPI(
    `/evento/comImg?ativos=${data}&page=${paginaAtivos}&size=3`,
    "GET"
  )

  if (!response) {
    console.error("Falha no carregamento de eventos")
    return []
  }

  return response
}

async function getEventosFuturos (paginaFuturos: number) {
  const data = new Date().toISOString().slice(0, 19)

  const response = await chamadaAPI(
    `/evento/comImg?naoIniciados=${data}&page=${paginaFuturos}&size=3`,
    "GET"
  )

  if (!response) {
    console.error("Falha no carregamento de eventos")
    return []
  }

  return response
}

export default async function home(props: any) {
  const searchParams = await props.searchParams;
  const pagina1 = Number(searchParams?.pag1 ?? 0);
  const pagina2 = Number(searchParams?.pag2 ?? 0);

  const eventosAtivos = await getEventosAtivos(pagina1)
  const eventosFuturos = await getEventosFuturos(pagina2)

  return (
    <div className="flex flex-row justify-center">
      <main className="w-17/20">
        {/* Eventos ativos */}
        <h1 className="titulo">Acontecendo agora</h1>
        <div className="flex flex-row flex-wrap mt-5 mb-3 gap-4 justify-center">
          {eventosAtivos.content.map((item: any) => (
            <EventoCard key={item.id} item={item} />
          ))}
        </div>

        <Paginacao 
          page={pagina1} 
          totalPages={eventosAtivos.totalPages} 
          index="pag1"
        />

        {/* Eventos futuros */}
        <h1 className="titulo">Não perca o que vem por ai!</h1>
        <div className="flex flex-row flex-wrap mt-5 mb-3 gap-4 justify-center">
          {eventosFuturos.content.map((item: any) => (
            <EventoCard key={item.id} item={item} />
          ))}
        </div>

        <Paginacao 
          page={pagina2} 
          totalPages={eventosFuturos.totalPages} 
          index="pag2"
        />
      </main>
    </div>
  );
}
