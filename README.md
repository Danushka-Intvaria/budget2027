# Sri Lanka Budget 2027 — 3D Dashboard

An interactive, plain-language dashboard of Sri Lanka's Budget 2027 in **English, සිංහල and தமிழ்**, with light and dark themes and a three.js 3D view.

## Run it

No build step and no dependencies — it's static HTML/CSS/JS. Needs Node 18+ for the bundled server:

```bash
npm start              # http://localhost:8080
node server.js 3000    # any other port
```

Opening `index.html` directly from disk also works.

An internet connection is needed for three.js (jsDelivr CDN) and the Google Fonts (Inter, Noto Sans Sinhala, Noto Sans Tamil).

Shareable links: `index.html?lang=si&theme=dark` (lang = `en` | `si` | `ta`, theme = `light` | `dark`).

## Sections

| Section | What it shows |
|---|---|
| KPI tiles | Total, capital and recurrent spending, social protection, borrowing limit, deficit, primary surplus, debt target |
| Budget in 3D | Towers for ministries, mega projects or people programmes — drag, zoom, tap a tower or legend row |
| Where the increase goes | Recurrent vs capital, 2026 → 2027 |
| Ministry allocations | Eight largest heads, 2026 vs 2027 with growth (and a table view) |
| What changes for people | Allowance and benefit increases, old → new |
| Income tax calculator | Monthly tax under current rules vs the reported 2027 proposal |
| Explore the proposals | 46 speech proposals, filterable by sector and searchable in all three languages |
| Debt | Foreign debt service 2025–2028, interest as share of revenue, other key facts |

## Files

```
index.html        page shell
css/styles.css    theme tokens (light/dark), layout, charts
js/data.js        official Budget Estimates figures (Rs. million)
js/data-speech.js tax/levy changes and late-speech items (from completed live coverage)
server.js         zero-dependency static server (npm start)
js/i18n.js        UI strings in en / si / ta
js/scene3d.js     three.js tower scene
js/app.js         rendering, language/theme switching, tooltips, calculator
```

To add a figure, put it in `js/data.js` with `en`/`si`/`ta` names. To add UI text, add the same key to all three languages in `js/i18n.js`.

## Data sources

- **Official — Budget Estimates 2027** (Ministry of Finance, Planning and Economic Development; www.treasury.gov.lk). These are the source for:
  - totals, revenue by source, spending by economic category, every ministry, the provincial councils, and interest and debt repayments;
  - 2025 provisional actuals, 2026 revised estimates, 2027 estimates and 2028–29 projections.

  Finance Ministry figures in `ministries` exclude interest (Rs 2,643,472 mn) and debt repayments (Rs 2,206,531 mn), which are shown separately. All heads, interest and repayments sum to the Rs 9,920,003 mn total.
- **Budget Speech, 12 Nov 2026** (live coverage by Ada Derana, Newswire, Newsfirst). These are the source for proposals, allowance increases, tax changes, social protection (Rs 230 bn), the debt-to-GDP target and US$ debt service. The estimates will be amended to include these proposals.

The tax calculator is an estimate based on reported bands.
