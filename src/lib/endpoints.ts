export const endpoints = {
  auth: {
    login: "/login",
    me: "/me",
  },
  bills: {
    list: "/despesas",
    create: "/despesas",
    update: "/despesas/:id",
    delete: "/despesas/:id",
  },
  bank: {
    list: "/bancos-nautt",
    create: "/bancos-nautt",
    update: "/bancos-nautt/:id",
    delete: "/bancos-nautt/:id",
  },
};
