/* ==========================================================================
   Zen Mate – Modern Interactions Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.style.display === 'block';
      mobileDrawer.style.display = isOpen ? 'none' : 'block';
    });

    // Close drawer when clicking any link inside
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.style.display = 'none';
      });
    });
  }

  // Header elevation on scroll
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteHeader.style.borderBottomColor = 'rgba(255, 30, 56, 0.25)';
      siteHeader.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.7)';
    } else {
      siteHeader.style.borderBottomColor = 'var(--border-subtle)';
      siteHeader.style.boxShadow = 'none';
    }
  });

  // Real App Screen Tabs Switcher
  const tabButtons = document.querySelectorAll('.screen-tab-btn');
  const previewScreen = document.getElementById('app-preview-screen');

  if (tabButtons.length > 0 && previewScreen) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetImg = btn.getAttribute('data-img');
        if (targetImg) {
          previewScreen.style.opacity = '0.4';
          previewScreen.src = targetImg;
          setTimeout(() => {
            previewScreen.style.opacity = '1';
          }, 100);
        }
      });
    });
  }

  // Smartlink ad integration on download (once per session)
  const SMARTLINK_URL = 'https://www.profitableratecpmnetwork.com/zn0znpr5?key=772cdcfaa0b48bb9e3ff407b05360081';

  document.querySelectorAll('a[href$=".apk"]').forEach(link => {
    link.addEventListener('click', () => {
      try {
        if (!sessionStorage.getItem('zenmate_smartlink_opened')) {
          sessionStorage.setItem('zenmate_smartlink_opened', 'true');
          window.open(SMARTLINK_URL, '_blank');
        }
      } catch (_) {}
    });
  });

  // Dynamic APK link sync from version.json (keeps primary 64-bit download fresh)
  fetch('version.json')
    .then(res => res.json())
    .then(data => {
      if (data && data.apk_url) {
        document.querySelectorAll('a[href$=".apk"]').forEach(link => {
          if (!link.getAttribute('data-abi')) {
            link.href = data.apk_url;
          }
        });
      }
    })
    .catch(() => {});

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all others
      faqItems.forEach(other => {
        const otherBtn = other.querySelector('.faq-q');
        const otherAns = other.querySelector('.faq-a');
        if (otherBtn && otherAns) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAns.classList.remove('open');
        }
      });

      // Toggle current
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
});

