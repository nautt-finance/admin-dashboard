export const endpoints = {
  auth: {
    login: "/login",
    me: "/me",
  },
  bills: {
    list: "/despesas/busca",
    create: "/despesas",
    update: "/despesas/:id",
    delete: (id: string) => `/despesas/${id}`,
  },
  coins: {
    list: "/moedas",
  },
  bank: {
    list: "/bancos-nautt",
    create: "/bancos-nautt",
    update: `/bancos-nautt`,
    delete: (id: string) => `/bancos-nautt?banco_id=${id}`,
  },
};
