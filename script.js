/* ==========================================
   MUHAMMAD IJLAN
   FINAL LAUNCH READY SCRIPT.JS
========================================== */

/* -------------------------
   PRELOADER
-------------------------- */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {

        preloader.style.opacity = "0";

        preloader.style.visibility = "hidden";

    }, 1200);

});

/* -------------------------
   PWA INSTALL
-------------------------- */

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

/* -------------------------
   SERVICE WORKER
-------------------------- */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./service-worker.js")

            .then(() => {

                console.log("Service Worker Registered");

            })

            .catch((err) => {

                console.log(err);

            });

    });

}

/* -------------------------
   HERO ANIMATION
-------------------------- */

const hero = document.querySelector(".hero-content");

if (hero) {

    hero.animate([

        {

            opacity: 0,

            transform: "translateY(40px)"

        },

        {

            opacity: 1,

            transform: "translateY(0)"

        }

    ], {

        duration: 900,

        easing: "ease-out",

        fill: "forwards"

    });

}

/* -------------------------
   CARD ANIMATION
-------------------------- */

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show-card");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll(".card,.social-card").forEach((card) => {

    observer.observe(card);

});

/* -------------------------
   SMOOTH NAVIGATION
-------------------------- */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))

            .scrollIntoView({

                behavior: "smooth"

            });

    });

});

/* -------------------------
   CURRENT YEAR
-------------------------- */

document.querySelectorAll(".year").forEach((year) => {

    year.textContent = new Date().getFullYear();

});
const menuBtn=document.getElementById("menuBtn");

const navLinks=document.getElementById("navLinks");

menuBtn.addEventListener("click",()=>{

    navLinks.classList.toggle("active");

});