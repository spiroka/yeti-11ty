const nav = document.querySelector('#main-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    nav.classList.add('scrolled')
  } else {
    nav.classList.remove('scrolled');
  }
});
