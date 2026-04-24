// Common site behavior: header scroll state, mobile nav, reveal-on-scroll, year stamp
(function () {
  // Mark header as scrolled
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  // Reveal on scroll
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Year stamp
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  // Contact form: submit to Google Forms via hidden iframe, show inline status
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const status = document.getElementById("contactStatus");
    const submitBtn = document.getElementById("contactSubmit");
    const iframe = document.getElementById("hidden_iframe");
    let submitting = false;

    contactForm.addEventListener("submit", () => {
      submitting = true;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "送信中…";
      }
      if (status) {
        status.style.display = "block";
        status.style.color = "var(--ink-700)";
        status.textContent = "送信しています…";
      }
    });

    if (iframe) {
      iframe.addEventListener("load", () => {
        if (!submitting) return;
        submitting = false;
        if (status) {
          status.style.color = "#0a7";
          status.innerHTML =
            "お問い合わせを受け付けました。<br>2〜3営業日以内に担当者よりご返信いたします。";
        }
        if (submitBtn) {
          submitBtn.textContent = "送信完了";
        }
        contactForm.reset();
      });
    }
  }
})();
