# certificados

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chart.js&logoColor=white)

Dashboard estático que contabiliza e organiza meus certificados por categoria, instituição e data.

## Stack

- Vue 3 (Composition API, via CDN — sem build step)
- Chart.js para os gráficos (categorias e instituições)
- Filtro reativo por categoria direto no ledger
- Abre direto ou publica via GitHub Pages

## Adicionar um certificado

Edite o array `CERTIFICATES` em `index.html`:

```js
{
  title: "Nome do certificado",
  institution: "Instituição",
  category: "Categoria",
  date: "2026"
}
```

O painel (contadores, gráficos, ledger) é gerado automaticamente a partir desse array.

## Deploy

```
Settings > Pages > Deploy from branch > main
```

---

© 2026 Gabriel Teramae Chan
# certificados-listados
