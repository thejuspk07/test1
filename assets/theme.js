document.documentElement.classList.add('js-enabled');
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !navigator.connection?.saveData) document.documentElement.classList.add('motion-enabled');
try { document.documentElement.dataset.theme = localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'; } catch {}
