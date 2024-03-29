// Add class to navbar when scrolled
const nav = document.querySelector('#main-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    nav.classList.add('scrolled')
  } else {
    nav.classList.remove('scrolled');
  }
});

const navToggle = document.querySelector('#nav-toggle');

// Close navigation drawer when focus moves out of navbar
nav.addEventListener('focusout', (e) => {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  if (isExpanded && !nav.contains(e.relatedTarget)) {
    toggleNavigation();
  }
});

// Toggle navigation on hamburger icon click
const toggleNavigation = () => {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  if (isExpanded) {
    navToggle.setAttribute('aria-expanded', false);
    nav.classList.remove('open');
  } else {
    navToggle.setAttribute('aria-expanded', true);
    nav.classList.add('open');
  }
};
navToggle.addEventListener('click', toggleNavigation);

// Set the currently active nav link
const visibleRegions = new Set();
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const { isIntersecting, target } = entry;
    if (isIntersecting) {
      visibleRegions.add(target.dataset.regionName);
    } else {
      visibleRegions.delete(target.dataset.regionName);
    }
  });
  document.querySelector('[aria-current="location"]')?.removeAttribute('aria-current'); 
  if (visibleRegions.size) {
    document.querySelector(`[data-region="${[...visibleRegions][0]}"]`).setAttribute('aria-current', 'location');
  }
}, { threshold: 0.2 });

const regions = document.querySelectorAll('[data-region-name]');
regions.forEach((region) => observer.observe(region));

// Fetch all news articles
const allNewsButton = document.querySelector('#all-news');
const spinner = document.querySelector('#spinner');
const fetchNews = (e) => {
  e.preventDefault();
  spinner.style.display = 'block';
  allNewsButton.remove();
  fetch('/news')
    .then((response) => response.text())
    .then((html) => {
      document.querySelector("#news-container")
        .insertAdjacentHTML('beforeend', html)
      spinner.remove();
    });
};
allNewsButton.addEventListener('click', fetchNews);

// Prevent email scraping
const mailToLinks = document.querySelectorAll('.mailto');
const emailPlaceHolders = document.querySelectorAll('.email-placeholder');
const name = 'info';
const host = 'yetisiszeged.hu';
mailToLinks.forEach((link) => {
  link.href = link.href.replace('EMAIL', `${name}@${host}`);
});

emailPlaceHolders.forEach((node) => {
  node.textContent = `${name}@${host}`;
});

