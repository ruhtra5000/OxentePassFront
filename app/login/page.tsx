'use client'

import { useRouter } from "next/navigation";
import { chamadaAPI } from "../../backend/chamadaPadrao";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../_components/Auth/AuthProvider";
import { useToast } from "../_components/ToastProvider";
import { Lock, Fingerprint, ArrowRight, UserCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { atualizarUsuario } = useAuth();
  const { showToast } = useToast();
  
  const [focoAtivo, setFocoAtivo] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [formData, setFormData] = useState({
    cpf: "",
    senha: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    try {
      const response = await chamadaAPI("/usuario/login", "POST", formData);

      if (!response) {
        showToast("Não foi possível realizar o login com os dados informados.", "error");
        setCarregando(false);
        return;
      }

      await atualizarUsuario();
      
      router.push("/");
      router.refresh();
      
    } catch (error) {
      showToast("Ocorreu um erro interno.", "error");
      setCarregando(false);
    }
  }

  return (
    <div 
      className="bg-slate-50 flex items-center justify-center z-0"
      style={{ 
        position: 'fixed', 
        top: 0, left: 0, right: 0, bottom: 0, 
        width: '100vw', height: '100vh', 
        overflow: 'hidden', 
        paddingTop: '80px'
      }}
    >
      
      {/* CARD PRINCIPAL */}
      <div 
        className="bg-white rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-slate-100 relative z-10"
        style={{ width: '100%', maxWidth: '600px', padding: '32px', boxSizing: 'border-box', margin: '0 16px' }}
      >
        
        <div className="text-center mb-8">
          <div className="bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100" style={{ width: '56px', height: '56px' }}>
            <UserCircle2 className="w-7 h-7 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-1">Acessar Conta</h2>
          <p className="text-xs font-medium text-slate-400">Insira suas credenciais para entrar.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="cpf" className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 block mb-2">
              Documento (CPF)
            </label>
            <div style={{ position: 'relative', width: '100%' }}>
              <div 
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
                className={`transition-colors duration-300 ${focoAtivo === 'cpf' ? 'text-emerald-500' : 'text-slate-400'}`}
              >
                <Fingerprint className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="cpf"
                id="cpf"
                required
                value={formData.cpf}
                onChange={handleChange}
                onFocus={() => setFocoAtivo('cpf')}
                onBlur={() => setFocoAtivo(null)}
                maxLength={11}
                placeholder="Somente números"
                style={{ width: '100%', padding: '16px 16px 16px 48px', boxSizing: 'border-box' }} 
                className="bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-300 text-sm"
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="senha" className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 block mb-2">
              Senha de Acesso
            </label>
            <div style={{ position: 'relative', width: '100%' }}>
              <div 
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
                className={`transition-colors duration-300 ${focoAtivo === 'senha' ? 'text-emerald-500' : 'text-slate-400'}`}
              >
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                name="senha"
                id="senha"
                required
                value={formData.senha}
                onChange={handleChange}
                onFocus={() => setFocoAtivo('senha')}
                onBlur={() => setFocoAtivo(null)}
                minLength={8}
                placeholder="••••••••"
                style={{ width: '100%', padding: '16px 16px 16px 48px', boxSizing: 'border-box' }} 
                className="bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-300 tracking-widest text-sm"
              />
            </div>
          </div>

          <div style={{ paddingTop: '12px' }}>
            <button
              type="submit"
              disabled={carregando}
              style={{ width: '100%', padding: '16px', boxSizing: 'border-box' }}
              className="group relative flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none"
            >
              <span>{carregando ? "Autenticando..." : "Realizar Login"}</span>
              {!carregando && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <span className="text-[11px] font-medium text-slate-400">Não tem uma conta? </span>
          <Link
            href="/cadastro"
            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wider ml-1"
          >
            Cadastre-se agora
          </Link>
        </div>

      </div>
    </div>
  );
}