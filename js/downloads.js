// Inside the claude.ai artifact viewer, plain download links do nothing.
// There, route [data-download] links through the viewer's save prompt.
// Anywhere else, claude is undefined and the links work as normal.
(async function () {
  const downloads = await window.claude?.use?.('downloads');
  if (!downloads) return;

  document.addEventListener('click', async (e) => {
    const link = e.target.closest('a[data-download]');
    if (!link) return;
    e.preventDefault();
    try {
      const blob = await fetch(link.href).then((r) => r.blob());
      await downloads.save({ filename: link.href.split('/').pop(), data: blob });
    } catch (err) {
      if (err?.code !== 'declined') console.warn('Download failed', err);
    }
  });
})();
