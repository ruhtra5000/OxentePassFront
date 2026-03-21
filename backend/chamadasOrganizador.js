import { chamadaAPI } from "./chamadaPadrao";

export async function buscarMeuPerfilOrganizador() {
    return await chamadaAPI("/organizador/me", "GET");
}

export async function editarMeuPerfilOrganizador(dados) {
    return await chamadaAPI("/organizador/me", "PATCH", dados);
}
