# FlaStore Analytics

Loja online mockada do Flamengo com rastreamento de cliques por produto e painel admin com estatísticas em tempo real.

Feito em Angular 21, sem backend, sem banco de dados — tudo roda no navegador via `localStorage`.

---

## Deploy

O projeto está publicado em **[flastore.vercel.app](https://flastore.vercel.app)**.

Qualquer push para a branch `main` dispara um novo deploy automaticamente via Vercel.

---

## Rodando o projeto

```bash
npm install
npm start
```

Acesse `http://localhost:4200`.

---

## Acesso ao admin

| Campo | Valor |
|---|---|
| URL | `/admin/login` |
| Usuário | `admin` |
| Senha | `admin` |

---

## Configurando o Microsoft Clarity em produção

O projeto já tem o `ClarityService` integrado. Quando o script do Clarity estiver ativo, os eventos são enviados automaticamente — sem precisar mudar nada no código Angular.

**Passo a passo:**

1. Acesse [clarity.microsoft.com](https://clarity.microsoft.com) e crie uma conta
2. Crie um novo projeto e copie o **ID** gerado (ex: `abc123xyz`)
3. Abra o arquivo `src/index.html`
4. Localize o bloco comentado com `MICROSOFT CLARITY`
5. Descomente o script e substitua `SEU_ID_CLARITY` pelo seu ID:

```html
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "SEU_ID_CLARITY");
</script>
```

6. Faça o build e deploy normalmente

A partir daí, cada clique em produto passa a ser enviado ao painel do Clarity com o nome do evento e os dados do produto. Enquanto o script não estiver ativo, os eventos ficam salvos só no `localStorage` como fallback.

---

## Arquitetura

SPA Angular 21, standalone components, lazy loading em todas as rotas.

```
src/app/
├── core/
│   ├── services/
│   │   ├── product.service       # produtos mockados
│   │   ├── analytics.service     # leitura e escrita no localStorage
│   │   ├── clarity.service       # integração com Microsoft Clarity
│   │   └── auth.service          # autenticação mockada
│   ├── guards/
│   │   └── auth.guard            # protege /admin/dashboard
│   └── interceptors/
│       └── auth.interceptor      # injeta token JWT nos requests HTTP
│
├── shared/
│   └── components/
│       ├── navbar
│       └── product-card
│
├── features/
│   ├── store/pages/
│   │   ├── store-home            # catálogo com filtro por categoria
│   │   └── product-detail        # página do produto (/produto/:id)
│   └── admin/pages/
│       ├── admin-login
│       └── admin-dashboard       # ranking, eventos recentes, estatísticas
│
├── models/
│   ├── product.model
│   └── analytics-event.model
│
├── app.routes.ts
├── app.config.ts
└── app.ts
```

### Fluxo de rastreamento

Cada interação do usuário (abrir detalhe, comprar, adicionar ao carrinho) dispara dois rastreamentos em paralelo:

- **AnalyticsService** → salva no `localStorage` com productId, nome, ação e timestamp
- **ClarityService** → envia para o Clarity via `window.clarity()` se o script estiver ativo, ou salva no `localStorage` como fallback

O dashboard admin lê diretamente o `localStorage` para montar o ranking e a tabela de eventos.

---

## Onde alterar as coisas

| O quê | Onde |
|---|---|
| Produtos | `src/app/core/services/product.service.ts` |
| Credenciais do admin | `src/app/core/services/auth.service.ts` |
| Script do Clarity | `src/index.html` |
| Cores e variáveis CSS | `src/styles.css` |
