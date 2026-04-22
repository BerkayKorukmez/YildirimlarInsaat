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

    /* Mobilde "Hizmetlerimiz" (has-drop) öğesini tıklayınca alt menü aç/kapa.
       - Navigasyon (link'e gitme) engellenir; alt-item ile gidilir.
       - Touch ve click çakışmaması için tek event; pointer-events sayesinde
         nav-menu kapalıyken zaten çalışmaz. */
    const isMobileView = () => window.matchMedia('(max-width: 820px)').matches;
    menu.querySelectorAll('.has-drop').forEach((hasDrop) => {
      const parentLink = hasDrop.querySelector(':scope > a');
      if (!parentLink) return;
      parentLink.addEventListener('click', (e) => {
        if (isMobileView()) {
          e.preventDefault();
          e.stopPropagation();
          /* Aynı menüde başka açık drop varsa onu kapat (tek açık kural) */
          menu.querySelectorAll('.has-drop.open').forEach((el) => {
            if (el !== hasDrop) el.classList.remove('open');
          });
          hasDrop.classList.toggle('open');
        }
      });
    });

    /* Aktif hizmet sayfasında ilgili dropdown otomatik açık başlasın
       (sadece mobilde anlamlı; desktop'ta hover'la açılıyor zaten). */
    try {
      const current = window.location.pathname.split('/').pop() || '';
      const activeDropLink = menu.querySelector(`.has-drop .drop a[href$="${current}"]`);
      if (activeDropLink) {
        activeDropLink.classList.add('active');
        const hasDrop = activeDropLink.closest('.has-drop');
        if (hasDrop && isMobileView()) hasDrop.classList.add('open');
      }
    } catch (_) {}

    /* Bir alt-link'e tıklandığında menüyü kapat (ana menü de kapansın) */
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        const parent = link.parentElement;
        const isParentHasDrop = parent && parent.classList.contains('has-drop');
        if (menu.classList.contains('open') && !isParentHasDrop) {
          closeMenu();
        }
      });
    });

    /* Desktop'a dönerken state temizliği */
    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 821px)').matches) {
        closeMenu();
        menu.querySelectorAll('.has-drop.open').forEach((el) => el.classList.remove('open'));
      }
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
