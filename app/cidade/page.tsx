
import { chamadaAPI } from "../../backend/chamadaPadrao";
import Link from 'next/link';
import "../globals.css";
import "./page.css";
import HeaderCard from "../_components/HeaderCard";
import { Tags } from "../_components/CidadeTagCard";

const pagina = 0

async function getCidades () {
  const response = await chamadaAPI(
    `/cidade?page=${pagina}&size=20`,
    "GET"
  )

  if (!response) {
    console.error("Falha no carregamento de cidades")
    return []
  }

  return response.content
}

export default async function cidades () {
  const cidades = await getCidades()

  return (
    <div className="flex justify-center">
      <main className="w-3/5">
        <HeaderCard
          pageTitle="Catalogo"
          headerTitle="Cidades"
          details="Verifique os eventos nas suas cidades favoritas!"
          highlightLabel="Cidades cadastradas"
          highlightValue={cidades.length}
        />

        <div className="flex flex-row flex-wrap mt-5 gap-4 justify-center">
          {cidades.map((item: any) => (
            <Link
              key={item.id} 
              href={`/cidade/${item.id}`}
              className="cursor-pointer"
            >
              <div className="cidade-card">
                <h2 className="text-2xl">{item.nome}</h2>
                <p className="mt-2">{item.descricao}</p>

                {(item.tags.length == 0) ? undefined : <hr className="my-3"/>}
                
                <Tags tags={item.tags} />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
