import React, {createContext,useState,useContext} from "react";

const criarContexto=createContext();

export const  mudarTema= ({children})=>
{
    const[tema,setTema]=useState(() =>
    {
        const temaSalvo =localStorage.getItem('theme');
        return temaSalvo ? temaSalvo : 'light';
    });

     useEffect(() => 
    {
        document.documentElement.setAttribute('data-theme', tema);
    }, [tema]);


   
    const mudarTema = () => 
    {
        setTheme(temaSalvo => 
            {
                const novoTema = temaSalvo === 'light' ? 'dark' : 'light';
                localStorage.setItem('theme', novoTema);
                setTema(novoTema);
            });
        };

     return (
        <TemaContext.Provider value={{ tema, alternarTema }}>
            {children}
        </TemaContext.Provider>
        );

};
//exporta o tema
 export const useTema = () => {
    const context = useContext(TemaContext);
    if (!context) {

        throw new Error('Tema nãocarregado');
    }
    return context;
 };
