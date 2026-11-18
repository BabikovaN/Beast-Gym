import { CLUB, ZONES, AMENITIES, PLANS, PERSONAL, OFFERS, BAR, RULES, JOBS } from './data.js';

const app = document.getElementById('app');
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const uah = (n) => `${Number(n).toLocaleString('uk-UA')} грн`;
const digits = (s) => String(s).replace(/\D/g, '');
const tel = CLUB.phone.replace(/[^\d+]/g, '');

const NAV = [['club', 'Клуб'], ['prices', 'Тарифи'], ['bar', 'Фітнес-бар'], ['rules', 'Правила'], ['careers', 'Вакансії'], ['contacts', 'Контакти']];
const BURGER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7h18M3 12h18M3 17h18"/></svg>';

function header(route) {
  return `<header class="header ${route ? 'always' : ''}" id="hdr"><div class="container">
    <a class="brand" href="#/"><img src="assets/logo.svg" alt=""><b>${esc(CLUB.name)}</b></a>
    <nav class="nav" id="nav">${NAV.map(([k, l]) => `<a href="#/${k}" class="${route === k ? 'on' : ''}">${l}</a>`).join('')}</nav>
    <button class="btn btn-gold" data-trial>Пробне тренування</button>
    <button class="burger" id="burger" aria-label="Меню" aria-expanded="false">${BURGER}</button>
  </div></header>`;
}
function footer() {
  return `<footer class="footer"><div class="container"><div class="grid">
    <div><a class="brand" href="#/"><img src="assets/logo.svg" alt=""><b>${esc(CLUB.name)}</b></a><p style="max-width:320px;margin-top:18px">${esc(CLUB.tagline)}. Простір, де тренування — це задоволення, а результат — звичка.</p></div>
    <div><h4>Клуб</h4>${NAV.map(([k, l]) => `<a href="#/${k}">${l}</a>`).join('')}</div>
    <div><h4>Графік</h4>${CLUB.hours.map(([d, h]) => `<div>${d} · ${h}</div>`).join('')}</div>
    <div><h4>Контакти</h4><a href="tel:${tel}">${esc(CLUB.phone)}</a><a href="https://instagram.com/${esc(CLUB.instagram)}" target="_blank" rel="noopener">Instagram</a><a href="https://t.me/${esc(CLUB.telegram)}" target="_blank" rel="noopener">Telegram</a><div>${esc(CLUB.address)}</div></div>
  </div><div class="bottom"><span>© ${new Date().getFullYear()} ${esc(CLUB.full)}</span><span>Тренуйтеся розумно · Перед початком проконсультуйтеся з лікарем</span></div></div></footer>`;
}

const plansHTML = () => `<div class="plans">${PLANS.map((p) => `<article class="plan ${p.featured ? 'featured' : ''}">${p.featured ? '<span class="badge">Найпопулярніший</span>' : ''}
  <h3>${esc(p.name)}</h3><div class="note">${esc(p.note)}</div><div class="from"><small>від </small>${Math.min(...p.rows.map((r) => r[1]))}<small> грн</small></div>
  <ul>${p.rows.map(([l, v]) => `<li><span>${esc(l)}</span><b>${uah(v)}</b></li>`).join('')}</ul><button class="btn" data-trial="${esc(p.name)}">Обрати</button></article>`).join('')}</div>`;

function home(v) {
  v.innerHTML = `<section class="hero"><img src="assets/img/hero.webp" alt="Зал клубу ${esc(CLUB.name)}"><div class="container">
      <span class="kicker">${esc(CLUB.tagline)}</span>
      <h1>Сила у <em class="gold-text">деталях</em>.<br>Результат у звичці.</h1>
      <p>Простір для тих, хто цінує якість: професійне обладнання, тиша, чистота й тренери, які ведуть до мети.</p>
      <div class="actions"><button class="btn btn-gold" data-trial>Записатися на пробне</button><a class="btn btn-light" href="#/prices">Тарифи</a></div>
      <div class="hero-meta"><div><b>3 зони</b><span>сила · кардіо · функціонал</span></div><div><b>від 250 грн</b><span>разове відвідування</span></div><div><b>${esc(CLUB.hours[0][1].replace(/\s/g, ''))}</b><span>${esc(CLUB.hours[0][0])}</span></div></div></div></section>
  <section class="section"><div class="container intro reveal"><div><span class="kicker">Про клуб</span><h2>Клуб, у якому хочеться залишатися</h2></div>
    <div><p class="lead">${esc(CLUB.full)} — сучасний зал для силових і кардіотренувань, персональної роботи з тренером і спокійного прогресу.</p>
      <p class="muted">Ми зібрали все необхідне і прибрали зайве: професійні тренажери, продумане зонування, охайні роздягальні та команду тренерів, які складуть програму під ваш рівень — від першого заняття до впевнених результатів.</p>
      <div class="amen">${AMENITIES.map(([t, d]) => `<div><b>${esc(t)}</b><span class="muted">${esc(d)}</span></div>`).join('')}</div></div></div></section>
  <section class="section paper"><div class="container"><div class="head reveal"><div><span class="kicker">Простір</span><h2>Зони клубу</h2></div><p class="muted">Кожна зона спроєктована під свій тип навантаження — щоб ви тренувалися без очікування й з максимальною ефективністю.</p></div>
    <div class="zones">${ZONES.map((z, i) => `<figure class="zone reveal" style="margin:0"><img src="${z.img}" alt="${esc(z.title)}" loading="lazy"><figcaption class="cap"><span class="n">0${i + 1}</span><h3>${esc(z.title)}</h3><p>${esc(z.text)}</p></figcaption></figure>`).join('')}</div></div></section>
  <section class="section"><div class="container"><div class="head reveal"><div><span class="kicker">Членство</span><h2>Абонементи</h2></div><p class="muted">Прозорі ціни без прихованих платежів. Заморозка для абонементів на 3 та 6 місяців.</p></div>
    <div class="reveal">${plansHTML()}</div></div></section>
  <section class="section dark"><div class="container cta reveal"><h2>Перше тренування — <span class="gold-text">знайомство</span> з клубом і тренером</h2><button class="btn btn-gold" data-trial>Записатися</button></div></section>`;
}

