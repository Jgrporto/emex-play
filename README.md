# EMEX Play

![EMEX Play Logo](public/emex-logo.png)

Plataforma interna de treinamentos da EMEX, desenvolvida com as tecnologias mais modernas para uma experiência de usuário rápida e fluida. O conteúdo é 100% gerenciável através de um painel de controle online (CMS).

## ✨ Funcionalidades Principais

* **Catálogo de Conteúdo Dinâmico:** Treinamentos e categorias gerenciados via Headless CMS (Sanity.io).
* **Sistema de Autenticação Privado:** Login com email e senha para usuários pré-cadastrados.
* **Painel de Gerenciamento Online:**
    * **Sanity Studio:** Para gerenciar o conteúdo principal (treinamentos, categorias, perfis de usuário).
    * **Painel Admin Interno:** Uma área segura dentro do próprio site para criar novos usuários com senhas criptografadas.
* **Barra Lateral de Perfil de Usuário:** Acesso rápido a informações do usuário e função de logout.
* **Busca de Conteúdo:** Funcionalidade de busca em tempo real na página de treinamentos.
* **Design Responsivo:** Interface adaptada para desktops e dispositivos móveis.

## 🔗 Links Importantes

| Serviço | URL | Propósito |
| :--- | :--- | :--- |
| **Site em Produção** | `https://emex-play.vercel.app` | O site principal que os usuários acessam. |
| **Painel de Conteúdo** | `https://seu-hostname.sanity.studio` | **(Principal)** Onde você cria/edita **treinamentos, categorias e edita perfis** (ex: troca de avatar). |
| **Painel de Criação de Usuários**| `https://emex-play.vercel.app/admin/criar-usuario` | **(Ação Especial)** Onde você, como admin, cria **novos usuários** com suas senhas. |

**Atenção:** Lembre-se de substituir `seu-hostname` pelo nome que você escolheu para o seu Sanity Studio.

## 🚀 Tech Stack

* **Framework:** Next.js (App Router)
* **Estilização:** Tailwind CSS
* **Autenticação:** NextAuth.js (Auth.js)
* **Headless CMS:** Sanity.io
* **Hospedagem (Frontend):** Vercel
* **Hospedagem (CMS):** Sanity

## 🛠️ Rodando o Projeto Localmente

### Frontend (O Site)

1.  Navegue até a pasta raiz do projeto.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Execute o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
4.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Backend (O Painel de Conteúdo)

1.  Navegue até a pasta `studio`:
    ```bash
    cd studio
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Execute o servidor de desenvolvimento do Sanity Studio:
    ```bash
    npm run dev
    ```
4.  Abra [http://localhost:3333](http://localhost:3333) no seu navegador.

## 🔒 Variáveis de Ambiente

Para rodar o projeto localmente, crie um arquivo chamado `.env.local` na raiz do projeto e adicione as seguintes variáveis:

```env
# Credenciais do Administrador (usado apenas no primeiro login, agora é gerenciado pelo Sanity)
ADMIN_EMAIL=admin@emex.com
ADMIN_PASSWORD=SUA_SENHA_FORTE_AQUI

# Chave secreta para o Next-Auth
NEXTAUTH_SECRET=UMA_CHAVE_SECRETA_QUALQUER_BEM_LONGA_E_DIFICIL

# --- DADOS DO SANITY ---
NEXT_PUBLIC_SANITY_PROJECT_ID=SEU_PROJECT_ID_DO_SANITY
SANITY_API_TOKEN=SEU_TOKEN_DE_API_DO_SANITY_COM_PERMISSÃO_DE_ESCRITA
```