// Smooth Scroll Reveal

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll("section").forEach((section)=>{

    section.classList.add("hidden");

    observer.observe(section);

});

// Card Hover Effect

const cards=document.querySelectorAll(".card");

cards.forEach((card)=>{

    card.addEventListener("mousemove",(e)=>{

        const rect=card.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        card.style.setProperty("--x",x+"px");

        card.style.setProperty("--y",y+"px");

    });

});

// Smooth Button Click

document.querySelectorAll("a").forEach((btn)=>{

btn.addEventListener("click",()=>{

navigator.vibrate?.(20);

});

});

console.log("Your Voice Website Loaded Successfully");