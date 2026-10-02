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


  /* ========== 7. VALIDAÇÃO E ENVIO DO FORMULÁRIO ========== */
  var contactForm = document.getElementById('contactForm');
  var nomeInput = document.getElementById('nome');
  var emailInput = document.getElementById('email');
  var telefoneInput = document.getElementById('telefone');
  var mensagemInput = document.getElementById('mensagem');
  var submitBtn = document.getElementById('submitBtn');
  var formFeedback = document.getElementById('formFeedback');

  // Regex para e-mail
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function clearValidation(input) {
    input.classList.remove('invalid', 'valid');
    var errorSpan = document.getElementById(input.id + 'Error');
    if (errorSpan) errorSpan.textContent = '';
  }

  function showValidation(input, isValid, message) {
    input.classList.remove('invalid', 'valid');
    input.classList.add(isValid ? 'valid' : 'invalid');
    var errorSpan = document.getElementById(input.id + 'Error');
    if (errorSpan) errorSpan.textContent = isValid ? '' : message;
  }

  // Validação em tempo real
  nomeInput.addEventListener('input', function () {
    if (this.value.trim() === '') {
      clearValidation(this);
    } else if (this.value.trim().length < 3) {
      showValidation(this, false, 'Nome deve ter pelo menos 3 caracteres.');
    } else {
      showValidation(this, true, '');
    }
  });

  emailInput.addEventListener('input', function () {
    if (this.value.trim() === '') {
      clearValidation(this);
    } else if (!emailRegex.test(this.value.trim())) {
      showValidation(this, false, 'Informe um e-mail válido.');
    } else {
      showValidation(this, true, '');
    }
  });

  mensagemInput.addEventListener('input', function () {
    if (this.value.trim() === '') {
      clearValidation(this);
    } else if (this.value.trim().length < 10) {
      showValidation(this, false, 'Mensagem deve ter pelo menos 10 caracteres.');
    } else {
      showValidation(this, true, '');
    }
  });

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var isValid = true;
    var errors = {};

    // Validar nome
    if (nomeInput.value.trim().length < 3) {
      isValid = false;
      errors.nome = 'Nome deve ter pelo menos 3 caracteres.';
    }

    // Validar e-mail
    if (!emailRegex.test(emailInput.value.trim())) {
      isValid = false;
      errors.email = 'Informe um e-mail válido.';
    }

    // Validar mensagem
    if (mensagemInput.value.trim().length < 10) {
      isValid = false;
      errors.mensagem = 'Mensagem deve ter pelo menos 10 caracteres.';
    }

    // Exibir erros
    formFeedback.className = 'form-feedback';
    formFeedback.textContent = '';

    if (!isValid) {
      Object.keys(errors).forEach(function (field) {
        var input = document.getElementById(field);
        showValidation(input, false, errors[field]);
      });
      formFeedback.textContent = 'Por favor, corrija os campos acima.';
      formFeedback.classList.add('error');
      return;
    }

    // Simulação de envio
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // Simula delay de rede
    setTimeout(function () {
      formFeedback.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
      formFeedback.classList.add('success');
      contactForm.reset();

      // Limpa validações
      [nomeInput, emailInput, telefoneInput, mensagemInput].forEach(function (input) {
        input.classList.remove('invalid', 'valid');
      });
      document.querySelectorAll('.form-error').forEach(function (span) {
        span.textContent = '';
      });

      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar Mensagem';
    }, 1500);
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
