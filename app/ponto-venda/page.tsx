import { chamadaAPI } from "../../backend/chamadaPadrao";
import HeaderCard from "../_components/HeaderCard";
import PontoVendaCard from "../_components/PontoVendaCard";

const page = 0;
async function getPontoVendas() {
    const response = await chamadaAPI(
        `/pontovenda?page=${page}&size=20`,
        "GET"
    )

    if (!response)
        return [];

    return response.content;
}

export default async function PontoVendaPage() {
    
    const pontoVendas = await getPontoVendas();

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
                <HeaderCard
                    pageTitle="Catalogo"
                    headerTitle="Pontos de Venda"
                    details="Consulte os locais cadastrados, visualize os principais detalhes e acesse cada unidade para ver informacoes completas."
                    highlightLabel="Total disponível"
                    highlightValue={pontoVendas.length}
                />

                <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {pontoVendas.map((p: any) => (
                        <PontoVendaCard
                            key={p.id}
                            id={p.id}
                            nome={p.nome}
                            detalhes={p.detalhes}
                            endereco={p.endereco}
                        />
                    ))}
                </section>
            </div>
        </main>
    )
}
