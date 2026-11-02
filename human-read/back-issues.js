// The Human Read: back issues. Reads /human-read/editions.json and draws one card per edition
// into #back-issues .back-list. The page's <noscript> list is the fallback without JavaScript.
// The section's data-current attribute names the edition being read ("002"); its card is not linked.
(function () {
  var sec = document.getElementById('back-issues');
  if (!sec) return;
  var list = sec.querySelector('.back-list');
  var current = sec.getAttribute('data-current');

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function hide() {
    sec.hidden = true;
    document.querySelectorAll('a[href="#back-issues"]').forEach(function (a) { a.hidden = true; });
  }

  fetch('/human-read/editions.json')
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (editions) {
      if (!Array.isArray(editions) || !editions.length) throw new Error('empty');
      editions.forEach(function (e) {
        var here = e.number === current;
        var card = el(here ? 'div' : 'a', 'back-card' + (here ? ' is-current' : ''));
        if (here) card.setAttribute('aria-current', 'page');
        else card.href = e.path;
        var img = el('img');
        img.src = e.image;
        img.alt = '';
        img.width = 1600;
        img.height = 900;
        img.loading = 'lazy';
        card.appendChild(img);
        card.appendChild(el('span', 'back-label', 'Edition No. ' + parseInt(e.number, 10)));
        card.appendChild(el('span', 'back-date', e.date));
        card.appendChild(el('span', 'back-title', e.headline));
        if (here) card.appendChild(el('span', 'back-label back-here', 'You are reading this'));
        list.appendChild(card);
      });
    })
    .catch(hide);
})();
