# Nautt Finances

Dashboard para visualização de métricas financeiras

> ✨ Totalmente baseada em **componentes reutilizáveis**, **separação por features** e
> **boas práticas com React + TypeScript**.

---

## 📁 Estrutura de Pastas.

```bash
src/
├── app/                        # Rotas
│   ├── globals.css             # Estilos globais
│   ├── layout.tsx              # Layout padrão da aplicação
│   └── page.tsx                # Página inicial
│
├── components/                # Componentes genéricos reutilizáveis
│   ├── TextField/             # Ex: campo de texto customizado
│   └── ui/                    # Componentes visuais (botões, modais, etc)
│
├── providers/                 # Todos os context api do projeto.
│   └── theme-provider/        # Ex: Theme provider
│
├── constants/                 # Constantes globais
│   └── errors.ts              # Mensagens de erro
│
├── feature/                   # Divisão por funcionalidades da aplicação
│   └── auth/                  # Módulo de autenticação
│       └── screens/login/     # Tela de login
│           ├── _components/   # Componentes específicos da tela
│           │   └── LoginForm/
│           ├── _hooks/        # Hooks específicos da tela
│           │   └── useLogin.ts
│           └── _schema/       # Schemas de validação
│               └── index.ts
│
├── hooks/                     # Hooks reutilizáveis
│   └── useFieldError.ts
│
├── lib/                       # Funções utilitárias menores
│   ├── api.ts                 # Configuração do Axios
│   ├── endpoints.ts           # Endpoints organizados
│   └── routes.ts              # Rotas nomeadas
```

---

## ⚙️ Tecnologias Utilizadas

- **React + TypeScript**
- **React Hook Form** + **Zod**
- **Tailwind CSS**
- **Axios**
- **Modularização por Feature**
- **Componentes Reutilizáveis**
- **Validação e Tipagem Estrita**

---

## 🔧 Como usar esta base

- Crie novas funcionalidades dentro de `feature/`.
- Use a pasta `_components`, `_hooks`, `_schema` para organizar melhor a lógica da tela.
- Utilize `components/ui` para criar elementos visuais genéricos.
- Configure rotas nomeadas em `utils/routes.ts` e use em todo o app.
- Os estilos globais estão em `app/globals.css`.

---
