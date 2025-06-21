// src/mocks/estoquesMock.js

export const usuarioMock = {
  nomE_USUARIO: "lol"
};

export const estoquesMock = [
  // Estoque 1 - Eletrônicos
  {
    id: 1,
    iD_ESTOQUE: 101,
    nomE_ESTOQUE: "Estoque Principal",
    nomE_PRODUTO: "Notebook Dell Inspiron",
    quantidadE_PRODUTO: 10,
    valoR_PRODUTO: 4299.90,
    datA_ENTRADA: "2023-06-01",
    imG_PRODUTO: "https://example.com/notebook-dell.jpg",
    localizacao: "São Paulo - SP"
  },
  {
    id: 2,
    iD_ESTOQUE: 101,
    nomE_ESTOQUE: "Estoque Principal",
    nomE_PRODUTO: "Mouse sem fio Logitech",
    quantidadE_PRODUTO: 25,
    valoR_PRODUTO: 189.90,
    datA_ENTRADA: "2023-06-05",
    imG_PRODUTO: "https://example.com/mouse-logitech.jpg",
    localizacao: "São Paulo - SP"
  },
  {
    id: 3,
    iD_ESTOQUE: 101,
    nomE_ESTOQUE: "Estoque Principal",
    nomE_PRODUTO: "Monitor 24\" Full HD",
    quantidadE_PRODUTO: 8,
    valoR_PRODUTO: 899.00,
    datA_ENTRADA: "2023-06-12",
    imG_PRODUTO: null,
    localizacao: "São Paulo - SP"
  },

  // Estoque 2 - Móveis
  {
    id: 4,
    iD_ESTOQUE: 102,
    nomE_ESTOQUE: "Estoque Secundário",
    nomE_PRODUTO: "Cadeira gamer ergonômica",
    quantidadE_PRODUTO: 3,
    valoR_PRODUTO: 1299.99,
    datA_ENTRADA: "2023-07-01",
    imG_PRODUTO: "https://example.com/cadeira-gamer.jpg",
    localizacao: "Rio de Janeiro - RJ"
  },
  {
    id: 5,
    iD_ESTOQUE: 102,
    nomE_ESTOQUE: "Estoque Secundário",
    nomE_PRODUTO: "Mesa de escritório",
    quantidadE_PRODUTO: 5,
    valoR_PRODUTO: 799.50,
    datA_ENTRADA: "2023-07-05",
    imG_PRODUTO: null,
    localizacao: "Rio de Janeiro - RJ"
  }
];

// Funções mockadas
export const mockAcharUsuario = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(usuarioMock);
    }, 300);
  });
};

export const mockBuscarTodosEstoques = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(estoquesMock);
    }, 500);
  });
};