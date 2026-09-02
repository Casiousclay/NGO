document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));

  document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const custom = document.getElementById('custom-amount');
      if (custom) custom.value = btn.dataset.amount || '';
    });
  });

  document.querySelectorAll('form[data-demo]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert('Demo only — in the live site this processes real donations/submissions.');
      form.reset();
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
    });
  });
});
