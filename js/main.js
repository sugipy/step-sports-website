/**
 * 有限会社ステップスポーツ コーポレートサイト
 * main.js — ハンバーガーメニュー、スムーススクロール、ヘッダー制御
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===== 要素取得 =====
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const body = document.body;

  // ===== ナビオーバーレイ生成 =====
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  body.appendChild(overlay);

  // ===== ハンバーガーメニュー開閉 =====
  function toggleMenu() {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);

    if (isOpen) {
      body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-label', 'メニューを閉じる');
    } else {
      body.style.overflow = '';
      hamburger.setAttribute('aria-label', 'メニューを開く');
    }
  }

  function closeMenu() {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'メニューを開く');
    body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // ===== ナビリンク クリックでメニュー閉じる =====
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // ===== スクロール時のヘッダー影 =====
  function handleScroll() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ===== ESCキーでメニュー閉じる =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });
});
