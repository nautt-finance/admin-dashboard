export const endpoints = {
  auth: {
    login: "/login",
    me: "/me",
  },
  bills: {
    list: "/despesas",
    create: "/despesas",
    update: "/despesas/:id",
    delete: (id: string) => `/despesas/${id}`,
  },
  bank: {
    list: "/bancos-nautt",
    create: "/bancos-nautt",
    update: (id: string) => `/bancos-nautt?banco_id=${id}`,
    delete: (id: string) => `/bancos-nautt?banco_id=${id}`,
  },
};
