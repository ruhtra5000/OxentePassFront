'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { chamadaAPI } from "../../../backend/chamadaPadrao";
import "../../globals.css";

export default function ListarIngressos() {
  const [ingressos, setIngressos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const data = await chamadaAPI("/ingresso/listar?page=0&size=1000", "GET");
        setIngressos(data?.content || data || []);
      } catch (error) {
        console.error("Erro ao carregar", error);
      } finally {
        setCarregando(false);
      }
    };
    buscarDados();
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 p-6 lg:p-12 font-sans text-slate-800 relative overflow-hidden">
      <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] bg-teal-400/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        <Link href="/ingressos" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-bold mb-8 transition-all group no-underline">
          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          </div>
          Voltar para o Menu
        </Link>
        
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-10 py-10 text-white relative overflow-hidden">
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex shrink-0 items-center justify-center font-black text-xl shadow-sm border border-white/10">
                    O
                    </div>
                    <div className="flex flex-col justify-center">
                    <h1 className="text-2xl font-black tracking-tight uppercase leading-none mb-2">
                        Estoque de Ingressos
                    </h1>
                    <p className="text-teal-50/90 text-sm font-medium leading-none">
                        Listagem dos Ingressos disponíveis
                    </p>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-10 -translate-y-10 pointer-events-none"></div>
            </div>
          
          <div className="p-0 sm:p-0">
            {carregando ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 animate-in fade-in duration-300">
                <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-bold text-xs uppercase tracking-widest">Sincronizando Banco de Dados...</p>
              </div>
            ) : ingressos.length === 0 ? (
              <div className="p-20 text-center">
                <p className="text-slate-400 font-medium">Nenhum ingresso encontrado no sistema.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-10 py-5 text-[10px] uppercase tracking-widest font-black text-slate-400 whitespace-nowrap">ID Lote</th>
                      <th className="px-10 py-5 text-[10px] uppercase tracking-widest font-black text-slate-400">Tipo / Categoria</th>
                      <th className="px-10 py-5 text-[10px] uppercase tracking-widest font-black text-slate-400">Valor Base</th>
                      <th className="px-10 py-5 text-[10px] uppercase tracking-widest font-black text-slate-400">Estoque</th>
                      <th className="px-10 py-5 text-[10px] uppercase tracking-widest font-black text-slate-400">Meia Entrada</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {ingressos.map((ing) => (
                      <tr key={ing.id} className="hover:bg-[#f2fcf9] transition-colors group">
                        <td className="px-10 py-5">
                          <span className="px-3 py-1.5 bg-slate-100 group-hover:bg-white text-slate-500 text-xs font-bold rounded-md border border-slate-200 transition-colors">
                            #{ing.id}
                          </span>
                        </td>
                        <td className="px-10 py-5 font-bold text-slate-800">{ing.tipo}</td>
                        <td className="px-10 py-5 font-black text-teal-600 text-lg">
                          R$ {ing.valorBase?.toFixed(2)}
                        </td>
                        <td className="px-10 py-5">
                          <span className={`font-bold ${ing.quantidadeDisponivel < 10 ? 'text-red-500' : 'text-slate-600'}`}>
                            {ing.quantidadeDisponivel} un.
                          </span>
                        </td>
                        <td className="px-10 py-5">
                          {ing.temMeiaEntrada ? (
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-md uppercase tracking-wider">
                              Disponível
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-bold rounded-md uppercase tracking-wider">
                              Não Aceita
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}