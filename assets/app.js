const config = window.SITE_CONFIG || {};
if (config.name?.trim()) document.querySelectorAll('[data-name]').forEach(el => el.textContent = config.name.trim());
const username = (config.telegramUsername || '').trim().replace(/^@/, '');
const dialog = document.querySelector('#contact-dialog');
const telegram = document.querySelector('.telegram');
if (/^[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(username)) {
  telegram.href = `https://t.me/${username}`;
  telegram.target = '_blank';
  telegram.rel = 'noopener noreferrer';
  document.querySelector('#telegram-note').textContent = `@${username}`;
} else {
  telegram.addEventListener('click', e => { e.preventDefault(); dialog.showModal(); });
}
document.querySelectorAll('.close-dialog, .close-action').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); }));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); } });
