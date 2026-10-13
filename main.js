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

  // Dynamic APK link sync from version.json (keeps download button fresh without showing version numbers)
  fetch('version.json')
    .then(res => res.json())
    .then(data => {
      if (data && data.apk_url) {
        document.querySelectorAll('a[href$=".apk"]').forEach(link => {
          link.href = data.apk_url;
        });
      }
    })
    .catch(() => {});
});