function page(v, kicker, title, text, body) {
  v.innerHTML = `<section class="page-head"><div class="container"><span class="kicker">${kicker}</span><h1>${title}</h1>${text ? `<p class="muted">${text}</p>` : ''}</div></section><section class="section"><div class="container">${body}</div></section>`;
}
const routes = {
  club: (v) => page(v, 'Простір', 'Клуб', 'Професійне обладнання, продумане зонування й атмосфера, у якій хочеться тренуватися.',
    `<div class="zones">${ZONES.map((z, i) => `<figure class="zone reveal" style="margin:0"><img src="${z.img}" alt="${esc(z.title)}" loading="lazy"><figcaption class="cap"><span class="n">0${i + 1}</span><h3>${esc(z.title)}</h3><p>${esc(z.text)}</p></figcaption></figure>`).join('')}</div>
     <div class="amen reveal" style="margin-top:60px">${AMENITIES.map(([t, d]) => `<div><b>${esc(t)}</b><span class="muted">${esc(d)}</span></div>`).join('')}</div>`),
  prices: (v) => page(v, 'Членство', 'Тарифи', 'Оберіть формат, що підходить саме вам: повний день, ранок, студентська чи сімейна карта та персональні тренування.',
    `${plansHTML()}<div class="extra"><div class="panel reveal"><span class="kicker">З тренером</span><h3 style="margin-top:14px">Персональні тренування</h3><ul class="list">${PERSONAL.map(([l, p]) => `<li class="row"><span>${esc(l)}</span><b>${uah(p)}</b></li>`).join('')}</ul></div>
      <div class="panel reveal"><span class="kicker">Пропозиції</span><h3 style="margin-top:14px">Спеціальні умови</h3><ul class="list">${OFFERS.map(([t, d, p]) => `<li class="row"><span>${esc(t)}<small>${esc(d)}</small></span><b>${p ? uah(p) : '−50%'}</b></li>`).join('')}</ul></div></div>`),
  bar: (v) => page(v, 'Харчування', 'Фітнес-бар', 'Усе для енергії до тренування й відновлення після — на рецепції клубу.',
    `<div class="bar">${BAR.map((g) => `<div class="panel reveal"><h3>${esc(g.cat)}</h3><ul class="list">${g.items.map(([n, d, p]) => `<li class="row"><span>${esc(n)}${d ? `<small>${esc(d)}</small>` : ''}</span><b>${uah(p)}</b></li>`).join('')}</ul></div>`).join('')}</div>`),
  rules: (v) => page(v, 'Етикет', 'Правила клубу', 'Щоб тренування були комфортними й результативними для всіх.',
    `<div class="rules">${RULES.map((r) => `<div class="rule reveal"><h3>${esc(r.t)}</h3>${r.p.map((x) => `<p>${esc(x)}</p>`).join('')}</div>`).join('')}</div>`),
  careers: (v) => page(v, 'Команда', 'Вакансії', 'Шукаємо людей, які люблять спорт і сервіс так само, як ми.',
    `<div>${JOBS.map((j) => `<div class="job reveal"><h3>${esc(j.t)}</h3><div><p style="margin-top:0">${esc(j.p)}</p><ul class="muted">${j.req.map((r) => `<li>${esc(r)}</li>`).join('')}</ul></div><a class="btn" href="https://t.me/${esc(CLUB.telegram)}" target="_blank" rel="noopener">Відгукнутися</a></div>`).join('')}</div>`),
  contacts: (v) => page(v, 'Зв\'язок', 'Контакти', '',
    `<div class="contacts"><div><dl class="cl"><dt>Телефон</dt><dd><a href="tel:${tel}">${esc(CLUB.phone)}</a></dd><dt>Адреса</dt><dd>${esc(CLUB.address)}</dd>
      ${CLUB.hours.map(([d, h]) => `<dt>${d}</dt><dd>${h}</dd>`).join('')}<dt>Соцмережі</dt><dd><a href="https://instagram.com/${esc(CLUB.instagram)}" target="_blank" rel="noopener">Instagram</a> · <a href="https://t.me/${esc(CLUB.telegram)}" target="_blank" rel="noopener">Telegram</a></dd></dl></div>
      <div>${trialForm('cform')}</div></div>`),
};

