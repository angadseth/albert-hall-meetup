// Share the page through the phone's own share sheet, or copy the link on desktop.
(function () {
  const btn = document.querySelector('[data-share]');
  const note = document.querySelector('.share-note');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    const url = location.href.split('#')[0];
    const text = window.MEETUP.SHARE_TEXT;
    try {
      if (navigator.share) { await navigator.share({ title: document.title, text, url }); return; }
      await navigator.clipboard.writeText(text + ' ' + url);
      note.textContent = 'Link copied. Send it to the group.';
    } catch (e) {
      if (e && e.name !== 'AbortError') note.textContent = url;
    }
  });
})();
