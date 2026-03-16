
import { chamadaAPI } from "../../backend/chamadaPadrao";
import Link from 'next/link';
import "../globals.css";

const pagina = 0

async function getCidades () {
  const response = await chamadaAPI(
    `/cidade?page=${pagina}&size=3`,
    "GET"
  )

  if (!response) {
    console.error("Falha no carregamento de cidades")
    return []
  }

  return response.content
}

export default async function home() {
  const cidades = await getCidades()

  return (
    <div>
      <main>
        <div className="titulo">Cidades</div>
        <div className="flex flex-row mt-5 gap-4 justify-center">
          {cidades.map((item: any) => (
            <Link
              key={item.id} 
              href={`/cidade/${item.id}`}
              className="cursor-pointer"
            >
              <div className="cidade-card">
                {item.nome}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
