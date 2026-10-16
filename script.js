/* ============================================ */
/* SHOTLAB VISUALS — JavaScript                  */
/* ============================================ */

(function () {
  'use strict';

  /* ========== 1. MENU MOBILE (Hambúrguer) ========== */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Fecha menu ao clicar em link
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ========== 2. SCROLL REVEAL (Intersection Observer) ========== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ========== 3. CONTADOR DE ESTATÍSTICAS ========== */
  function animateCounters() {
    const counters = document.querySelectorAll('.hero__stat-number');
    const duration = 2000; // 2 segundos

    counters.forEach(function (counter) {
      var target = parseInt(counter.getAttribute('data-count'), 10);
      if (isNaN(target)) return;

      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // Easing: ease-out
        var ease = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(ease * target);
        counter.textContent = current.toLocaleString('pt-BR');
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = target.toLocaleString('pt-BR');
        }
      }

      requestAnimationFrame(step);
    });
  }

  // Ativa contadores quando hero é visível
  var heroSection = document.getElementById('hero');
  var statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  statsObserver.observe(heroSection);

  /* ========== 6. HOVER DA EQUIPE (complemento JS) ========== */
  // O efeito grayscale->color é feito via CSS puro (hover), mas aqui
  // adicionamos classe dinâmica caso precise de lógica extra no futuro.
  var equipeCards = document.querySelectorAll('.equipe-card');

  equipeCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      this.classList.add('equipe-card--active');
    });
    card.addEventListener('mouseleave', function () {
      this.classList.remove('equipe-card--active');
    });
  });

/* Reviews */


document.addEventListener('DOMContentLoaded', () => {
  const reviewCards = document.querySelectorAll('.review-card');

  if (!reviewCards.length) return;

  // Reveal cards when they enter the viewport without requiring a framework.
  const revealCards = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  };

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(revealCards, { threshold: 0.16 });
    reviewCards.forEach((card, index) => {
      card.style.setProperty('--review-delay', `${index * 90}ms`);
      observer.observe(card);
    });
  } else {
    reviewCards.forEach((card) => card.classList.add('is-visible'));
  }
});

/* ========== 7. CONTATO POR E-MAIL ========== */
var contactForm = document.getElementById('contactForm');
var nomeInput = document.getElementById('nome');
var emailInput = document.getElementById('email');
var telefoneInput = document.getElementById('telefone');
var mensagemInput = document.getElementById('mensagem');
var formFeedback = document.getElementById('formFeedback');
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var errors = {};
  if (nomeInput.value.trim().length < 3) errors.nome = 'Nome deve ter pelo menos 3 caracteres.';
  if (!emailRegex.test(emailInput.value.trim())) errors.email = 'Informe um e-mail válido.';
  if (mensagemInput.value.trim().length < 10) errors.mensagem = 'Mensagem deve ter pelo menos 10 caracteres.';

  formFeedback.className = 'form-feedback';
  formFeedback.textContent = '';
  if (Object.keys(errors).length) {
    Object.keys(errors).forEach(function (field) {
      var input = document.getElementById(field);
      input.classList.add('invalid');
      var error = document.getElementById(field + 'Error');
      if (error) error.textContent = errors[field];
    });
    formFeedback.textContent = 'Por favor, corrija os campos acima.';
    formFeedback.classList.add('error');
    return;
  }

  var corpo = [
    'Nome: ' + nomeInput.value.trim(),
    'E-mail: ' + emailInput.value.trim(),
    'Telefone: ' + (telefoneInput.value.trim() || 'Não informado'),
    '', 'Mensagem:', mensagemInput.value.trim()
  ].join('\n');

  window.location.href = 'mailto:shotlabsvisuals@gmail.com'
    + '?subject=' + encodeURIComponent('Nova mensagem do site - ' + nomeInput.value.trim())
    + '&body=' + encodeURIComponent(corpo);

  formFeedback.textContent = 'Seu aplicativo de e-mail foi aberto com a mensagem preenchida. Clique em Enviar para concluir.';
  formFeedback.classList.add('success');
});

  /* ========== 8. SCROLL SUAVE PARA ANCHORS ========== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ========== 9. NAVBAR SCROLL STATE ========== */
  var navbar = document.getElementById('navbar');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

})();
