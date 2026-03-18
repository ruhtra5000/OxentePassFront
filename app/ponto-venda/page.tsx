
import Link from "next/link";
import { chamadaAPI } from "../../backend/chamadaPadrao";

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
        <>
            <h1 className="titulo">Pontos de Venda</h1>
            {
                pontoVendas.map(
                    (ponto: any) => (
                        <ul className="flex flex-row flex-wrap mt-5 gap-4 justify-center">
                            <Link key={ponto.id} href={`/ponto-venda/${ponto.id}`}>
                                <li className="card shadow-sm mt-4">
                                    <h1 className="text-lg">{ponto.nome}</h1>
                                    <span className="mt-2">{ponto.detalhes}</span>
                                </li>
                            </Link>
                        </ul>
                    )
                )
            }
        </>
    )
}
