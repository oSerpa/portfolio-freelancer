# serpa.dev

Site para captar clientes de sites, apps e landing pages. Feito com Next.js, TypeScript e Tailwind CSS, hospedado na Vercel.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Onde editar

Contato, textos principais e menu ficam em `src/data/site.ts`. Cores e fontes ficam em `src/app/globals.css`.

## Formulário de orçamento

O formulário envia para o seu e-mail pela API do Resend (`src/app/api/orcamento/route.ts`) e depois oferece mandar o mesmo resumo pelo WhatsApp. Configure `RESEND_API_KEY` nas variáveis de ambiente da Vercel (veja `.env.example`). Sem a chave, o formulário mostra o botão de WhatsApp como alternativa.
