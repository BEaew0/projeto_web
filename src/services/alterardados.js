import api from "./api";

export const alterarCampoUsuario = async (campo, novoValor) => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Usuário não autenticado');

        const response = await api.patch(
            'https://srv869019.hstgr.cloud/alterar-campo',
            {
                campo: campo,
                novoValor: novoValor
            },
            {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response.data;
    } 
    catch (error) {
        console.error("Erro ao alterar campo:", error);
        
        let errorMessage = "Erro ao atualizar dados";
        if (error.response) {
            switch(error.response.status) {
                case 400:
                    errorMessage = "Dados inválidos";
                    break;
                case 401:
                    errorMessage = "Não autorizado - faça login novamente";
                    break;
                case 404:
                    errorMessage = "Usuário não encontrado";
                    break;
                default:
                    errorMessage = error.response.data?.message || "Erro no servidor";
            }
        } else if (error.request) {
            errorMessage = "Sem resposta do servidor";
        }

        throw new Error(errorMessage);
    }
};