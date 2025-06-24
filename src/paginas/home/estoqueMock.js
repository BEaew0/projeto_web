export const usuarioMock = {
  id: 1,
  nomE_USUARIO: "Usuário Teste",
  email: "teste@example.com",
  senha: "123456",
  photo: "https://example.com/user.jpg",
  role: "user"
};



export const estoquesMock = [
  // --------------------------
  // ESTOQUE 101 – Eletrônicos
  // --------------------------
  {
    id: 1,
    iD_ESTOQUE: 101,
    nomE_ESTOQUE: "Estoque Principal",
    nomE_PRODUTO: "Notebook Dell Inspiron",
    quantidadE_PRODUTO: 10,
    valoR_PRODUTO: 4299.90,
    qtS_ITEM_VENDA: 6,
    tipO_PRODUTO: "Eletrônico",
    datA_ENTRADA: "2023-06-01",
    imG_PRODUTO: null,
    localizacao: "São Paulo - SP",
    fornecedor: {
      iD_FORNECEDOR: 101,
      nomE_FORNECEDOR: "Dell Brasil",
      cnpJ_FORNECEDOR: "12.345.678/0001-01",
      emaiL_FORNECEDOR: "vendas@dell.com.br",
      teL_FORNECEDOR: "(11) 4004-0001",
      ceL_FORNECEDOR: "(11) 99999-0001",
      enderecO_FORNECEDOR: "Av. das Nações Unidas, 8501 - São Paulo/SP"
    }
  },
  {
    id: 2,
    iD_ESTOQUE: 101,
    nomE_ESTOQUE: "Estoque Principal",
    nomE_PRODUTO: "Headset Gamer Razer",
    quantidadE_PRODUTO: 12,
    valoR_PRODUTO: 599.90,
    qtS_ITEM_VENDA: 3,
    tipO_PRODUTO: "Eletrônico",
    datA_ENTRADA: "2023-06-10",
    imG_PRODUTO: null,
    localizacao: "São Paulo - SP",
    fornecedor: {
      iD_FORNECEDOR: 102,
      nomE_FORNECEDOR: "Razer Store",
      cnpJ_FORNECEDOR: "98.765.432/0001-02",
      emaiL_FORNECEDOR: "contato@razer.com.br",
      teL_FORNECEDOR: "(11) 4004-0002",
      ceL_FORNECEDOR: "(11) 99999-0002",
      enderecO_FORNECEDOR: "Rua Fidêncio Ramos, 100 - São Paulo/SP"
    }
  },
  {
    id: 3,
    iD_ESTOQUE: 101,
    nomE_ESTOQUE: "Estoque Principal",
    nomE_PRODUTO: "Smartphone Samsung Galaxy A52",
    quantidadE_PRODUTO: 18,
    valoR_PRODUTO: 1899.99,
    tipO_PRODUTO: "Eletrônico",
    datA_ENTRADA: "2023-06-15",
    imG_PRODUTO: null,
    localizacao: "São Paulo - SP",
    fornecedor: {
      iD_FORNECEDOR: 103,
      nomE_FORNECEDOR: "Samsung Eletrônicos",
      cnpJ_FORNECEDOR: "23.456.789/0001-03",
      emaiL_FORNECEDOR: "vendas@samsung.com.br",
      teL_FORNECEDOR: "(11) 4004-0003",
      ceL_FORNECEDOR: "(11) 99999-0003",
      enderecO_FORNECEDOR: "Av. Dr. Chucri Zaidan, 920 - São Paulo/SP"
    }
  },
  {
    id: 4,
    iD_ESTOQUE: 101,
    nomE_ESTOQUE: "Estoque Principal",
    nomE_PRODUTO: "Tablet Lenovo P11",
    quantidadE_PRODUTO: 5,
    valoR_PRODUTO: 1199.90,
      qtS_ITEM_VENDA: 0,
    tipO_PRODUTO: "Eletrônico",
    datA_ENTRADA: "2023-06-20",
    imG_PRODUTO: null,
    localizacao: "São Paulo - SP",
    fornecedor: {
      iD_FORNECEDOR: 104,
      nomE_FORNECEDOR: "Lenovo Brasil",
      cnpJ_FORNECEDOR: "34.567.891/0001-04",
      emaiL_FORNECEDOR: "vendas@lenovo.com.br",
      teL_FORNECEDOR: "(11) 4004-0004",
      ceL_FORNECEDOR: "(11) 99999-0004",
      enderecO_FORNECEDOR: "Av. Francisco Matarazzo, 1400 - São Paulo/SP"
    }
  },
  {
    id: 5,
    iD_ESTOQUE: 101,
    nomE_ESTOQUE: "Estoque Principal",
    nomE_PRODUTO: "Monitor LG 27'' IPS",
    quantidadE_PRODUTO: 9,
    valoR_PRODUTO: 1049.90,
    qtS_ITEM_VENDA: 6,
    tipO_PRODUTO: "Eletrônico",
    datA_ENTRADA: "2023-06-25",
    imG_PRODUTO: null,
    localizacao: "São Paulo - SP",
    fornecedor: {
      iD_FORNECEDOR: 105,
      nomE_FORNECEDOR: "LG Eletronics",
      cnpJ_FORNECEDOR: "45.678.912/0001-05",
      emaiL_FORNECEDOR: "vendas@lg.com.br",
      teL_FORNECEDOR: "(11) 4004-0005",
      ceL_FORNECEDOR: "(11) 99999-0005",
      enderecO_FORNECEDOR: "Av. Paulista, 2000 - São Paulo/SP"
    }
  },
  {
    id: 6,
    iD_ESTOQUE: 101,
    nomE_ESTOQUE: "Estoque Principal",
    nomE_PRODUTO: "Caixa de Som JBL GO",
    quantidadE_PRODUTO: 30,
    valoR_PRODUTO: 249.90,
    qtS_ITEM_VENDA: 16,
    tipO_PRODUTO: "Eletrônico",
    datA_ENTRADA: "2023-06-27",
    imG_PRODUTO: null,
    localizacao: "São Paulo - SP",
    fornecedor: {
      iD_FORNECEDOR: 106,
      nomE_FORNECEDOR: "JBL Distribuidora",
      cnpJ_FORNECEDOR: "56.789.123/0001-06",
      emaiL_FORNECEDOR: "vendas@jbl.com.br",
      teL_FORNECEDOR: "(11) 4004-0006",
      ceL_FORNECEDOR: "(11) 99999-0006",
      enderecO_FORNECEDOR: "Rua Vergueiro, 1000 - São Paulo/SP"
    }
  },
  {
    id: 7,
    iD_ESTOQUE: 101,
    nomE_ESTOQUE: "Estoque Principal",
    nomE_PRODUTO: "Carregador Turbo USB-C",
    quantidadE_PRODUTO: 40,
    valoR_PRODUTO: 99.99,
      qtS_ITEM_VENDA:22,
    tipO_PRODUTO: "Acessório",
    datA_ENTRADA: "2023-06-28",
    imG_PRODUTO: null,
    localizacao: "São Paulo - SP",
    fornecedor: {
      iD_FORNECEDOR: 107,
      nomE_FORNECEDOR: "Acessórios Tech Ltda",
      cnpJ_FORNECEDOR: "67.891.234/0001-07",
      emaiL_FORNECEDOR: "vendas@atech.com.br",
      teL_FORNECEDOR: "(11) 4004-0007",
      ceL_FORNECEDOR: "(11) 99999-0007",
      enderecO_FORNECEDOR: "Av. Brigadeiro Faria Lima, 1500 - São Paulo/SP"
    }
  },
  {
    id: 8,
    iD_ESTOQUE: 101,
    nomE_ESTOQUE: "Estoque Principal",
    nomE_PRODUTO: "Webcam Logitech C920",
    quantidadE_PRODUTO: 20,
    valoR_PRODUTO: 399.90,
      qtS_ITEM_VENDA: 2,
    tipO_PRODUTO: "Periférico",
    datA_ENTRADA: "2023-06-29",
    imG_PRODUTO: null,
    localizacao: "São Paulo - SP",
    fornecedor: {
      iD_FORNECEDOR: 108,
      nomE_FORNECEDOR: "Logitech Brasil",
      cnpJ_FORNECEDOR: "78.912.345/0001-08",
      emaiL_FORNECEDOR: "vendas@logitech.com.br",
      teL_FORNECEDOR: "(11) 4004-0008",
      ceL_FORNECEDOR: "(11) 99999-0008",
      enderecO_FORNECEDOR: "Rua Bela Cintra, 1000 - São Paulo/SP"
    }
  },
  {
    id: 9,
    iD_ESTOQUE: 101,
    nomE_ESTOQUE: "Estoque Principal",
    nomE_PRODUTO: "SSD Kingston 480GB",
    quantidadE_PRODUTO: 25,
    valoR_PRODUTO: 359.99,
      qtS_ITEM_VENDA: 16,
    tipO_PRODUTO: "Informática",
    datA_ENTRADA: "2023-06-30",
    imG_PRODUTO: null,
    localizacao: "São Paulo - SP",
    fornecedor: {
      iD_FORNECEDOR: 109,
      nomE_FORNECEDOR: "Kingston Technology",
      cnpJ_FORNECEDOR: "89.123.456/0001-09",
      emaiL_FORNECEDOR: "vendas@kingston.com.br",
      teL_FORNECEDOR: "(11) 4004-0009",
      ceL_FORNECEDOR: "(11) 99999-0009",
      enderecO_FORNECEDOR: "Av. Eng. Luís Carlos Berrini, 1000 - São Paulo/SP"
    }
  },
  {
    id: 10,
    iD_ESTOQUE: 101,
    nomE_ESTOQUE: "Estoque Principal",
    nomE_PRODUTO: "Pen Drive Sandisk 64GB",
    quantidadE_PRODUTO: 100,
    valoR_PRODUTO: 59.90,
    qtS_ITEM_VENDA: 66,
    tipO_PRODUTO: "Acessório",
    datA_ENTRADA: "2023-07-01",
    imG_PRODUTO: null,
    localizacao: "São Paulo - SP",
    fornecedor: {
      iD_FORNECEDOR: 110,
      nomE_FORNECEDOR: "Sandisk Brasil",
      cnpJ_FORNECEDOR: "91.234.567/0001-10",
      emaiL_FORNECEDOR: "vendas@sandisk.com.br",
      teL_FORNECEDOR: "(11) 4004-0010",
      ceL_FORNECEDOR: "(11) 99999-0010",
      enderecO_FORNECEDOR: "Alameda Santos, 2000 - São Paulo/SP"
    }
  },

  // ----------------------------
  // ESTOQUE 102 – Periféricos
  // ----------------------------
  {
    id: 11,
    iD_ESTOQUE: 102,
    nomE_ESTOQUE: "Estoque de Periféricos",
    nomE_PRODUTO: "Mouse sem fio Logitech",
    quantidadE_PRODUTO: 25,
    valoR_PRODUTO: 189.90,
      qtS_ITEM_VENDA: 16,
    tipO_PRODUTO: "Periférico",
    datA_ENTRADA: "2023-07-02",
    imG_PRODUTO: null,
    localizacao: "Campinas - SP",
    fornecedor: {
      iD_FORNECEDOR: 201,
      nomE_FORNECEDOR: "Logitech Campinas",
      cnpJ_FORNECEDOR: "12.345.678/0001-11",
      emaiL_FORNECEDOR: "vendas@logitechcamp.com.br",
      teL_FORNECEDOR: "(19) 4004-0011",
      ceL_FORNECEDOR: "(19) 99999-0011",
      enderecO_FORNECEDOR: "Av. Brasil, 1000 - Campinas/SP"
    }
  },
  {
    id: 12,
    iD_ESTOQUE: 102,
    nomE_ESTOQUE: "Estoque de Periféricos",
    nomE_PRODUTO: "Teclado Mecânico RGB",
    quantidadE_PRODUTO: 15,
    valoR_PRODUTO: 349.90,
      qtS_ITEM_VENDA: 0,
    tipO_PRODUTO: "Periférico",
    datA_ENTRADA: "2023-07-05",
    imG_PRODUTO: null,
    localizacao: "Campinas - SP",
    fornecedor: {
      iD_FORNECEDOR: 202,
      nomE_FORNECEDOR: "Redragon Brasil",
      cnpJ_FORNECEDOR: "23.456.789/0001-12",
      emaiL_FORNECEDOR: "vendas@redragon.com.br",
      teL_FORNECEDOR: "(19) 4004-0012",
      ceL_FORNECEDOR: "(19) 99999-0012",
      enderecO_FORNECEDOR: "Rua José Paulino, 500 - Campinas/SP"
    }
  },
  {
    id: 13,
    iD_ESTOQUE: 102,
    nomE_ESTOQUE: "Estoque de Periféricos",
    nomE_PRODUTO: "Mousepad XL",
    quantidadE_PRODUTO: 50,
    valoR_PRODUTO: 59.90,
      qtS_ITEM_VENDA: 5,
    tipO_PRODUTO: "Acessório",
    datA_ENTRADA: "2023-07-06",
    imG_PRODUTO: null,
    localizacao: "Campinas - SP",
    fornecedor: {
      iD_FORNECEDOR: 203,
      nomE_FORNECEDOR: "Acessórios Gamer Ltda",
      cnpJ_FORNECEDOR: "34.567.891/0001-13",
      emaiL_FORNECEDOR: "vendas@acessgamer.com.br",
      teL_FORNECEDOR: "(19) 4004-0013",
      ceL_FORNECEDOR: "(19) 99999-0013",
      enderecO_FORNECEDOR: "Av. John Boyd Dunlop, 100 - Campinas/SP"
    }
  },
  {
    id: 14,
    iD_ESTOQUE: 102,
    nomE_ESTOQUE: "Estoque de Periféricos",
    nomE_PRODUTO: "Hub USB 4 portas",
    quantidadE_PRODUTO: 30,
    valoR_PRODUTO: 89.90,
      qtS_ITEM_VENDA: 60,
    tipO_PRODUTO: "Acessório",
    datA_ENTRADA: "2023-07-07",
    imG_PRODUTO: null,
    localizacao: "Campinas - SP",
    fornecedor: {
      iD_FORNECEDOR: 204,
      nomE_FORNECEDOR: "Tech Acessórios",
      cnpJ_FORNECEDOR: "45.678.912/0001-14",
      emaiL_FORNECEDOR: "vendas@techacess.com.br",
      teL_FORNECEDOR: "(19) 4004-0014",
      ceL_FORNECEDOR: "(19) 99999-0014",
      enderecO_FORNECEDOR: "Rua Doutor Salles Oliveira, 200 - Campinas/SP"
    }
  },
  {
    id: 15,
    iD_ESTOQUE: 102,
    nomE_ESTOQUE: "Estoque de Periféricos",
    nomE_PRODUTO: "Adaptador HDMI para VGA",
    quantidadE_PRODUTO: 35,
      qtS_ITEM_VENDA: 12,
    valoR_PRODUTO: 29.90,
    tipO_PRODUTO: "Acessório",
    datA_ENTRADA: "2023-07-08",
    imG_PRODUTO: null,
    localizacao: "Campinas - SP",
    fornecedor: {
      iD_FORNECEDOR: 205,
      nomE_FORNECEDOR: "Adaptec Eletrônicos",
      cnpJ_FORNECEDOR: "56.789.123/0001-15",
      emaiL_FORNECEDOR: "vendas@adaptec.com.br",
      teL_FORNECEDOR: "(19) 4004-0015",
      ceL_FORNECEDOR: "(19) 99999-0015",
      enderecO_FORNECEDOR: "Av. Aquidaban, 300 - Campinas/SP"
    }
  },
  {
    id: 16,
    iD_ESTOQUE: 102,
    nomE_ESTOQUE: "Estoque de Periféricos",
    nomE_PRODUTO: "Suporte para Notebook",
    quantidadE_PRODUTO: 22,
    valoR_PRODUTO: 119.90,
      qtS_ITEM_VENDA: 16,
    tipO_PRODUTO: "Acessório",
    datA_ENTRADA: "2023-07-09",
    imG_PRODUTO: null,
    localizacao: "Campinas - SP",
    fornecedor: {
      iD_FORNECEDOR: 206,
      nomE_FORNECEDOR: "Ergonomic Solutions",
      cnpJ_FORNECEDOR: "67.891.234/0001-16",
      emaiL_FORNECEDOR: "vendas@ergosolutions.com.br",
      teL_FORNECEDOR: "(19) 4004-0016",
      ceL_FORNECEDOR: "(19) 99999-0016",
      enderecO_FORNECEDOR: "Rua Conceição, 400 - Campinas/SP"
    }
  },
  {
    id: 17,
    iD_ESTOQUE: 102,
    nomE_ESTOQUE: "Estoque de Periféricos",
    nomE_PRODUTO: "Extensão Elétrica 5 Tomadas",
    quantidadE_PRODUTO: 18,
    valoR_PRODUTO: 49.99,
      qtS_ITEM_VENDA: 6,
    tipO_PRODUTO: "Acessório",
    datA_ENTRADA: "2023-07-10",
    imG_PRODUTO: null,
    localizacao: "Campinas - SP",
    fornecedor: {
      iD_FORNECEDOR: 207,
      nomE_FORNECEDOR: "Elétrica Brasil",
      cnpJ_FORNECEDOR: "78.912.345/0001-17",
      emaiL_FORNECEDOR: "vendas@eletricabrasil.com.br",
      teL_FORNECEDOR: "(19) 4004-0017",
      ceL_FORNECEDOR: "(19) 99999-0017",
      enderecO_FORNECEDOR: "Av. Orosimbo Maia, 500 - Campinas/SP"
    }
  },
  {
    id: 18,
    iD_ESTOQUE: 102,
    nomE_ESTOQUE: "Estoque de Periféricos",
    nomE_PRODUTO: "Scanner Epson",
    quantidadE_PRODUTO: 5,
    valoR_PRODUTO: 699.90,
      qtS_ITEM_VENDA: 6,
    tipO_PRODUTO: "Periférico",
    datA_ENTRADA: "2023-07-11",
    imG_PRODUTO: null,
    localizacao: "Campinas - SP",
    fornecedor: {
      iD_FORNECEDOR: 208,
      nomE_FORNECEDOR: "Epson Brasil",
      cnpJ_FORNECEDOR: "89.123.456/0001-18",
      emaiL_FORNECEDOR: "vendas@epson.com.br",
      teL_FORNECEDOR: "(19) 4004-0018",
      ceL_FORNECEDOR: "(19) 99999-0018",
      enderecO_FORNECEDOR: "Rua Barão de Jaguara, 600 - Campinas/SP"
    }
  },
  {
    id: 19,
    iD_ESTOQUE: 102,
    nomE_ESTOQUE: "Estoque de Periféricos",
    nomE_PRODUTO: "Impressora HP Deskjet",
    quantidadE_PRODUTO: 6,
    valoR_PRODUTO: 899.90,
      qtS_ITEM_VENDA: 2,
    tipO_PRODUTO: "Periférico",
    datA_ENTRADA: "2023-07-12",
    imG_PRODUTO: null,
    localizacao: "Campinas - SP",
    fornecedor: {
      iD_FORNECEDOR: 209,
      nomE_FORNECEDOR: "HP Brasil",
      cnpJ_FORNECEDOR: "91.234.567/0001-19",
      emaiL_FORNECEDOR: "vendas@hp.com.br",
      teL_FORNECEDOR: "(19) 4004-0019",
      ceL_FORNECEDOR: "(19) 99999-0019",
      enderecO_FORNECEDOR: "Av. Andrade Neves, 700 - Campinas/SP"
    }
  },
  {
    id: 20,
    iD_ESTOQUE: 102,
    nomE_ESTOQUE: "Estoque de Periféricos",
    nomE_PRODUTO: "Cabos USB Tipo C",
    quantidadE_PRODUTO: 80,
    valoR_PRODUTO: 19.90,
      qtS_ITEM_VENDA: 8,
    tipO_PRODUTO: "Acessório",
    datA_ENTRADA: "2023-07-13",
    imG_PRODUTO: null,
    localizacao: "Campinas - SP",
    fornecedor: {
      iD_FORNECEDOR: 210,
      nomE_FORNECEDOR: "Cabos e Conectores",
      cnpJ_FORNECEDOR: "12.345.678/0001-20",
      emaiL_FORNECEDOR: "vendas@cabosconect.com.br",
      teL_FORNECEDOR: "(19) 4004-0020",
      ceL_FORNECEDOR: "(19) 99999-0020",
      enderecO_FORNECEDOR: "Rua General Osório, 800 - Campinas/SP"
    }
  },

  // ------------------------
  // ESTOQUE 103 – Móveis
  // ------------------------
  {
    id: 21,
    iD_ESTOQUE: 103,
    nomE_ESTOQUE: "Estoque de Móveis",
    nomE_PRODUTO: "Cadeira gamer ergonômica",
    quantidadE_PRODUTO: 3,
    valoR_PRODUTO: 1299.99,
      qtS_ITEM_VENDA: 16,
    tipO_PRODUTO: "Móvel",
    datA_ENTRADA: "2023-07-01",
    imG_PRODUTO: null,
    localizacao: "Rio de Janeiro - RJ",
    fornecedor: {
      iD_FORNECEDOR: 301,
      nomE_FORNECEDOR: "Móveis Gamer RJ",
      cnpJ_FORNECEDOR: "23.456.789/0001-21",
      emaiL_FORNECEDOR: "vendas@moveisgamer.rj.com.br",
      teL_FORNECEDOR: "(21) 4004-0021",
      ceL_FORNECEDOR: "(21) 99999-0021",
      enderecO_FORNECEDOR: "Av. Rio Branco, 100 - Rio de Janeiro/RJ"
    }
  },
  {
    id: 22,
    iD_ESTOQUE: 103,
    nomE_ESTOQUE: "Estoque de Móveis",
    nomE_PRODUTO: "Mesa de escritório",
    quantidadE_PRODUTO: 5,
    valoR_PRODUTO: 799.50,
      qtS_ITEM_VENDA: 8,
    tipO_PRODUTO: "Móvel",
    datA_ENTRADA: "2023-07-05",
    imG_PRODUTO: null,
    localizacao: "Rio de Janeiro - RJ",
    fornecedor: {
      iD_FORNECEDOR: 302,
      nomE_FORNECEDOR: "Móveis Corporativos",
      cnpJ_FORNECEDOR: "34.567.891/0001-22",
      emaiL_FORNECEDOR: "vendas@moveiscorp.com.br",
      teL_FORNECEDOR: "(21) 4004-0022",
      ceL_FORNECEDOR: "(21) 99999-0022",
      enderecO_FORNECEDOR: "Rua do Ouvidor, 200 - Rio de Janeiro/RJ"
    }
  },
  {
    id: 23,
    iD_ESTOQUE: 103,
    nomE_ESTOQUE: "Estoque de Móveis",
    nomE_PRODUTO: "Armário de aço 2 portas",
    quantidadE_PRODUTO: 4,
    valoR_PRODUTO: 659.90,
      qtS_ITEM_VENDA: 9,
    tipO_PRODUTO: "Móvel",
    datA_ENTRADA: "2023-07-06",
    imG_PRODUTO: null,
    localizacao: "Rio de Janeiro - RJ",
    fornecedor: {
      iD_FORNECEDOR: 303,
      nomE_FORNECEDOR: "Móveis Metálicos RJ",
      cnpJ_FORNECEDOR: "45.678.912/0001-23",
      emaiL_FORNECEDOR: "vendas@moveismetal.rj.com.br",
      teL_FORNECEDOR: "(21) 4004-0023",
      ceL_FORNECEDOR: "(21) 99999-0023",
      enderecO_FORNECEDOR: "Av. Presidente Vargas, 300 - Rio de Janeiro/RJ"
    }
  },
  {
    id: 24,
    iD_ESTOQUE: 103,
    nomE_ESTOQUE: "Estoque de Móveis",
    nomE_PRODUTO: "Estante para livros",
    quantidadE_PRODUTO: 10,
    valoR_PRODUTO: 399.90,
      qtS_ITEM_VENDA: 16,
    tipO_PRODUTO: "Móvel",
    datA_ENTRADA: "2023-07-07",
    imG_PRODUTO: null,
    localizacao: "Rio de Janeiro - RJ",
    fornecedor: {
      iD_FORNECEDOR: 304,
      nomE_FORNECEDOR: "Móveis de Madeira",
      cnpJ_FORNECEDOR: "56.789.123/0001-24",
      emaiL_FORNECEDOR: "vendas@moveismadeira.com.br",
      teL_FORNECEDOR: "(21) 4004-0024",
      ceL_FORNECEDOR: "(21) 99999-0024",
      enderecO_FORNECEDOR: "Rua da Alfândega, 400 - Rio de Janeiro/RJ"
    }
  },
  {
    id: 25,
    iD_ESTOQUE: 103,
    nomE_ESTOQUE: "Estoque de Móveis",
    nomE_PRODUTO: "Mesa de reunião redonda",
    quantidadE_PRODUTO: 2,
    valoR_PRODUTO: 1199.90,
      qtS_ITEM_VENDA: 18,
    tipO_PRODUTO: "Móvel",
    datA_ENTRADA: "2023-07-08",
    imG_PRODUTO: null,
    localizacao: "Rio de Janeiro - RJ",
    fornecedor: {
      iD_FORNECEDOR: 305,
      nomE_FORNECEDOR: "Móveis Executivos",
      cnpJ_FORNECEDOR: "67.891.234/0001-25",
      emaiL_FORNECEDOR: "vendas@moveisexec.com.br",
      teL_FORNECEDOR: "(21) 4004-0025",
      ceL_FORNECEDOR: "(21) 99999-0025",
      enderecO_FORNECEDOR: "Av. Chile, 500 - Rio de Janeiro/RJ"
    }
  },
  {
    id: 26,
    iD_ESTOQUE: 103,
    nomE_ESTOQUE: "Estoque de Móveis",
    nomE_PRODUTO: "Gaveteiro com rodinhas",
    quantidadE_PRODUTO: 8,
    valoR_PRODUTO: 299.99,
      qtS_ITEM_VENDA: 20,
    tipO_PRODUTO: "Móvel",
    datA_ENTRADA: "2023-07-09",
    imG_PRODUTO: null,
    localizacao: "Rio de Janeiro - RJ",
    fornecedor: {
      iD_FORNECEDOR: 306,
      nomE_FORNECEDOR: "Móveis para Escritório",
      cnpJ_FORNECEDOR: "78.912.345/0001-26",
      emaiL_FORNECEDOR: "vendas@escritoriomoveis.com.br",
      teL_FORNECEDOR: "(21) 4004-0026",
      ceL_FORNECEDOR: "(21) 99999-0026",
      enderecO_FORNECEDOR: "Rua da Carioca, 600 - Rio de Janeiro/RJ"
    }
  },
  {
    id: 27,
    iD_ESTOQUE: 103,
    nomE_ESTOQUE: "Estoque de Móveis",
    nomE_PRODUTO: "Arquivo de pastas suspensas",
    quantidadE_PRODUTO: 7,
    valoR_PRODUTO: 499.90,
      qtS_ITEM_VENDA: 8,
    tipO_PRODUTO: "Móvel",
    datA_ENTRADA: "2023-07-10",
    imG_PRODUTO: null,
    localizacao: "Rio de Janeiro - RJ",
    fornecedor: {
      iD_FORNECEDOR: 307,
      nomE_FORNECEDOR: "Móveis Organizacionais",
      cnpJ_FORNECEDOR: "89.123.456/0001-27",
      emaiL_FORNECEDOR: "vendas@organizamoveis.com.br",
      teL_FORNECEDOR: "(21) 4004-0027",
      ceL_FORNECEDOR: "(21) 99999-0027",
      enderecO_FORNECEDOR: "Rua do Rosário, 700 - Rio de Janeiro/RJ"
    }
  },
  {
    id: 28,
    iD_ESTOQUE: 103,
    nomE_ESTOQUE: "Estoque de Móveis",
    nomE_PRODUTO: "Cadeira dobrável de plástico",
    quantidadE_PRODUTO: 20,
    valoR_PRODUTO: 89.90,
      qtS_ITEM_VENDA: 16,
    tipO_PRODUTO: "Móvel",
    datA_ENTRADA: "2023-07-11",
    imG_PRODUTO: null,
    localizacao: "Rio de Janeiro - RJ",
    fornecedor: {
      iD_FORNECEDOR: 308,
      nomE_FORNECEDOR: "Móveis Plásticos RJ",
      cnpJ_FORNECEDOR: "91.234.567/0001-28",
      emaiL_FORNECEDOR: "vendas@moveisplasticos.rj.com.br",
      teL_FORNECEDOR: "(21) 4004-0028",
      ceL_FORNECEDOR: "(21) 99999-0028",
      enderecO_FORNECEDOR: "Rua da Assembléia, 800 - Rio de Janeiro/RJ"
    }
  },
  {
    id: 29,
    iD_ESTOQUE: 103,
    nomE_ESTOQUE: "Estoque de Móveis",
    nomE_PRODUTO: "Poltrona de recepção",
    quantidadE_PRODUTO: 6,
    valoR_PRODUTO: 799.99,
      qtS_ITEM_VENDA: 26,
    tipO_PRODUTO: "Móvel",
    datA_ENTRADA: "2023-07-12",
    imG_PRODUTO: null,
    localizacao: "Rio de Janeiro - RJ",
    fornecedor: {
      iD_FORNECEDOR: 309,
      nomE_FORNECEDOR: "Móveis Conforto",
      cnpJ_FORNECEDOR: "12.345.678/0001-29",
      emaiL_FORNECEDOR: "vendas@moveisconforto.com.br",
      teL_FORNECEDOR: "(21) 4004-0029",
      ceL_FORNECEDOR: "(21) 99999-0029",
      enderecO_FORNECEDOR: "Av. Nilo Peçanha, 900 - Rio de Janeiro/RJ"
    }
  },
  {
    id: 30,
    iD_ESTOQUE: 103,
    nomE_ESTOQUE: "Estoque de Móveis",
    nomE_PRODUTO: "Mesa dobrável",
    quantidadE_PRODUTO: 10,
    valoR_PRODUTO: 219.90,
      qtS_ITEM_VENDA: 16,
    tipO_PRODUTO: "Móvel",
    datA_ENTRADA: "2023-07-13",
    imG_PRODUTO: null,
    localizacao: "Rio de Janeiro - RJ",
    fornecedor: {
      iD_FORNECEDOR: 310,
      nomE_FORNECEDOR: "Móveis Práticos",
      cnpJ_FORNECEDOR: "23.456.789/0001-30",
      emaiL_FORNECEDOR: "vendas@moveispraticos.com.br",
      teL_FORNECEDOR: "(21) 4004-0030",
      ceL_FORNECEDOR: "(21) 99999-0030",
         enderecO_FORNECEDOR: "Av. Nilo Peçanha, 900 - Rio de Janeiro/RJ"
    }
    }
]

export function agruparEntradasPorMes(estoques) {
  const agrupado = {};

  estoques.forEach(item => {
    if (!item.datA_ENTRADA || !item.quantidadE_PRODUTO) return;

    const data = new Date(item.datA_ENTRADA);
    if (isNaN(data)) return;

    const chave = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;

    if (!agrupado[chave]) agrupado[chave] = 0;
    agrupado[chave] += item.quantidadE_PRODUTO;
  });

  const mesesOrdenados = Object.keys(agrupado).sort();

  const labels = mesesOrdenados.map(m => {
    const [ano, mes] = m.split("-");
    const nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${nomesMeses[parseInt(mes) - 1]}/${ano}`;
  });

  const valores = mesesOrdenados.map(m => agrupado[m]);

  return { meses: labels, valores };
}

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