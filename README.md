# GCGDEV

Site institucional estático da GCGDEV, publicado via GitHub Pages, com páginas em PT-BR e EN, demos interativas front-end e integrações básicas de tracking.

Repositório:
`https://github.com/gcgdev/portfoliooficial`

Domínio:
`https://gcgdev.com.br`

## Stack

- HTML estático
- CSS vanilla
- JavaScript vanilla
- GitHub Pages para hospedagem

Sem bundler, sem framework e sem pipeline de build.

## Objetivo do projeto

O projeto serve como vitrine comercial da GCGDEV, com foco em:

- apresentação institucional
- geração de contato via WhatsApp
- demonstração de fluxos e interfaces
- versão bilíngue PT-BR / EN

## Estrutura

```text
/
  index.html
  en/
    index.html
    pages/
  pages/
  demos/
    demo-01-bot/
      index.html
      index-en.html
    demo-02-booking/
      index.html
      index-en.html
    demo-03-landing/
      index.html
      index-en.html
    demo-04-leads/
      index.html
      index-en.html
  assets/
    css/
      main.css
    js/
      main.js
    img/
  shared/
    demo-shell.css
    demo-shell.js
  legal/
    privacy.html
  robots.txt
  sitemap.xml
  CNAME
```

## Arquitetura

### Páginas principais

- `index.html`: home em PT-BR
- `en/index.html`: home em EN
- `pages/`: páginas institucionais em PT-BR
- `en/pages/`: páginas institucionais em EN

### Demos

Cada demo possui versão própria por idioma:

- PT: `index.html`
- EN: `index-en.html`

Essa abordagem evita lógica condicional por query string, reduz risco de mistura de microcopy e simplifica manutenção por idioma.

### Camada visual

- `assets/css/main.css`: estilos globais, tokens, grid, componentes e responsividade
- `shared/demo-shell.css`: shell visual compartilhado pelas demos
- `assets/img/`: SVGs leves para mockups e elementos decorativos

### Comportamento

- `assets/js/main.js`: smooth scroll, reveal on scroll, links de WhatsApp, utilitários da interface e modal de demos
- `shared/demo-shell.js`: comportamento compartilhado das demos

## Branding

O branding ativo do projeto é:

- nome: `GCGDEV`
- domínio principal: `gcgdev.com.br`

O README assume que títulos, meta tags, header/footer e demos já foram alinhados com essa identidade.

## SEO e domínio

O projeto já está preparado para domínio próprio:

- `CNAME` configurado com `gcgdev.com.br`
- `robots.txt` com referência ao sitemap
- `sitemap.xml` publicado na raiz
- `canonical` e `og:url` definidos nas páginas

## Tracking

Atualmente o projeto inclui:

- Google Analytics / Google Tag: `G-TWGDBN2L37`
- Meta Pixel: `1304637464933404`

Os snippets foram inseridos diretamente nas páginas HTML.

## Execução local

Como o projeto é estático, qualquer servidor simples funciona.

Exemplos:

```bash
# Python
python -m http.server 8080
```

```bash
# Node
npx serve .
```

Depois, acesse:

- `http://localhost:8080/`

Abrir os arquivos HTML diretamente no navegador funciona em muitos casos, mas um servidor local é preferível para validar navegação e comportamento com mais fidelidade.

## Publicação no GitHub Pages

### Fluxo esperado

1. Subir o conteúdo para `gcgdev/portfoliooficial`
2. Abrir `Settings > Pages`
3. Selecionar `Deploy from a branch`
4. Publicar a branch principal na pasta `/ (root)`
5. Confirmar o domínio customizado `gcgdev.com.br`

### Push inicial

```bash
git init
git branch -M main
git remote add origin https://github.com/gcgdev/portfoliooficial.git
git add .
git commit -m "Initial site export"
git push -u origin main
```

## Convenções do projeto

- caminhos relativos sempre que possível
- demos separadas por idioma
- assets leves, preferencialmente SVG
- sem dependência de build
- sem bibliotecas externas de UI

## Pontos de manutenção

### Alterações visuais globais

Editar:

- `assets/css/main.css`

### Alterações de comportamento global

Editar:

- `assets/js/main.js`

### Alterações nas demos

Editar:

- `demos/demo-*/index.html`
- `demos/demo-*/index-en.html`

### Atualização de tracking

Revisar:

- snippets no `<head>`
- blocos `noscript` no `<body>`
- eventos de conversão adicionais, se necessários

## Checklist de publicação

- branding correto como `GCGDEV`
- domínio `gcgdev.com.br` configurado
- `CNAME` presente
- `robots.txt` e `sitemap.xml` consistentes
- links de WhatsApp apontando para `5512997321701`
- versões PT e EN navegáveis
- demos PT e EN abrindo corretamente
- GA4 e Meta Pixel carregando

## Próximos incrementos recomendados

1. Adicionar eventos de conversão para clique em WhatsApp
2. Revisar copy restante das demos PT para acentuação completa
3. Adicionar validação sistemática de links e metadados antes de cada publicação
