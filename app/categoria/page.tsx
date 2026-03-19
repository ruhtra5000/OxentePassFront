
import { chamadaAPI } from "../../backend/chamadaPadrao";
import "../globals.css";
import "./page.css";
import HeaderCard from "../_components/HeaderCard";
import Link from "next/link";

const pagina = 0

async function getCategorias () {
  const response = await chamadaAPI(
    `/tag?page=${pagina}&size=20`,
    "GET"
  )

  if (!response) {
    console.error("Falha no carregamento de categorias")
    return []
  }

  return response.content
}

export default async function categorias () {
  const categorias = await getCategorias()

  return (
    <div className="flex justify-center">
      <main className="w-3/5">
        <HeaderCard
          pageTitle="Catalogo"
          headerTitle="Categorias"
          details="Explore cidades e eventos com diversas categorias!"
          highlightLabel="Categorias cadastradas"
          highlightValue={categorias.length}
        />

        <div className="flex flex-row gap-2 justify-center mt-10">
          {categorias.map((item: any) => (
            <Link
              key={item.id}
                href={`/categoria/${item.tag}`}
                className="cursor-pointer"
            >
              <div className="tag-card">
                <h3 className="text-lg">{item.tag}</h3>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
