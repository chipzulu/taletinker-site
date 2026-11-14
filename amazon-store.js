(() => {
  const select = document.getElementById('amazon-store');
  if (!select) return;
  const storageKey = 'taletinker-amazon-store';
  const allowed = Array.from(select.options, option => option.value);

  function applyStore() {
    const host = select.value;
    for (const link of document.querySelectorAll('[data-edition]')) {
      const url = new URL(link.dataset.href || link.href);
      url.hostname = host;
      if (link.dataset.href) link.dataset.href = url.href;
      if (link.hasAttribute('href')) link.href = url.href;
    }
  }

  try {
    const saved = localStorage.getItem(storageKey);
    if (allowed.includes(saved)) select.value = saved;
  } catch (_) {
    // Store selection still works when browser storage is unavailable.
  }
  applyStore();
  select.closest('.amazon-store').hidden = false;
  select.addEventListener('change', () => {
    applyStore();
    try { localStorage.setItem(storageKey, select.value); } catch (_) {}
  });
  window.addEventListener('pageshow', applyStore);
})();
