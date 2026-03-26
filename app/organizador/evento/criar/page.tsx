import { chamadaAPI } from "../../../../backend/chamadaPadrao";
import { redirect } from "next/navigation";
import Form from "@/app/_components/Form";
import CategoriaSelector from "@/app/_components/Organizador/CategoriaSelector";
import { LayoutGeral } from "@/app/_components/LayoutGeral";
import { HeaderInterno } from "@/app/_components/HeaderInterno";
import { MapPin, Calendar, Users, Phone, Info, CheckCircle2 } from "lucide-react";
import "../../../globals.css";

async function criarEvento(formData: FormData) {
  'use server'
  const tipoEvento = formData.get("tipo");
  const inicioBruto = formData.get("dataHoraInicio")?.toString() || "";
  const fimBruto = formData.get("dataHoraFim")?.toString() || "";
  const inicioFormatado = inicioBruto ? inicioBruto.replace("T", " ") + ":00" : null;
  const fimFormatado = fimBruto ? fimBruto.replace("T", " ") + ":00" : null;

  const data = {
    nome: formData.get("nome"),
    descricao: formData.get("descricao"),
    idOrganizador: 0, 
    idCidade: Number(formData.get("cidade")), 
    dataHoraInicio: inicioFormatado,
    dataHoraFim: fimFormatado,
    endereco: {
      cep: formData.get("cep"),
      bairro: formData.get("bairro"),
      rua: formData.get("rua"),
      numero: formData.get("numero")
    },
    classificacao: formData.get("classificacao"),
    emailContato: formData.get("email"), 
    telefoneContato: formData.get("telefone") 
  }

  const evento = await chamadaAPI(`/evento/${tipoEvento}`, "POST", data)
  
  if (evento?.id) {
    const tagsExistentes = formData.getAll('tagsExistentes');
    const tagsNovas = formData.getAll('tagsNovas');

    for (const tag of tagsExistentes) {
      await chamadaAPI(`/evento/${evento.id}/addTag/${tag}`, "PATCH");
    }

    for (const tag of tagsNovas) {
      await chamadaAPI(`/evento/${evento.id}/addTag`, "PATCH", { tag: tag });
    }

    redirect("/organizador/evento");
  }
}

async function getCategorias() {
  const response = await chamadaAPI(`/tag`, "GET");
  return response?.content || [];
}

async function getCidades() {
  const response = await chamadaAPI(`/cidade`, "GET");
  return response?.content || [];
}

export default async function CriarEventoPage() {
  const categorias = await getCategorias();
  const cidades = await getCidades();
  const inputClass = "w-full border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-slate-50/50";
  const labelClass = "text-sm font-bold text-slate-700 flex items-center gap-1 mb-2";
  const sectionTitleClass = "flex items-center gap-2 text-slate-400 border-b border-slate-100 pb-2 mb-6 mt-10 first:mt-0";

  return (
    <LayoutGeral voltarLink="/organizador/evento" scroll>
      <HeaderInterno 
        titulo="Criar Novo Evento"
        subtitulo="Preencha os detalhes para publicar seu evento na plataforma"
        iconeString="🎉"
      />

      <div className="p-8 lg:p-12">
        <Form
          title=""
          action={criarEvento}
          buttons={
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] mt-8 flex items-center justify-center gap-2">
              <CheckCircle2 size={20} />
              CRIAR EVENTO
            </button>
          }
        >
          <div className="flex flex-col">
            
            {/* Seção 1: Informações Gerais */}
            <div className={sectionTitleClass}>
              <Info size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest">Informações Gerais</h2>
            </div>
            
            <div className="flex flex-col mb-4">
              <label className={labelClass} htmlFor="nome">Nome do Evento <span className="text-red-500">*</span></label>
              <input type="text" name="nome" id="nome" placeholder="Ex: Festival de Verão 2026" className={inputClass} required />
            </div>

            <div className="flex flex-col mb-6">
              <label className={labelClass} htmlFor="descricao">Descrição Completa <span className="text-red-500">*</span></label>
              <textarea name="descricao" id="descricao" rows={4} placeholder="Descreva os detalhes e atrações..." className={`${inputClass} resize-none`} required />
            </div>

            <div className="flex flex-col mb-4">
              <label className={labelClass}>Haverão sub-eventos vinculados?</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50/50">
                  <input type="radio" name="tipo" value="simples" defaultChecked className="accent-emerald-600 w-4 h-4" />
                  <span className="text-sm font-bold text-slate-600">Não</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50/50">
                  <input type="radio" name="tipo" value="composto" className="accent-emerald-600 w-4 h-4" />
                  <span className="text-sm font-bold text-slate-600">Sim</span>
                </label>
              </div>
            </div>

            {/* Seção 2: Localização */}
            <div className={sectionTitleClass}>
              <MapPin size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest">Localização</h2>
            </div>
            
            <div className="flex flex-col mb-6">
              <label className={labelClass} htmlFor="cidade">Cidade</label>
              <select name="cidade" id="cidade" className={inputClass} required>
                {cidades.map((item: any) => (
                  <option key={item.id} value={item.id}>{item.nome}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="flex flex-col">
                <label className={labelClass} htmlFor="cep">CEP</label>
                <input type="number" name="cep" id="cep" placeholder="00000000" className={inputClass} required />
              </div>
              <div className="flex flex-col">
                <label className={labelClass} htmlFor="bairro">Bairro</label>
                <input type="text" name="bairro" id="bairro" className={inputClass} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <div className="flex flex-col md:col-span-2">
                <label className={labelClass} htmlFor="rua">Rua</label>
                <input type="text" name="rua" id="rua" className={inputClass} required />
              </div>
              <div className="flex flex-col md:col-span-1">
                <label className={labelClass} htmlFor="numero">Número</label>
                <input type="text" name="numero" id="numero" className={inputClass} required />
              </div>
            </div>

            {/* Seção 3: Programação */}
            <div className={sectionTitleClass}>
              <Calendar size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest">Data e Classificação</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label className={labelClass} htmlFor="dataHoraInicio">Início do Evento</label>
                <input type="datetime-local" name="dataHoraInicio" id="dataHoraInicio" className={inputClass} required />
              </div>
              <div className="flex flex-col">
                <label className={labelClass} htmlFor="dataHoraFim">Fim do Evento</label>
                <input type="datetime-local" name="dataHoraFim" id="dataHoraFim" className={inputClass} required />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className={labelClass} htmlFor="classificacao">Classificação Indicativa</label>
              <select name="classificacao" id="classificacao" className={inputClass}>
                {["Livre", "10 Anos", "12 Anos", "14 Anos", "16 Anos", "18 Anos"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Seção 4: Contato */}
            <div className={sectionTitleClass}>
              <Phone size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest">Contato</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="flex flex-col">
                <label className={labelClass} htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" className={inputClass} />
              </div>
              <div className="flex flex-col">
                <label className={labelClass} htmlFor="telefone">Telefone</label>
                <input type="tel" name="telefone" id="telefone" className={inputClass} />
              </div>
            </div>

            {/* Seção 5: Categorias */}
            <div className={sectionTitleClass}>
              <Users size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest">Categorias</h2>
            </div>
            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
              <CategoriaSelector tagsExistentes={categorias} />
            </div>

          </div>
        </Form>
      </div>
    </LayoutGeral>
  );
}