
import { chamadaAPI } from "../../../backend/chamadaPadrao";
import HeaderCard from "@/app/_components/HeaderCard";
import { EventoCard } from "@/app/_components/EventoCard";
import "../../globals.css";
import { Paginacao } from "@/app/_components/Paginacao";

async function getCidade (idCidade: string) {
  const response = await chamadaAPI(
    `/cidade/filtro?id=${idCidade}`,
    "GET"
  )

  if (!response) {
    console.error("Falha no carregamento da cidade")
    return
  }

  return response.content
}

async function getEventosCidade (cidade: string, pagina: number) {
  const response = await chamadaAPI(
    `/evento/comImg?cidade=${cidade}&page=${pagina}&size=6`,
    "GET"
  )

  if (!response) {
    console.error("Falha no carregamento de eventos")
    return []
  }

  return response
}

export default async function cidade (props: any) {
  const {id} = await props.params
  const searchParams = await props.searchParams;
  const pagina = Number(searchParams?.pag ?? 0);

  const cidade = (await getCidade(id))[0]
  const eventos = await getEventosCidade(cidade.nome, pagina)

  return (
    <div className="flex justify-center">
      <main className="w-17/20">
        <HeaderCard
          pageTitle="Cidade"
          headerTitle={cidade.nome}
          details={cidade.descricao}
          highlightLabel="Eventos cadastrados"
          highlightValue={eventos.content.length}
        />

        <div className="flex flex-row flex-wrap mt-5 mb-3 gap-4 justify-center">
          {eventos.content.map((item: any) => (
            <EventoCard key={item.id} item={item} />
          ))}
        </div>

        <Paginacao
          page={pagina}
          totalPages={eventos.totalPages}
        />
      </main>
    </div>
  );
}
