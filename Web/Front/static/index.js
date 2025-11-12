// Дочекаємось завантаження DOM
document.addEventListener("DOMContentLoaded", function() {
    // Плавне прокручування до "About us" при натисканні кнопки "Learn more"
    const learnMoreBtn = document.querySelector(".learn-more-btn");
    const aboutSection = document.querySelector(".about-us");

    if (learnMoreBtn && aboutSection) {
        learnMoreBtn.addEventListener("click", function() {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        });
    }

    // Плавне прокручування до відповідної секції при натисканні на лінк
    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("[data-section]");

    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }

            // Якщо мобільне меню — ховаємо після натискання
            closeMenu();
        });
    });




});

document.addEventListener("DOMContentLoaded", () => {
    const svg = document.getElementById("jellyfishPreview");
    const colorSelect = document.getElementById("color");
    const shapeSelect = document.getElementById("shape");
    const tentacleSelect = document.getElementById("tentacles");
    const launchBtn = document.getElementById("launch");

    function drawJellyfish(svgEl, color, shape, tentacles) {
        svgEl.innerHTML = "";

        // Купол
        const dome = document.createElementNS("http://www.w3.org/2000/svg", "path");
        dome.setAttribute("fill", color);

        if (shape === "round")
            dome.setAttribute("d", "M10,60 Q50,0 90,60 Z");
        if (shape === "wavy")
            dome.setAttribute("d", "M10,60 Q25,20 40,60 Q55,20 70,60 Q85,20 90,60 Z");
        if (shape === "spiky")
            dome.setAttribute("d", "M10,60 Q25,10 40,60 Q50,10 60,60 Q75,10 90,60 Z");

        svgEl.appendChild(dome);

        // Щупальця
        for (let i = 0; i < 5; i++) {
            const t = document.createElementNS("http://www.w3.org/2000/svg", "path");
            t.setAttribute("stroke", color);
            t.setAttribute("stroke-width", "2");
            t.setAttribute("fill", "none");

            const x = 20 + i * 15;
            if (tentacles === "short") t.setAttribute("d", `M${x},60 Q${x+5},90 ${x},100`);
            if (tentacles === "long") t.setAttribute("d", `M${x},60 Q${x+10},100 ${x},120`);
            if (tentacles === "curvy") t.setAttribute("d", `M${x},60 Q${x+10},80 ${x},100 Q${x-10},120 ${x},140`);

            svgEl.appendChild(t);
        }
    }

    function updatePreview() {
        drawJellyfish(svg, colorSelect.value, shapeSelect.value, tentacleSelect.value);
    }

    [colorSelect, shapeSelect, tentacleSelect].forEach(el =>
      el.addEventListener("change", updatePreview)
    );

    updatePreview();

    launchBtn.addEventListener("click", () => {
        const floating = svg.cloneNode(true);
        floating.removeAttribute("id");
        floating.classList.add("floating-jellyfish");
        document.body.appendChild(floating);

        const rect = svg.getBoundingClientRect();
        floating.style.position = "fixed";
        floating.style.left = "0px";
        floating.style.top = "0px";
        floating.style.width = rect.width + "px";
        floating.style.height = rect.height + "px";
        floating.style.pointerEvents = "none";
        floating.style.zIndex = "9999";

        let posX = rect.left;
        let posY = rect.top;
        let dirX = (Math.random() * 2 - 1) * 1.5;
        let dirY = (Math.random() * 2 - 1) * 1;

        const lifetime = 10000; // 10 секунд життя
        const fadeDuration = 2000;
        const startTime = performance.now();

        function move(time) {
            posX += dirX;
            posY += dirY;

            if (posX < 0 || posX > window.innerWidth - rect.width) dirX *= -1;
            if (posY < 0 || posY > window.innerHeight - rect.height) dirY *= -1;

            const angle = Math.atan2(dirY, dirX) * (180 / Math.PI);
            floating.style.transform = `translate(${posX}px, ${posY}px) rotate(${angle}deg)`;

            if (time - startTime > lifetime) {
                const elapsed = time - (startTime + lifetime);
                floating.style.opacity = 1 - elapsed / fadeDuration;
                if (elapsed >= fadeDuration) {
                    floating.remove();
                    return;
                }
            }

            requestAnimationFrame(move);
        }

        requestAnimationFrame(move);
    });
});




const container = document.getElementById('bubble-container');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop) {
        const bubbleCount = 0.4 + Math.floor(Math.random() * 0.3);

        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            // випадкова горизонтальна позиція
            bubble.style.left = Math.random() * container.offsetWidth + 'px';

            // випадковий розмір
            const size = 10 + Math.random() * 70; // 20–50px
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';

            // додаємо фото
            bubble.style.backgroundImage = "url('static/assets/images/bubble.png')";

            // випадкова швидкість підйому
            const duration = 3 + Math.random() * 4;
            bubble.style.animationDuration = duration + 's';


            container.appendChild(bubble);

            bubble.addEventListener('animationend', () => {
                bubble.remove();
            });
        }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});















