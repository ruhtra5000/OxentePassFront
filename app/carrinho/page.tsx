'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, ShoppingCart } from "lucide-react";
import { LayoutGeral } from "@/app/_components/LayoutGeral";
import { HeaderInterno } from "@/app/_components/HeaderInterno";

export default function CarrinhoPage() {
  const [itens, setItens] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const salvo = JSON.parse(localStorage.getItem('carrinho_oxente') || '[]');
    setItens(salvo);
  }, []);

  const removerItem = (index: number) => {
    const novo = itens.filter((_, i) => i !== index);
    setItens(novo);
    localStorage.setItem('carrinho_oxente', JSON.stringify(novo));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const total = itens.reduce((acc, obj) => acc + (obj.valorBase * (obj.qtdCarrinho || 1)), 0);

  return (
    <LayoutGeral voltarLink="/" compacto>
      <HeaderInterno 
        titulo="Seu Carrinho" 
        subtitulo="Confira seus itens antes de fechar o pedido" 
        iconeString="🛒" 
      />

      <div className="p-8 sm:p-10 space-y-6">
        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4">
          {itens.length === 0 ? (
            <div className="py-12 text-center font-bold text-slate-400 uppercase tracking-widest text-xs">
              O carrinho está vazio.
            </div>
          ) : (
            itens.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl text-teal-600 shadow-sm border border-slate-100">
                    <ShoppingCart size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 uppercase text-[11px] tracking-tight">{item.tipo}</h4>
                    <p className="text-lg font-black text-teal-600">R$ {item.valorBase?.toFixed(2)}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removerItem(i)} 
                  className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col gap-6">
          <div className="flex justify-between items-center px-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total do Pedido</span>
            <span className="text-3xl font-black text-slate-800 tracking-tighter">R$ {total.toFixed(2)}</span>
          </div>

          <button 
            disabled={itens.length === 0}
            onClick={() => router.push(`/vendas/criar?origem=carrinho`)}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-black py-5 rounded-2xl shadow-lg shadow-teal-100 transition-all uppercase text-xs tracking-[0.2em] disabled:bg-slate-200 disabled:shadow-none"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </LayoutGeral>
  );
}