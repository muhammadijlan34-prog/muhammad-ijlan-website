/* ==========================================
   MUHAMMAD IJLAN
   FINAL LAUNCH READY SCRIPT.JS
========================================== */

/* PRELOADER */
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;
    setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
    }, 1200);
});

/* PWA INSTALL */
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
        installBtn.style.display = "block";
    }
});

if (installBtn) {
    installBtn.addEventListener("click", async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        installBtn.style.display = "none";
    });
}

/* SERVICE WORKER */
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
            .then(() => { console.log("Service Worker Registered"); })
            .catch((err) => { console.log(err); });
    });
}

/* HERO ANIMATION */
const hero = document.querySelector(".hero-content");
if (hero) {
    hero.animate([
        { opacity: 0, transform: "translateY(40px)" },
        { opacity: 1, transform: "translateY(0)" }
    ], { duration: 900, easing: "ease-out", fill: "forwards" });
}

/* CARD ANIMATION */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-card");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".card,.social-card").forEach((card) => {
    observer.observe(card);
});

/* SMOOTH NAVIGATION */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
    });
});

/* CURRENT YEAR */
document.querySelectorAll(".year").forEach((year) => {
    year.textContent = new Date().getFullYear();
});

/* MENU BUTTON */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
    navLinks.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => navLinks.classList.remove("active")));
}

/* MIP VOX progress line and moving name ribbon */
(() => {
  const bar = document.getElementById('progress');
  if (bar) {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
  const track = document.getElementById('track');
  if (!track || !track.firstElementChild) return;
  const first = track.firstElementChild;
  for (let i = 0; i < 5; i++) track.appendChild(first.cloneNode(true));
  let x = 0, dir = -1, boost = 0, last = window.scrollY;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.addEventListener('scroll', () => {
    const d = window.scrollY - last; last = window.scrollY;
    if (d) dir = d > 0 ? -1 : 1;
    boost = Math.min(Math.abs(d) * .18, 5);
  }, { passive: true });
  const tick = () => {
    if (!reduced) {
      const width = first.getBoundingClientRect().width;
      x += dir * (.55 + boost); boost *= .92;
      if (x <= -width) x += width;
      if (x > 0) x -= width;
      track.style.transform = `translate3d(${x}px,0,0)`;
    }
    requestAnimationFrame(tick);
  };
  tick();
})();

/* Hero typing words */
(function () {
  const el = document.getElementById("typed");
  if (!el) return;
  const words = ["Live Announcements", "Recorded Announcements", "Festival Programs"];
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = words.join(" · ");
    return;
  }
  let w = 0, i = 0, deleting = false;
  (function tick() {
    const word = words[w];
    el.textContent = word.slice(0, i);
    let delay = deleting ? 45 : 85;
    if (!deleting && i === word.length) { deleting = true; delay = 1500; }
    else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
    else { i += deleting ? -1 : 1; }
    setTimeout(tick, delay);
  })();
})();