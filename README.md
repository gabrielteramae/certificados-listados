# Certificados — ledger de cursos

![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?style=flat&logo=vuedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

Lista estática de certificados no navegador: total, instituições, categorias, horas e filtro por categoria. Os dados estão no array `CERTIFICATES` de `web.js`. Vue 3 entra por CDN, sem build. O canonical do HTML é [gabrielteramae.github.io/certificados-listados](https://gabrielteramae.github.io/certificados-listados/).

| Escolha | Motivo |
| --- | --- |
| Vue e Chart.js por CDN | Não há `package.json` nem passo de build |

`index.html` carrega Chart.js e `web.js` chama `new Chart` em `catCanvas` e `instCanvas`, mas o HTML não declara esses canvas. A tela que renderiza é o ledger e os contadores.

## Stack

- HTML, CSS e JavaScript
- Vue 3.4.31 (`vue.global.prod.min.js`)
- Chart.js por CDN (código presente, canvas ausente no HTML)

## Estrutura

```
index.html
style.css
web.js
```

## Como rodar

```bash
git clone https://github.com/gabrielteramae/certificados-listados.git
cd certificados-listados
```

Abra `index.html` no navegador.

---

© 2026 Gabriel Teramae Chan
