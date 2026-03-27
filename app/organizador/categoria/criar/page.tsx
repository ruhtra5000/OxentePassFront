'use client'

import { chamadaAPI } from "../../../../backend/chamadaPadrao";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/app/_components/ToastProvider";
import "../../../globals.css";
import { LayoutGeral } from "@/app/_components/LayoutGeral";
import { HeaderInterno } from "@/app/_components/HeaderInterno";

export default function CriarCategoria() {
  const { showToast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    tag: ""
  });
  const [carregando, setCarregando] = useState(false);

  const criarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    const data = {
      tag: formData.tag
    }

    try {
      const response = await chamadaAPI(
        "/tag", "POST", data, {
          returnMeta: true,
          silenciarErro: false,
        }
      )
      
      if (!response.ok) {
        showToast(String(response.data?.mensagem || "Falha na criação"), "error")
        return
      }

      showToast("✅ Categoria criada com sucesso!", "success")
      router.push("/organizador/categoria");
    } catch (error) {
      showToast("Erro ao conectar com o servidor", "error");
    } finally {
      setCarregando(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <LayoutGeral voltarLink="/organizador/categoria" compacto>
      <HeaderInterno 
        titulo="Nova Categoria" 
        subtitulo="Cadastre uma nova tag para organizar seus eventos" 
        iconeString="🏷️" 
      />

      <div className="p-8 sm:p-10">
        <form onSubmit={criarCategoria} className="space-y-8">
          <div className="flex flex-col gap-3">
            <label 
              htmlFor="tag" 
              className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1"
            >
              Nome da Categoria <b className="text-red-500">*</b>
            </label>
            <input 
              type="text" 
              name="tag" 
              id="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder="Ex: Show, Palestra, Workshop..." 
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
              required 
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={carregando}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-black py-5 rounded-2xl shadow-lg shadow-teal-100 transition-all uppercase text-xs tracking-widest disabled:bg-slate-200 disabled:shadow-none"
            >
              {carregando ? "Criando..." : "Finalizar Cadastro"}
            </button>
          </div>
        </form>
      </div>
    </LayoutGeral>
  );
}