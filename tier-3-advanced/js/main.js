document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));

  // Language switcher
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      document.documentElement.lang = lang;
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
      localStorage.setItem('hopebridge-lang', lang);
    });
  });
  const saved = localStorage.getItem('hopebridge-lang');
  if (saved) {
    document.documentElement.lang = saved;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === saved));
  }

  // Animated counters
  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = el => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();
    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased).toLocaleString() + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    counters.forEach(c => observer.observe(c));
  }

  // Donation amount buttons
  document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const input = document.getElementById('custom-amount');
      if (input && btn.dataset.amount) input.value = btn.dataset.amount;
    });
  });

  // Volunteer multi-step form
  const vForm = document.getElementById('volunteer-form');
  if (vForm) {
    let step = 1;
    const totalSteps = 3;
    const showStep = n => {
      vForm.querySelectorAll('.form-panel').forEach((p, i) => p.style.display = i + 1 === n ? 'block' : 'none');
      vForm.querySelectorAll('.form-step').forEach((s, i) => s.classList.toggle('active', i + 1 === n));
      document.getElementById('vol-prev').style.display = n === 1 ? 'none' : 'inline-flex';
      document.getElementById('vol-next').textContent = n === totalSteps ? 'Submit Application' : 'Continue →';
    };
    document.getElementById('vol-next')?.addEventListener('click', () => {
      if (step < totalSteps) { step++; showStep(step); }
      else { alert('Demo: Application submitted! In the live site, this goes to your volunteer database.'); step = 1; showStep(1); vForm.reset(); }
    });
    document.getElementById('vol-prev')?.addEventListener('click', () => { if (step > 1) { step--; showStep(step); } });
    showStep(1);
  }

  document.querySelectorAll('form[data-demo]').forEach(form => {
    if (form.id === 'volunteer-form') return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert('Demo only — in the live site this processes real data.');
      form.reset();
    });
  });
});
