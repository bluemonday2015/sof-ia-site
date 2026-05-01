// Quiet entry animations: stagger hero on load, reveal the rest on scroll.
(function () {
  const rises = document.querySelectorAll('.rise');
  const hero = document.querySelector('.hero');

  // Hero: stagger immediately on load
  if (hero) {
    const heroRises = hero.querySelectorAll('.rise');
    heroRises.forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), 120 + i * 160);
    });
  }

  // Rest: reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  rises.forEach((el) => {
    if (!hero || !hero.contains(el)) io.observe(el);
  });
})();
