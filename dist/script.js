const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

(() => {
  const selector = document.getElementById('language-select');
  if (!selector) return;

  const dictionary = window.PORTFOLIO_ZH || {};
  const normalize = (text) => text.replace(/\s+/g, ' ').trim();
  const translate = (text, language) => language === 'zh'
    ? (dictionary[normalize(text)] ?? text)
    : text;

  // Keep existing nodes: changing language must not recreate or restart videos.
  const texts = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!normalize(node.nodeValue) || node.parentElement.closest('script, style, select')) continue;
    const original = node.nodeValue;
    texts.push({ node, original, leading: original.match(/^\s*/)[0], trailing: original.match(/\s*$/)[0] });
  }

  const attributes = [];
  document.querySelectorAll('[alt], [aria-label]').forEach((element) => {
    ['alt', 'aria-label'].forEach((name) => {
      if (element.hasAttribute(name)) attributes.push({ element, name, original: element.getAttribute(name) });
    });
  });
  const description = document.querySelector('meta[name="description"]');
  if (description) attributes.push({ element: description, name: 'content', original: description.content });
  const originalTitle = document.title;
  const storageKey = 'ji-zhou-portfolio-language';

  const applyLanguage = (language, persist = false) => {
    const selected = language === 'zh' ? 'zh' : 'en';
    texts.forEach(({ node, original, leading, trailing }) => {
      const translated = translate(original, selected);
      node.nodeValue = translated === original ? original : leading + translated + trailing;
    });
    attributes.forEach(({ element, name, original }) => element.setAttribute(name, translate(original, selected)));
    document.title = translate(originalTitle, selected);
    document.documentElement.lang = selected === 'zh' ? 'zh-CN' : 'en';
    selector.value = selected;
    if (persist) {
      try { localStorage.setItem(storageKey, selected); } catch { /* Browsing remains usable if storage is blocked. */ }
    }
  };

  let saved;
  try { saved = localStorage.getItem(storageKey); } catch { /* Use the browser language when storage is unavailable. */ }
  const initial = saved === 'zh' || saved === 'en' ? saved
    : (/^zh\b/i.test(navigator.language || '') ? 'zh' : 'en');
  applyLanguage(initial);
  selector.addEventListener('change', () => applyLanguage(selector.value, true));
})();