function trialForm(id, plan = '') {
  return `<form id="${id}" novalidate><span class="kicker">Перший візит</span><h2 style="font-size:40px;margin:14px 0 24px">Пробне тренування</h2>
    <label class="f"><span>Ім'я</span><input class="input" name="name" required autocomplete="name"></label>
    <label class="f"><span>Телефон</span><input class="input" name="phone" type="tel" required autocomplete="tel" placeholder="+380"></label>
    <div class="f"><span>Ваша мета</span><div class="chips">${['Зміцнити здоров\'я', 'Схуднути', 'Набрати м\'язи', 'Рельєф', 'Підготовка до змагань'].map((g, i) => `<label><input type="radio" name="goal" value="${g}" ${i ? '' : 'checked'}><span>${g}</span></label>`).join('')}</div></div>
    <div class="f"><span>Зручний час</span><div class="chips">${['Ранок', 'День', 'Вечір'].map((g, i) => `<label><input type="radio" name="time" value="${g}" ${i ? '' : 'checked'}><span>${g}</span></label>`).join('')}</div></div>
    ${plan ? `<input type="hidden" name="plan" value="${esc(plan)}">` : ''}
    <div class="err" style="color:#9B3B2E;font-size:13px;min-height:20px;margin-bottom:8px"></div>
    <button class="btn btn-gold btn-block">Надіслати заявку</button>
    <p class="muted" style="font-size:12px;margin-top:12px">Адміністратор зв'яжеться з вами, щоб підтвердити час.</p></form>`;
}
function bindForm(form, after) {
  form.onsubmit = (e) => {
    e.preventDefault(); const d = Object.fromEntries(new FormData(form)); const err = $('.err', form);
    if ((d.name || '').trim().length < 2) return (err.textContent = 'Вкажіть ім\'я');
    if (digits(d.phone).length < 10) return (err.textContent = 'Вкажіть номер телефону (10+ цифр)');
    const text = `Заявка на пробне тренування — ${CLUB.full}\nІм'я: ${d.name}\nТелефон: ${d.phone}\nМета: ${d.goal}\nЧас: ${d.time}${d.plan ? `\nТариф: ${d.plan}` : ''}`;
    const t = encodeURIComponent(text);
    const box = document.createElement('div');
    box.innerHTML = `<span class="kicker">Майже готово</span><h2 style="font-size:40px;margin:14px 0 12px">Дякуємо, ${esc(d.name)}</h2><p class="muted">Надішліть заявку в зручний месенджер — текст уже готовий. Або просто зателефонуйте.</p>
      <div class="msgr"><a class="btn btn-gold" href="https://wa.me/${digits(CLUB.whatsapp)}?text=${t}" target="_blank" rel="noopener">WhatsApp</a><a class="btn" href="viber://chat?number=%2B${digits(CLUB.viber)}&draft=${t}">Viber</a><a class="btn" href="https://t.me/${esc(CLUB.telegram)}" target="_blank" rel="noopener" data-copy>Telegram</a><a class="btn" href="tel:${tel}">Зателефонувати</a></div>`;
    $('[data-copy]', box).addEventListener('click', () => navigator.clipboard?.writeText(text));
    form.replaceWith(box); if (after) after();
  };
}
function openTrial(plan = '') {
  const o = document.createElement('div'); o.className = 'overlay';
  o.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="Пробне тренування"><button class="x" aria-label="Закрити">×</button>${trialForm('tform', plan)}</div>`;
  const close = () => o.remove();
  o.onclick = (e) => { if (e.target === o) close(); }; $('.x', o).onclick = close;
  document.body.appendChild(o); bindForm($('#tform', o)); $('input[name=name]', o).focus();
}

function render() {
  const route = location.hash.replace(/^#\/?/, '').split('/')[0];
  app.innerHTML = header(route) + '<main id="view"></main>' + footer();
  const v = $('#view'); (routes[route] || home)(v);
  document.title = route && routes[route] ? `${NAV.find((n) => n[0] === route)[1]} — ${CLUB.full}` : `${CLUB.full} — ${CLUB.tagline}`;
  $$('[data-trial]').forEach((b) => (b.onclick = () => openTrial(b.dataset.trial || '')));
  const f = $('#cform'); if (f) bindForm(f);
  const nav = $('#nav'), bg = $('#burger'); bg.onclick = () => { nav.classList.toggle('open'); bg.setAttribute('aria-expanded', nav.classList.contains('open')); $('#hdr').classList.add('solid'); };
  window.scrollTo(0, 0); onScroll();
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
  $$('.reveal').forEach((el) => io.observe(el));
}
function onScroll() { const h = $('#hdr'); if (h) h.classList.toggle('solid', scrollY > 40); }
addEventListener('scroll', onScroll, { passive: true });
addEventListener('hashchange', render);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('.overlay')?.remove(); });
render();
