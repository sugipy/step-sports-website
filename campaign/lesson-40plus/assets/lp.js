/* ============================================================
   40代以上向けテニスレッスンLP
============================================================ */

/**
 * 申し込み導線URL（1箇所で管理）
 * 現在は小田急藤沢テニスガーデンのLINE公式アカウントに接続。
 * 別導線（Googleフォーム等）に切り替える場合はここだけ差し替える。
 * 空文字にすると、全CTAがページ下部の最終CTAセクションへスクロールする挙動に戻る。
 */
const FORM_URL = "https://lin.ee/XoBZIJG";

document.addEventListener("DOMContentLoaded", () => {
  /* --- CTAリンクの接続先を一括設定 --- */
  const ctaLinks = document.querySelectorAll(".js-form-link");
  if (FORM_URL.startsWith("http")) {
    ctaLinks.forEach((a) => {
      a.href = FORM_URL;
      a.target = "_blank";
      a.rel = "noopener";
    });
  }
  // FORM_URL未設定時は href="#cta-final"（HTML側の初期値）のまま＝ページ内スクロール

  /* --- スクロールで要素をふわっと表示 --- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-shown");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* --- モバイル固定CTAバー（ヒーローを過ぎたら表示、最終CTA付近で隠す） --- */
  const sticky = document.getElementById("stickyCta");
  const hero = document.querySelector(".hero");
  const finalCta = document.getElementById("cta-final");
  if (sticky && hero && finalCta) {
    const update = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      const finalTop = finalCta.getBoundingClientRect().top;
      const show = heroBottom < 0 && finalTop > window.innerHeight * 0.6;
      sticky.classList.toggle("is-visible", show);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }
});
