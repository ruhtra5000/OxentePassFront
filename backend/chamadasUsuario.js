import { chamadaAPI } from "./chamadaPadrao";

export async function buscarMeuPerfil() {
    return await chamadaAPI("/usuario/me", "GET");
}

export async function editarUsuario(idUsuario, dados) {
    return await chamadaAPI(`/usuario/${idUsuario}`, "PATCH", dados);
}
