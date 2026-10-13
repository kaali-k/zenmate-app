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
      siteHeader.style.borderBottomColor = 'rgba(0, 242, 254, 0.2)';
      siteHeader.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    } else {
      siteHeader.style.borderBottomColor = 'var(--border-subtle)';
      siteHeader.style.boxShadow = 'none';
    }
  });
});
