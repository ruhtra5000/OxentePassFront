
import { chamadaAPI } from "../../../backend/chamadaPadrao";
import { getS3URL, converterData } from "../../../funcoes/helpers";
import Image from "next/image";
import Link from "next/link";
import "../../globals.css";
import "./page.css"

async function getEvento (idEvento: string) {
  const response = await chamadaAPI(
    `/evento/filtro?id=${idEvento}`,
    "GET"
  )

  if (!response) {
    console.error("Falha no carregamento do evento")
    return
  }

  return response.content
}

async function getImagens (idEvento: string) {
  const response = await chamadaAPI(
    `/evento/${idEvento}/imagens`,
    "GET"
  )

  if (!response) {
    console.error("Falha no carregamento das imagens")
    return []
  }

  return response.content
}

export default async function Evento ({ params }: { params: { id: string } }) {
  const {id} = await params
  const eventoTmp = await getEvento(id)
  const evento = eventoTmp[0]
  const imagens = await getImagens(id)

  return (
    <div className="flex justify-center">
      <main className="flex flex-row relative w-7/10">
        <div className="flex-1"> {/* Lado "esquerdo" */}
          {/* Imagens */}
          <div className="p-5 overflow-x-auto">
            {(imagens.length == 0) ? 
              <div 
                className="relative w-100 h-50 shrink-0"
              >
                <Image
                  src="/placeholder.png"
                  alt="imagem de placeholder"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              :
              <div className="flex gap-4 min-w-max">
                {imagens.map((item: any) => (
                  <div 
                    key={item.id}
                    className="relative w-100 h-50 shrink-0"
                  >
                    <Image
                      src={getS3URL(item.chaveS3)}
                      alt={item.nome}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>
            }
          </div>
          {/* Info geral */}
          <div className="evento-conteudo">
            <h1 className="titulo">{evento.nome}</h1>
            <p className="mt-2 text-lg">{evento.descricao}</p>

            <div className="flex flex-row gap-5">
              <div className="evento-conteudo-card bg-orange-500">
                <h2 className="text-3xl">Onde?</h2>    
                <p className="mt-2 mb-1 text-lg">{evento.cidade.nome}, {evento.endereco.bairro}</p>
                <p className="mb-2 text-lg">{evento.endereco.rua}, nº{evento.endereco.numero}</p>
                <hr />
                <p className="mt-2 mb-1 text-lg">CEP: {evento.endereco.cep}</p>
              </div>

              <div className="evento-conteudo-card bg-green-600">
                <h2 className="text-3xl">Quando?</h2>    
                <p className="mt-2 mb-1.5 text-lg">{converterData(evento.dataHoraInicio)}</p>
                <p className="mb-1.5 text-lg">a</p>
                <p className="text-lg">{converterData(evento.dataHoraFim)}</p>
              </div>
            </div>

            <h2 className="text-3xl mt-10">Pontos de Venda</h2>
            <p className="mt-2 mb-4">Não curte comprar online? Seguem alguns pontos de venda presenciais para você!</p>
            <div className="flex flex-row flex-wrap gap-3">
              {evento.pontosVenda.map((item: any) => (
                <div className="p-1 w-100" key={item.id}>
                  <h3 className="text-xl mb-2">{item.nome}</h3>
                  <p className="mb-2">{item.detalhes}</p>
                  <p>{item.endereco.bairro}, {item.endereco.rua}, nº{item.endereco.numero}</p>
                  <p>CEP: {item.endereco.cep}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
        <div className="w-1/4"> {/* Lado "direito" */}
          {/* Ingressos (barra lateral) */}
          <div className="evento-ingressos">
            <h2 className="text-3xl">Ingressos</h2>
            {evento.ingressos.map((item: any) => (
              <div className="ingresso-card" key={item.id}>
                <h3 className="text-xl mb-2">{item.tipo}</h3>
                <p>R$ {item.valorBase.toFixed(2)}</p>
                <p>Qtde restante: {item.quantidadeDisponivel} unidade(s)</p>
                <p>Meia entrada: {(item.temMeiaEntrada == true) ? "Sim" : "Não"}</p>
                <Link
                  href={`/ingresso/${item.id}`}
                >
                  <button className="botao-primario mt-3">
                    Comprar Ingresso
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
