import React, { createContext, useState, useContext, useEffect } from "react";

const TemaContext = createContext();


export const TemaProvider = ({ children }) => 
{
    const [tema, setTema] = useState(() => 
    {
        const temaSalvo = localStorage.getItem('theme');
        return temaSalvo ? temaSalvo : 'light';
    });

    //  Aplica o tema ao documento
    useEffect(() => 
    {
        document.documentElement.setAttribute('data-theme', tema);
        
    }, [tema]);

    //  Função para alternar entre temad
    const alternarTema = () => 
    {
        const novoTema = tema == 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', novoTema);
        setTema(novoTema);
    };

    return (
        <TemaContext.Provider value={{ tema, alternarTema }}>
            {children}
        </TemaContext.Provider>
    );
};

export const useTema = () => 
{
    const context = useContext(TemaContext);
    if (!context) 
    {
        throw new Error('tema não encontrado');
    }
    return context;
};