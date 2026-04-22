/* ===================================================
   Yıldırımlar İnşaat - Main JS
   - Mobile menu toggle
   - Sticky header shadow
   - Scroll reveal animations
   - Animated counters
   - Contact form submission (FormSubmit.co)
   - Active nav link highlighting
   =================================================== */

(function () {
  'use strict';

  /* -------- Mobile menu -------- */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  const closeMenu = () => {
    if (!menu || !menu.classList.contains('open')) return;
    menu.classList.remove('open');
    const icon = toggle && toggle.querySelector('i');
    if (icon) {
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
    }
  };
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (menu.classList.contains('open') && !link.parentElement.classList.contains('has-drop')) {
          closeMenu();
        }
      });
    });
    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 821px)').matches) closeMenu();
    });
  }

  /* -------- Sticky header shadow on scroll -------- */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -------- Scroll reveal animations -------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* -------- Animated counters -------- */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    const animate = (el) => {
      const target = parseInt(el.dataset.counter, 10) || 0;
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('tr-TR');
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('tr-TR');
      };
      requestAnimationFrame(step);
    };
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => cio.observe(el));
  }

  /* -------- Active nav link highlighting based on current page -------- */
  try {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href) return;
      const fileName = href.split('/').pop();
      if (fileName === current) a.classList.add('active');
    });
  } catch (_) {}

  /* -------- Contact form (FormSubmit.co — AJAX) -------- */
  const form = document.querySelector('#contactForm');
  if (form) {
    const msg = form.querySelector('.form-msg');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      if (!name || !email || !message) {
        showMsg(msg, 'error', 'Lütfen ad, e-posta ve mesaj alanlarını doldurun.');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Gönderiliyor <i class="fa-solid fa-spinner fa-spin"></i>';
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: data
        });
        const json = await response.json().catch(() => ({}));

        if (response.ok && (json.success === 'true' || json.success === true)) {
          showMsg(msg, 'success', 'Mesajınız başarıyla iletildi. En kısa sürede size dönüş yapacağız.');
          form.reset();
        } else {
          showMsg(msg, 'error', 'Bir hata oluştu. Lütfen 0538 645 58 44 numarasından bizi arayın veya WhatsApp\'tan yazın.');
        }
      } catch (err) {
        showMsg(msg, 'error', 'Bağlantı hatası. Lütfen 0538 645 58 44 numarasından bizi arayın veya WhatsApp\'tan yazın.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
      }
    });

    function showMsg(el, kind, text) {
      if (!el) return;
      el.textContent = text;
      el.classList.remove('success', 'error');
      el.classList.add(kind, 'show');
      if (kind === 'error') setTimeout(() => el.classList.remove('show'), 8000);
    }
  }

  /* -------- Current year in footer -------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
