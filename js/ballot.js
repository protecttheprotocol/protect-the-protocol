// One-tap ballot: the check draws itself, then the result panel shows.
// The vote of record is the cast the NO panel asks for. Nothing is sent from here;
// if the site ever shows a tally, send the vote to a counter in `pick()`.
(function () {
  const ballot = document.querySelector('[data-ballot]');
  if (!ballot) return;

  const options = ballot.querySelectorAll('[data-vote]');
  const states = document.querySelectorAll('[data-state]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let timer;

  // vote: null (no vote yet), 'yes' or 'no'.
  function show(vote) {
    states.forEach((el) => { el.hidden = el.dataset.state !== vote; });
    const shown = document.querySelector(`[data-state="${vote}"]`);
    if (!shown) return;
    const box = shown.getBoundingClientRect();
    if (box.top < 0 || box.bottom > innerHeight) {
      shown.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'center' });
    }
  }

  function pick(vote) {
    clearTimeout(timer);
    options.forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.vote === vote)));
    // Let the check finish drawing before the result appears.
    const delay = reduce.matches ? 0 : vote === 'no' ? 500 : 350;
    timer = setTimeout(() => show(vote), delay);
  }

  options.forEach((btn) => btn.addEventListener('click', () => pick(btn.dataset.vote)));

  document.querySelectorAll('[data-reset]').forEach((btn) =>
    btn.addEventListener('click', () => {
      clearTimeout(timer);
      options.forEach((o) => o.setAttribute('aria-pressed', 'false'));
      show(null);
    })
  );
})();
