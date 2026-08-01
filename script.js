/*=========================================
        MUHAMMAD IJLAN
        FINAL SCRIPT.JS
=========================================*/


/*==============================
      PRELOADER
==============================*/

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    preloader.style.opacity = "0";

    setTimeout(() => {

        preloader.style.display = "none";

    }, 600);

});


/*==============================
    INSTALL PWA BUTTON
==============================*/

let deferredPrompt;

const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;

    installBtn.style.display = "block";

});

installBtn.addEventListener("click", async () => {

    installBtn.style.display = "none";

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;

});


/*==============================
      NAVBAR SHADOW
==============================*/

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.boxShadow = "0 8px 25px rgba(0,0,0,.12)";

    } else {

        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,.06)";

    }

});


/*==============================
      SMOOTH FADE
==============================*/

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.2

});

document.querySelectorAll("section").forEach((section) => {

    section.classList.add("hidden");

    observer.observe(section);

});


/*==============================
      END
==============================*/