
import { chamadaAPI } from "../backend/chamadaPadrao";

async function getEventos () {
  const response = await chamadaAPI(
    "/evento",
    "GET"
  )

  if (!response) {
    console.error("Falha no carregamento de eventos")
    return []
  }

  return response.content
}

export default async function home() {
  const eventos = await getEventos()

  return (
    <div>
      <main>
        <div className="text-4xl mt-8 grow text-center">Eventos</div>
        <ul className="mt-5 grow text-center">
          {eventos.map((item: any) => (
            <li key={item.id}>{item.nome}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
