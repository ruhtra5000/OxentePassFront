'use client'
import { useState } from 'react';
import Link from 'next/link';
import { chamadaAPI } from "../../../backend/chamadaPadrao";
import "../../globals.css";

export default function BuscarIngressoId() {
  const [id, setId] = useState('');
  const [ingresso, setIngresso] = useState<any>(null);
  const [buscou, setBuscou] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setBuscou(false);
    try {
      const data = await chamadaAPI(`/ingresso/buscar/${id}`, "GET");
      setIngresso(data);
    } catch (error) {
      setIngresso(null);
    } finally {
      setCarregando(false);
      setBuscou(true);
    }
  };

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
                        Buscar Ingresso
                    </h1>
                    <p className="text-teal-50/90 text-sm font-medium leading-none">
                        Busca exata de lote por ID
                    </p>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-10 -translate-y-10 pointer-events-none"></div>
            </div>
            
          <div className="p-8 sm:p-10">
            <form onSubmit={handleBuscar} className="flex flex-col gap-6">
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">ID do Lote/Ingresso</label>
                <input type="number" value={id} onChange={(e) => setId(e.target.value)} placeholder="Ex: 1" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500 font-medium" required />
              </div>
              <button type="submit" disabled={carregando} className="w-full bg-teal-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-500/20 hover:bg-teal-700 active:scale-[0.98] transition-all disabled:opacity-70">
                {carregando ? 'Buscando...' : 'Pesquisar Lote'}
              </button>
            </form>

            {carregando && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400 animate-in fade-in duration-300">
                <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              </div>
            )}

            {buscou && !carregando && (
              <div className="mt-8 pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {ingresso ? (
                  <div className="bg-[#f2fcf9] p-8 rounded-[2rem] border border-[#d1f4e6] shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-4 py-1.5 bg-teal-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest shadow-sm">ID #{ingresso.id}</span>
                      {ingresso.temMeiaEntrada && <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-lg uppercase tracking-widest">✅ Aceita Meia</span>}
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">{ingresso.tipo}</h3>
                    <div className="flex items-end gap-2 mb-6">
                      <p className="text-4xl font-black text-teal-600">R$ {ingresso.valorBase?.toFixed(2)}</p>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                       <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                       <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Estoque: {ingresso.quantidadeDisponivel} un.</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 bg-slate-50 text-slate-500 rounded-2xl font-bold text-sm border border-slate-100 uppercase tracking-widest">
                    ⚠️ Ingresso não encontrado no sistema.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}