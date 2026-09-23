document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const wrapper = toggle.closest('.navbtn-dropdown');
    const isOpen = wrapper.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.navbtn-dropdown.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.dropdown-toggle').setAttribute('aria-expanded', false);
  });
});