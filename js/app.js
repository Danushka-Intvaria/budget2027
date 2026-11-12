/* Budget 2027 dashboard — app controller */
(function () {
  const D = window.BUDGET;
  const T = window.I18N;
  const $ = (s, el = document) => el.querySelector(s);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  const qs = new URLSearchParams(location.search);
  const LANGS = ["en", "si", "ta"];
  const state = {
    lang: LANGS.includes(qs.get("lang")) ? qs.get("lang") : LANGS.includes(store.get("b27-lang")) ? store.get("b27-lang") : "en",
    mode: "categories",
    selected: null,
    cat: "all",
    query: ""
  };
  const t = (k) => (T[state.lang] && T[state.lang][k]) || T.en[k] || k;
  const L = (obj) => (obj && (obj[state.lang] || obj.en)) || "";
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  /* ---------- Number formatting ---------- */
  const nf = (n, d = 0) => new Intl.NumberFormat("en-LK", { maximumFractionDigits: d, minimumFractionDigits: 0 }).format(n);
  function money(num, unitKey) {
    const unit = unitKey ? t(unitKey) : "";
    if (state.lang === "si") return `${t("rs")} ${unit ? unit + " " : ""}${num}`;
    return `${t("rs")} ${num}${unit ? " " + unit : ""}`;
  }
  // Rs. million -> friendly string
  function fmtMn(mn) {
    if (mn >= 1e6) return money(nf(mn / 1e6, 2), "tn");
    if (mn >= 1000) { const b = mn / 1000; return money(nf(b, b >= 100 ? 1 : 2), "bn"); }
    return money(nf(mn, 0), "mn");
  }
  const fmtRs = (rs) => money(nf(Math.round(rs)));
  const pct = (a, b) => ((b - a) / a) * 100;
  const fmtPct = (p, d = 1) => `${p > 0 ? "+" : ""}${nf(p, d)}%`;

  /* ---------- Theme ---------- */
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = () => {
    const th = document.documentElement.getAttribute("data-theme");
    return th ? th === "dark" : mql.matches;
  };
  function applyTheme() {
    document.documentElement.setAttribute("data-dark", isDark() ? "1" : "0");
    if (has3D) {
      Budget3D.setTheme({ floor: cssVar("--floor3d"), grid: cssVar("--grid3d"), particle: cssVar("--particle3d") });
      const map = {};
      stageItems().forEach((d) => (map[d.id] = d.color));
      Budget3D.updateColors(map);
    }
    renderLegend();
    renderDetail();
  }
  $("#themeBtn").addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    store.set("b27-theme", next);
    applyTheme();
  });
  mql.addEventListener && mql.addEventListener("change", () => { if (!document.documentElement.getAttribute("data-theme")) applyTheme(); });

  /* ---------- Tooltip ---------- */
  const tip = $("#tip");
  function showTip(html, x, y) {
    tip.innerHTML = html;
    tip.hidden = false;
    const r = tip.getBoundingClientRect();
    let left = x + 14, top = y + 14;
    if (left + r.width > window.innerWidth - 8) left = x - r.width - 14;
    if (top + r.height > window.innerHeight - 8) top = y - r.height - 14;
    tip.style.left = Math.max(8, left) + "px";
    tip.style.top = Math.max(8, top) + "px";
  }
  const hideTip = () => { tip.hidden = true; };
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest && e.target.closest("[data-tip]");
    if (el) showTip(el.getAttribute("data-tip"), e.clientX, e.clientY);
    else if (!tip.dataset.stage) hideTip();
  });
  document.addEventListener("focusin", (e) => {
    const el = e.target.closest && e.target.closest("[data-tip]");
    if (el) { const r = el.getBoundingClientRect(); showTip(el.getAttribute("data-tip"), r.left + r.width / 2, r.bottom); }
  });
  document.addEventListener("focusout", hideTip);
  window.addEventListener("scroll", () => { if (!tip.dataset.stage) hideTip(); }, { passive: true });

  /* ---------- Static i18n ---------- */
  function applyStatic() {
    document.documentElement.lang = state.lang;
    document.title = t("title");
    document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    document.querySelectorAll("#langSwitch button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === state.lang)));
  }
  document.querySelectorAll("#langSwitch button").forEach((b) =>
    b.addEventListener("click", () => {
      state.lang = b.dataset.lang;
      store.set("b27-lang", state.lang);
      renderAll();
    })
  );

  /* ---------- Icons ---------- */
  const ICON = {
    wallet: '<path d="M3 7h15a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7z"/><path d="M3 7l12-4v4"/><circle cx="16.5" cy="13.5" r="1.2"/>',
    crane: '<path d="M4 21V4h3v17M2 21h10M7 6h14l-3 4M18 10v5"/><rect x="16" y="15" width="4" height="3"/>',
    cycle: '<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    bank: '<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.8"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    down: '<path d="M3 6l7 7 4-4 7 7M21 10v6h-6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
    star: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
    leaf: '<path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15zM5 19l8-8"/>',
    flame: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-7 2 1 3 2 3-3z"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
    rocket: '<path d="M5 15c-1 2-1 4-1 5 1 0 3 0 5-1M9 15l-3-3c2-6 7-9 14-9 0 7-3 12-9 14z"/><circle cx="15" cy="9" r="1.5"/>'
  };
  const svg = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[name]}</svg>`;

  /* ---------- KPIs ---------- */
  const minTotal = (m, i) => m.rec[i] + m.cap[i];
  function renderKPIs() {
    const T0 = D.totals;
    const chg = (o) => {
      const p = pct(o.y2026, o.y2027);
      return `<span class="${p >= 0 ? "up" : "down"}">${p >= 0 ? "▲" : "▼"} ${fmtPct(p)}</span> ${esc(t("k_vsrev"))}`;
    };
    const gap = D.trend.find((x) => x.current);
    const items = [
      { k: "k_total", c: "--s1", i: "wallet", v: fmtMn(T0.total.y2027), s: `${esc(fmtMn(T0.appropriated))} ${esc(t("k_appr"))}` },
      { k: "k_revenue", c: "--s3", i: "bank", v: fmtMn(T0.revenue.y2027), s: chg(T0.revenue) },
      { k: "k_capital", c: "--s2", i: "crane", v: fmtMn(T0.capital.y2027), s: chg(T0.capital) },
      { k: "k_interest", c: "--s7", i: "cycle", v: fmtMn(T0.interest.y2027), s: `${nf((T0.interest.y2027 / T0.total.y2027) * 100, 1)}% ${esc(t("k_ofspend"))}` },
      { k: "k_amort", c: "--s4", i: "down", v: fmtMn(T0.amortization.y2027), s: chg(T0.amortization) },
      { k: "k_gap", c: "--s8", i: "target", v: fmtMn(gap.spend - gap.revenue), s: esc(t("k_gap_sub")) },
      { k: "k_social", c: "--s6", i: "heart", v: fmtMn(230000), s: esc(t("k_aswesuma")) },
      { k: "k_debt", c: "--s5", i: "star", v: "87%", s: esc(t("k_belowimf")) }
    ];
    $("#kpis").innerHTML = items.map((x) => `
      <div class="kpi" style="--kpi-c: var(${x.c})">
        <div class="kpi-label"><span class="kpi-icon">${svg(x.i)}</span><span>${esc(t(x.k))}</span></div>
        <div class="kpi-value" title="${esc(x.v)}">${esc(x.v)}</div>
        <div class="kpi-sub">${x.s}</div>
      </div>`).join("");
  }

  /* ---------- 3D stage ---------- */
  const SLOT = ["--s1", "--s2", "--s3", "--s4", "--s5", "--s6", "--s7", "--s8"];
  function stageItems() {
    let src;
    if (state.mode === "categories") {
      src = D.categories.map((c) => ({ id: c.id, value: c.value, name: L(c.name), short: L(c.name), other: c.other }));
    } else if (state.mode === "ministries") {
      const sorted = D.ministries.slice().sort((a, b) => minTotal(b, 2) - minTotal(a, 2));
      const top = sorted.slice(0, 8), rest = sorted.slice(8);
      src = top.map((m) => ({ id: m.id, value: minTotal(m, 2), prior: minTotal(m, 1), name: L(m.name), short: L(m.short || m.name) }));
      src.push({ id: "others", other: true, value: rest.reduce((s, m) => s + minTotal(m, 2), 0), prior: rest.reduce((s, m) => s + minTotal(m, 1), 0),
        name: t("others_heads").replace("{n}", rest.length), short: t("others_short") });
    } else if (state.mode === "projects") src = D.megaProjects.map((m) => ({ id: m.id, value: m.amount, name: L(m.name), short: L(m.short) }));
    else src = D.people.map((m) => ({ id: m.id, value: m.amount, name: L(m.name), short: L(m.short) }));
    return src.map((d, i) => ({ ...d, colorVar: d.other ? "--s-other" : SLOT[i % 8], color: cssVar(d.other ? "--s-other" : SLOT[i % 8]) }));
  }

  let has3D = false;
  function initStage() {
    has3D = window.Budget3D && Budget3D.init($("#stage"), $("#stageLabels"), {
      onHover(id, x, y) {
        if (!id) { delete tip.dataset.stage; hideTip(); return; }
        const d = stageItems().find((s) => s.id === id);
        tip.dataset.stage = "1";
        showTip(`<b>${esc(d.name)}</b><br>${esc(fmtMn(d.value))}`, x, y);
      },
      onSelect(id) { state.selected = id; renderLegend(); renderDetail(); }
    });
    if (!has3D) { $("#stageFallback").hidden = false; $(".stage-foot").hidden = true; }
    $("#resetView").addEventListener("click", () => { Budget3D.resetView(); setSelected(null); });
    document.querySelectorAll("#modeSwitch button").forEach((b) =>
      b.addEventListener("click", () => {
        state.mode = b.dataset.mode;
        state.selected = null;
        renderStage();
      })
    );
    document.addEventListener("pointermove", (e) => {
      if (tip.dataset.stage && !e.target.closest("#stage")) { delete tip.dataset.stage; hideTip(); }
    });
  }
  function setSelected(id) {
    state.selected = id;
    if (has3D) Budget3D.highlight(id);
    renderLegend(); renderDetail();
  }
  function renderStage() {
    document.querySelectorAll("#modeSwitch button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.mode === state.mode)));
    $("#stageDesc").textContent = t("s3d_desc_" + state.mode);
    const items = stageItems();
    if (has3D) Budget3D.setData(items.map((d) => ({ id: d.id, value: d.value, color: d.color, label: d.short, valueText: fmtMn(d.value) })));
    if (has3D && state.selected) Budget3D.highlight(state.selected);
    renderLegend(); renderDetail();
  }
  function renderLegend() {
    const items = stageItems();
    $("#legend").innerHTML = items.map((d) => `
      <li><button type="button" data-id="${d.id}" aria-pressed="${state.selected === d.id}">
        <span class="swatch" style="background:var(${d.colorVar})"></span>
        <span class="lg-name" title="${esc(d.name)}">${esc(d.name)}</span>
        <span class="lg-val">${esc(fmtMn(d.value))}</span>
      </button></li>`).join("");
    $("#legend").querySelectorAll("button").forEach((b) =>
      b.addEventListener("click", () => setSelected(state.selected === b.dataset.id ? null : b.dataset.id))
    );
  }
  function renderDetail() {
    const items = stageItems();
    const total = D.totals.total.y2027;
    const d = items.find((x) => x.id === state.selected);
    const chip = (a, b) => { const p = pct(a, b); return `<span class="${p >= 0 ? "chip-up" : "chip-down"}">${p >= 0 ? "▲" : "▼"} ${fmtPct(p)}</span>`; };
    if (!d) {
      const sum = items.reduce((a, b) => a + b.value, 0);
      let head, sub;
      if (state.mode === "categories") { head = t("k_total"); sub = `${chip(D.totals.total.y2026, total)} ${esc(t("k_vsrev"))}`; }
      else if (state.mode === "ministries") { head = t("spend_ex_debt"); sub = `${nf((sum / total) * 100, 1)}% ${esc(t("k_ofspend"))}`; }
      else { head = t("mode_" + state.mode); sub = `${nf((sum / total) * 100, 1)}% ${esc(t("k_ofspend"))}`; }
      $("#detail").innerHTML = `
        <div class="d-name">${esc(head)}</div>
        <div class="d-val">${esc(fmtMn(sum))}</div>
        <div class="d-sub">${sub}</div>`;
      return;
    }
    const share = (d.value / total) * 100;
    const growth = d.prior ? `<div class="d-sub">${chip(d.prior, d.value)} ${esc(t("k_vsrev"))} (${esc(fmtMn(d.prior))})</div>` : "";
    $("#detail").innerHTML = `
      <div class="d-name"><span class="swatch" style="background:var(${d.colorVar})"></span><span>${esc(d.name)}</span></div>
      <div class="d-val">${esc(fmtMn(d.value))}</div>
      <div class="d-sub">${nf(share, 1)}% ${esc(t("k_ofspend"))}</div>
      ${growth}`;
  }

  /* ---------- Shared: grouped vertical bars ---------- */
  // groups: [{ label, strong, sub, bars: [{ v, color, tip, faded }] }]
  function vchart(el, groups) {
    const max = Math.max(...groups.flatMap((g) => g.bars.map((b) => b.v)));
    el.classList.add("has-labels", "has-sub");
    el.innerHTML = groups.map((g, gi) => `
      <div class="vgroup">
        <div class="vbars">${g.bars.map((b, bi) => `
          <div class="vbar${b.faded ? " faded" : ""}" tabindex="0" style="height:${(b.v / max) * 100}%;background:var(${b.color});animation-delay:${gi * 0.06 + bi * 0.03}s" data-tip="${b.tip}"></div>`).join("")}
        </div>
        <div class="vlabel${g.strong ? " strong" : ""}">${esc(g.label)}</div>
        <div class="vsub">${g.sub || ""}</div>
      </div>`).join("");
  }
  const legend = (el, items) => { el.innerHTML = items.map(([c, label]) => c ? `<span><i style="background:var(${c})"></i>${esc(label)}</span>` : `<span class="lg-text">${esc(label)}</span>`).join(""); };

  /* ---------- Every Rs 100 (waffle) ---------- */
  function renderWaffle() {
    const cats = D.categories, total = cats.reduce((s, c) => s + c.value, 0);
    // Largest-remainder rounding so the squares add up to exactly 100
    const raw = cats.map((c) => (c.value / total) * 100);
    const cells = raw.map(Math.floor);
    raw.map((r, i) => [r - Math.floor(r), i]).sort((a, b) => b[0] - a[0])
      .slice(0, 100 - cells.reduce((a, b) => a + b, 0)).forEach(([, i]) => cells[i]++);
    const colorOf = (i) => (cats[i].other ? "--s-other" : SLOT[i]);
    let html = "";
    cells.forEach((n, i) => {
      const tip = `<b>${esc(L(cats[i].name))}</b><br>${esc(t("rs"))} ${nf(raw[i], 1)} ${esc(t("r100_of100"))}<br>${esc(fmtMn(cats[i].value))}`;
      for (let k = 0; k < n; k++) html += `<span class="cell" data-cat="${cats[i].id}" style="background:var(${colorOf(i)})" data-tip="${tip}"></span>`;
    });
    $("#waffle").innerHTML = html;
    $("#waffle").setAttribute("aria-label", t("r100_title"));
    $("#waffleLegend").innerHTML = cats.map((c, i) => `
      <li data-cat="${c.id}"><span class="swatch" style="background:var(${colorOf(i)})"></span>
        <span class="wl-name">${esc(L(c.name))}</span>
        <span class="wl-val">${esc(t("rs"))} ${nf(raw[i], 1)}</span></li>`).join("");
    document.querySelectorAll("#waffle .cell, #waffleLegend li").forEach((el) => {
      el.addEventListener("pointerenter", () => { $("#waffle").classList.add("focus"); document.querySelectorAll("#waffle .cell, #waffleLegend li").forEach((x) => x.classList.toggle("on", x.dataset.cat === el.dataset.cat)); });
      el.addEventListener("pointerleave", () => $("#waffle").classList.remove("focus"));
    });
  }

  /* ---------- Revenue sources ---------- */
  function renderRevenue() {
    const list = D.revenue, max = list[0].value, total = D.totals.revenue.y2027;
    $("#revChart").innerHTML = list.map((r, i) => `
      <div class="hrow" tabindex="0" data-tip="<b>${esc(L(r.name))}</b><br>${esc(fmtMn(r.value))}<br>${nf((r.value / total) * 100, 1)}%">
        <div class="hname">${esc(L(r.name))}</div>
        <div class="hmeta"><b>${esc(fmtMn(r.value))}</b><span class="chip-na">${r.value / total < 0.01 ? "&lt;1" : nf((r.value / total) * 100, 0)}%</span></div>
        <div class="htrack"><div class="hbar" style="width:${Math.max(0.6, (r.value / max) * 100)}%;background:var(--s3);animation-delay:${i * 0.05}s"></div></div>
      </div>`).join("");
  }

  /* ---------- Revenue vs spending trend ---------- */
  function renderTrend() {
    legend($("#trendLegend"), [["--s3", t("revenue_s")], ["--s2", t("spend_s")], [null, t("gap_tn")]]);
    vchart($("#trendChart"), D.trend.map((y) => {
      const yl = y.year + (y.proj ? "*" : "");
      const gap = y.spend - y.revenue;
      return {
        label: yl, strong: y.current,
        sub: `<b>${nf(gap / 1e6, 2)}</b>`,
        bars: [
          { v: y.revenue, color: "--s3", faded: y.proj, tip: `<b>${yl} · ${esc(t("revenue_s"))}</b><br>${esc(fmtMn(y.revenue))}` },
          { v: y.spend, color: "--s2", faded: y.proj, tip: `<b>${yl} · ${esc(t("spend_s"))}</b><br>${esc(fmtMn(y.spend))}<br>${esc(t("gap"))}: ${esc(fmtMn(gap))}` }
        ]
      };
    }));
  }

  /* ---------- Ministries ---------- */
  let minExpanded = false;
  function renderMinistries() {
    const all = D.ministries.slice().sort((a, b) => minTotal(b, 2) - minTotal(a, 2));
    const list = minExpanded ? all : all.slice(0, 10);
    const max = Math.max(...all.map((m) => Math.max(minTotal(m, 2), minTotal(m, 1))));
    legend($("#minLegend"), [["--s1", "2027"], ["--prior", "2026"]]);
    $("#minLegend i").style.background = "linear-gradient(90deg,var(--s1),var(--s2),var(--s3),var(--s4))";
    $("#minChart").innerHTML = list.map((m, i) => {
      const v = minTotal(m, 2), p = minTotal(m, 1), g = pct(p, v);
      const color = i < 8 ? SLOT[i] : "--ink-3";
      const tipHtml = `<b>${esc(L(m.name))}</b><br>2027: ${esc(fmtMn(v))}<br>· ${esc(t("recurrent"))} ${esc(fmtMn(m.rec[2]))}<br>· ${esc(t("capital"))} ${esc(fmtMn(m.cap[2]))}<br>2026: ${esc(fmtMn(p))} (${fmtPct(g)})`;
      return `
      <div class="hrow" tabindex="0" data-tip="${tipHtml}">
        <div class="hname">${esc(L(m.name))}</div>
        <div class="hmeta"><b>${esc(fmtMn(v))}</b><span class="${g >= 0 ? "chip-up" : "chip-down"}">${g >= 0 ? "▲" : "▼"} ${fmtPct(g)}</span></div>
        <div class="htrack">
          <div class="hbar" style="width:${Math.max(0.4, (v / max) * 100)}%;background:var(${color});animation-delay:${Math.min(i, 12) * 0.04}s"></div>
          <div class="hbar prior" style="width:${Math.max(0.4, (p / max) * 100)}%;animation-delay:${Math.min(i, 12) * 0.04}s"></div>
        </div>
      </div>`;
    }).join("");
    const btn = $("#minMore");
    btn.textContent = minExpanded ? t("show_less") : `${t("show_all")} (${all.length})`;
    btn.onclick = () => { minExpanded = !minExpanded; renderMinistries(); };

    const T0 = D.totals;
    const row = (name, r, c, r1, c1) => `<tr><td>${name}</td><td class="num">${esc(fmtMn(r))}</td><td class="num">${esc(fmtMn(c))}</td><td class="num"><b>${esc(fmtMn(r + c))}</b></td><td class="num">${esc(fmtMn(r1 + c1))}</td><td class="num">${fmtPct(pct(r1 + c1, r + c))}</td></tr>`;
    $("#minTable").innerHTML = `<div class="tbl-wrap"><table>
      <thead><tr><th>${esc(t("ministry"))}</th><th class="num">${esc(t("recurrent"))}</th><th class="num">${esc(t("capital"))}</th><th class="num">2027</th><th class="num">2026</th><th class="num">%</th></tr></thead>
      <tbody>${all.map((m) => row(esc(L(m.name)), m.rec[2], m.cap[2], m.rec[1], m.cap[1])).join("")}
      ${row(esc(t("k_interest")), T0.interest.y2027, 0, T0.interest.y2026, 0)}
      ${row(esc(t("k_amort")), 0, T0.amortization.y2027, 0, T0.amortization.y2026)}
      <tr><td><b>${esc(t("total"))}</b></td><td class="num">${esc(fmtMn(T0.recurrent.y2027))}</td><td class="num">${esc(fmtMn(T0.capital.y2027 + T0.amortization.y2027))}</td><td class="num"><b>${esc(fmtMn(T0.total.y2027))}</b></td><td class="num">${esc(fmtMn(T0.total.y2026))}</td><td class="num">${fmtPct(pct(T0.total.y2026, T0.total.y2027))}</td></tr>
      </tbody></table></div>`;
  }

  /* ---------- Provinces ---------- */
  function renderProvinces() {
    legend($("#provLegend"), [["--s7", t("recurrent")], ["--s3", t("capital")]]);
    const max = Math.max(...D.provinces.map((p) => p.rec + p.cap));
    $("#provChart").innerHTML = D.provinces.map((p, i) => {
      const tot = p.rec + p.cap;
      return `
      <div class="prov" tabindex="0" data-tip="<b>${esc(L(p.name))}</b><br>${esc(t("recurrent"))}: ${esc(fmtMn(p.rec))}<br>${esc(t("capital"))}: ${esc(fmtMn(p.cap))}">
        <div class="prov-head"><span class="prov-name">${esc(L(p.name))}</span><b>${esc(fmtMn(tot))}</b></div>
        <div class="stack" style="width:${(tot / max) * 100}%;animation-delay:${i * 0.04}s">
          <span style="flex:${p.rec};background:var(--s7)"></span><span style="flex:${p.cap};background:var(--s3)"></span>
        </div>
      </div>`;
    }).join("");
  }

  /* ---------- Allowances ---------- */
  function renderAllowances() {
    const unit = { month: "per_month", year: "per_year", hour: "per_hour", day: "per_day", once: "one_time" };
    $("#allowances").innerHTML = D.allowances.map((a, i) => {
      const p = pct(a.from, a.to);
      return `
      <div class="allow">
        <div class="allow-name">${esc(L(a.n))}</div>
        <div class="allow-nums">
          <span class="allow-from">${esc(fmtRs(a.from))}</span><span class="allow-arrow">→</span>
          <span class="allow-to">${esc(fmtRs(a.to))}</span><span class="allow-unit">${esc(t(unit[a.unit]))}</span>
        </div>
        <div class="allow-bar" aria-hidden="true"><span style="width:100%;animation-delay:${i * 0.04}s"></span><span class="base" style="width:${(a.from / a.to) * 100}%"></span></div>
        <div class="allow-pct">▲ ${fmtPct(p, 0)} ${esc(t("increase"))}</div>
      </div>`;
    }).join("");
  }

  /* ---------- Tax calculator ---------- */
  function calcTax(income, rules) {
    let rem = Math.max(0, income - rules.relief), tax = 0;
    for (const [w, r] of rules.bands) {
      const x = Math.min(rem, w);
      tax += x * r; rem -= x;
      if (rem <= 0) break;
    }
    return tax;
  }
  function renderTax() {
    const inc = Math.max(0, Number($("#taxInput").value) || 0);
    const a = calcTax(inc, D.tax.current), b = calcTax(inc, D.tax.proposed);
    const max = Math.max(a, b, 1);
    const diff = a - b;
    const row = (label, v, color) => `
      <div class="tax-row">
        <div class="tax-row-head"><span>${esc(label)}</span><b>${esc(fmtRs(v))}</b></div>
        <div class="tax-bar" style="width:${(v / max) * 100}%;background:${color}"></div>
        <div class="tax-eff">${esc(t("tax_effective"))}: ${inc ? nf((v / inc) * 100, 1) : 0}% · ${esc(fmtRs(v * 12))} ${esc(t("tax_per_year"))}</div>
      </div>`;
    let save;
    if (a === 0 && b === 0) {
      save = `<div class="tax-save">${svg("heart").replace("<svg", '<svg style="stroke:var(--s3);fill:none;stroke-width:2"')}<div><div class="big">${esc(fmtRs(0))}</div><div class="lbl">${esc(t("tax_none"))}</div></div></div>`;
    } else {
      const more = diff < 0;
      save = `<div class="tax-save${more ? " more" : ""}">
        <svg viewBox="0 0 24 24" aria-hidden="true" style="stroke:var(${more ? "--s8" : "--s3"});fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><circle cx="12" cy="12" r="9"/><path d="${more ? "M12 7v10M8 13l4 4 4-4" : "M12 17V7M8 11l4-4 4 4"}"/></svg>
        <div><div class="lbl">${esc(t(more ? "tax_more" : "tax_saving"))}</div>
        <div class="big">${esc(fmtRs(Math.abs(diff)))} <span class="lbl">${esc(t("tax_per_month"))}</span></div>
        <div class="lbl">${esc(fmtRs(Math.abs(diff) * 12))} ${esc(t("tax_per_year"))}</div></div>
      </div>`;
    }
    $("#taxOut").innerHTML = save + row(t("tax_current"), a, "var(--prior)") + row(t("tax_proposed"), b, "var(--s1)");
  }
  function initTax() {
    const inp = $("#taxInput"), rng = $("#taxRange");
    inp.addEventListener("input", () => { rng.value = Math.min(1000000, Number(inp.value) || 0); renderTax(); });
    rng.addEventListener("input", () => { inp.value = rng.value; renderTax(); });
  }

  /* ---------- Proposal explorer ---------- */
  const CATS = [
    ["infra", "--s1"], ["energy", "--s4"], ["education", "--s7"], ["health", "--s8"], ["social", "--s5"],
    ["agri", "--s6"], ["security", "--s2"], ["digital", "--s3"], ["tourism", "--s-other"]
  ];
  const catColor = Object.fromEntries(CATS);
  function renderChips() {
    const chip = (id, label, color) => `<button type="button" class="chip" data-cat="${id}" aria-pressed="${state.cat === id}">${color ? `<i style="background:var(${color})"></i>` : ""}${esc(label)}</button>`;
    $("#expChips").innerHTML = chip("all", t("exp_all")) + CATS.map(([id, c]) => chip(id, t("cat_" + id), c)).join("");
    $("#expChips").querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { state.cat = b.dataset.cat; renderChips(); renderExplorer(); }));
  }
  function renderExplorer() {
    const q = state.query.trim().toLowerCase();
    const list = D.proposals
      .filter((p) => state.cat === "all" || p.cat === state.cat)
      .filter((p) => !q || [p.n.en, p.n.si, p.n.ta, t("cat_" + p.cat)].some((s) => s.toLowerCase().includes(q)))
      .sort((a, b) => b.amount - a.amount);
    const sum = list.reduce((s, p) => s + p.amount, 0);
    $("#expSummary").textContent = list.length ? `${list.length} ${t("exp_count")} · ${t("exp_sum")}: ${fmtMn(sum)}` : "";
    if (!list.length) { $("#expList").innerHTML = `<li class="exp-empty">${esc(t("exp_empty"))}</li>`; return; }
    const max = list[0].amount;
    $("#expList").innerHTML = list.map((p, i) => `
      <li class="exp-item" tabindex="0" data-tip="<b>${esc(L(p.n))}</b><br>${esc(t("cat_" + p.cat))}<br>${esc(fmtMn(p.amount))}">
        <span class="exp-name"><i style="background:var(${catColor[p.cat]})"></i><span>${esc(L(p.n))}</span></span>
        <span class="exp-amt">${esc(fmtMn(p.amount))}</span>
        <span class="exp-bar" style="width:${Math.max(1, (p.amount / max) * 100)}%;background:var(${catColor[p.cat]});animation-delay:${Math.min(i, 20) * 0.02}s"></span>
      </li>`).join("");
  }
  $("#expSearch").addEventListener("input", (e) => { state.query = e.target.value; renderExplorer(); });

  /* ---------- Debt ---------- */
  function renderDebt() {
    legend($("#debtLegend"), [["--s1", t("k_interest")], ["--s2", t("k_amort")], [null, t("total_tn")]]);
    vchart($("#debtChart"), D.debtRs.map((y) => {
      const yl = y.year + (y.proj ? "*" : "");
      return {
        label: yl, strong: y.current,
        sub: `<b>${nf((y.interest + y.amort) / 1e6, 2)}</b>`,
        bars: [
          { v: y.interest, color: "--s1", faded: y.proj, tip: `<b>${yl} · ${esc(t("k_interest"))}</b><br>${esc(fmtMn(y.interest))}` },
          { v: y.amort, color: "--s2", faded: y.proj, tip: `<b>${yl} · ${esc(t("k_amort"))}</b><br>${esc(fmtMn(y.amort))}` }
        ]
      };
    }));

    $("#interestChart").innerHTML = D.interestShare.map((d, i) => `
      <div class="coin-row" tabindex="0" data-tip="<b>${d.year}</b><br>${esc(t("rs"))} ${nf(d.value, 1)} / 100">
        <span class="coin-year">${d.year}</span>
        <span class="coin-track"><span class="coin-fill" style="width:${d.value}%;animation-delay:${i * 0.1}s"></span></span>
        <span class="coin-val">${nf(d.value, 1)}%</span>
      </div>`).join("");

    const facts = [
      ["f_growth", "rocket", "--s1"], ["f_usd", "globe", "--s2"], ["f_borrow", "bank", "--s7"], ["f_reserves", "globe", "--s3"],
      ["f_rating", "star", "--s4"], ["f_renew", "leaf", "--s6"], ["f_inflation", "flame", "--s8"], ["f_vacancies", "users", "--s5"]
    ];
    $("#facts").innerHTML = facts.map(([k, ic, c]) => `<li><span class="f-ic" style="--fc:var(${c})">${svg(ic)}</span><span>${esc(t(k))}</span></li>`).join("");
  }

  /* ---------- Tax & levy changes ---------- */
  function renderTaxChanges() {
    const ic = { down: "M12 5v14M6 13l6 6 6-6", up: "M12 19V5M6 11l6-6 6 6", same: "M5 12h14" };
    $("#taxChanges").innerHTML = (D.taxChanges || []).map((c) => `
      <li class="tc tc-${c.dir}">
        <span class="tc-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${ic[c.dir]}"/></svg></span>
        <span class="tc-text">${esc(L(c.n))}</span>
        <span class="tc-tag">${esc(t("tag_" + c.dir))}</span>
      </li>`).join("");
  }

  function renderSources() {
    $("#sources").innerHTML = D.meta.sources.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join("");
  }

  /* ---------- Boot ---------- */
  function renderAll() {
    applyStatic();
    renderKPIs();
    renderStage();
    renderWaffle();
    renderRevenue();
    renderTrend();
    renderProvinces();
    renderMinistries();
    renderAllowances();
    renderTaxChanges();
    renderTax();
    renderChips();
    renderExplorer();
    renderDebt();
    renderSources();
  }

  initStage();
  initTax();
  applyTheme();
  renderAll();
})();
