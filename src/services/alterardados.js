import api from "./api";

export const alterarUser = async (userData) =>{
    try{
        const credenciais={
            NOME_USUARIO: userData.NOME_USUARIO,
            EMAIL_USUARIO: userData.EMAIL_USUARIO,
            DATA_NASC_USUARIO: userData.DATA_NASC_USUARIO,
            CPF_USUARIO: userData.CPF_USUARIO.replace(/\D/g, ""), // Remove pontuação
            SENHA_USUARIO: userData.SENHA_USUARIO,
            ID_ASSINATURA_FK: userData.ID_ASSINATURA_FK || 1, // Default 1
            ...(userData.CNPJ_USUARIO && { CNPJ_USUARIO: userData.CNPJ_USUARIO.replace(/\D/g, "") }),
            ...(userData.FOTO_USUARIO && { FOTO_USUARIO: userData.FOTO_USUARIO }),
            ...(userData.DATA_VALIDADE_ASSINATURA_USUARIO && { DATA_VALIDADE_ASSINATURA_USUARIO: userData.DATA_VALIDADE_ASSINATURA_USUARIO })
        };
    }
    catch (error) {
        console.error("Erro ao mostrar dados", error);

    }
} 