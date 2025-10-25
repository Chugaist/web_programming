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

    // Відстеження скролу — підсвічування активного пункту меню
    window.addEventListener("scroll", function() {
        let currentSectionId = "";
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute("href").substring(1) === currentSectionId) {
                link.classList.add("checked");
            } else {
                link.classList.remove("checked");
            }
        });
    });

    // Показ/приховування кнопки "наверх"
    window.addEventListener("scroll", function() {
        const scrollTopButton = document.querySelector(".scroll-top");
        if (scrollTopButton) {
            if (window.scrollY > 300) {
                scrollTopButton.style.display = "flex";
            } else {
                scrollTopButton.style.display = "none";
            }
        }
    });

    // Обробник кнопки відкриття меню
    const menuBtn = document.getElementById("menuBtn");
    if (menuBtn) {
        menuBtn.addEventListener("click", toggleMenu);
    }
    // Кнопка закриття меню
    const closeBtn = document.getElementById('closeBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextVideo);
    }

    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.addEventListener('click', prevVideo);
    }
});

const container = document.getElementById('bubble-container');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop) {
        const bubbleCount = 1 + Math.floor(Math.random() * 0.5);

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

            // випадкова затримка
            bubble.style.animationDelay = (Math.random() * 0.5) + 's';

            container.appendChild(bubble);

            bubble.addEventListener('animationend', () => {
                bubble.remove();
            });
        }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});






// Показ/приховування меню
function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "flex";
    } else {
        menu.style.display = "none";
    }
}

// Закриття меню
function closeMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) {
        mobileMenu.style.display = "none";
    }
}

// --- Відео блок --- //

const videoList = [
    "static/assets/images/trial_video_new.mp4",
    "static/assets/images/video1_new.mp4",
    "static/assets/images/video2_new.mp4"
];
let currentVideoIndex = 0;

const videoDisplay = document.getElementById("video-display");
const videoSource = document.getElementById("video-source");
const mobileVideoDisplay = document.getElementById("mobile-video-display");
const mobileVideoSource = document.getElementById("mobile-video-source");

function updateVideo(index) {
    if (videoSource && videoDisplay) {
        videoSource.src = videoList[index];
        videoDisplay.pause();
        videoDisplay.load();
        videoDisplay.play().catch(error => {
            console.error("Автовідтворення заблоковано:", error);
        });
    }
}


function updateMobileVideo(index) {
    if (mobileVideoSource && mobileVideoDisplay) {
        mobileVideoSource.src = videoList[index];
        mobileVideoDisplay.pause();
        mobileVideoDisplay.load();
        mobileVideoDisplay.play().catch(error => {
            console.error("Автовідтворення заблоковано:", error);
        });
    }
}

function prevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videoList.length) % videoList.length;
    updateVideo(currentVideoIndex);
    updateMobileVideo(currentVideoIndex);
}

function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
    updateVideo(currentVideoIndex);
    updateMobileVideo(currentVideoIndex);
}

setInterval(() => {
    nextVideo();
}, 10000); // Автоперехід кожні 10 секунд

// Свайп для мобільного відео
let startX = 0;
let endX = 0;

if (mobileVideoDisplay) {
    mobileVideoDisplay.addEventListener("touchstart", (event) => {
        startX = event.touches[0].clientX;
    });

    mobileVideoDisplay.addEventListener("touchend", (event) => {
        endX = event.changedTouches[0].clientX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeDistance = endX - startX;
    if (swipeDistance < -50) {
        nextVideo();
    }
    if (swipeDistance > 50) {
        prevVideo();
    }
}

// Фото-карусель
document.addEventListener("DOMContentLoaded", function () {
    const photos = Array.from(document.querySelectorAll(".photo-slide"));
    const prevBtn = document.getElementById("prevPhotoBtn");
    const nextBtn = document.getElementById("nextPhotoBtn");

    let currentIndex = 0;

    function showPhoto(index) {
        photos.forEach((img, i) => {
            img.style.display = i === index ? "block" : "none";
        });
    }

    function nextPhoto() {
        currentIndex = (currentIndex + 1) % photos.length;
        showPhoto(currentIndex);
    }

    function prevPhoto() {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        showPhoto(currentIndex);
    }

    // Ініціалізація
    showPhoto(currentIndex);

    // Події кнопок
    nextBtn.addEventListener("click", nextPhoto);
    prevBtn.addEventListener("click", prevPhoto);

    // Автоперехід
    setInterval(nextPhoto, 15000);
});

//мобільна карусель
window.onload = function () {
    const mobileSlider = document.querySelector(".mobile-photo-container");
    const photosMobile = document.querySelectorAll(".photo-slide-mobile");
    const totalPhotos = photosMobile.length;
    let currentIndex = 0;

    let startX = 0;
    let endX = 0;

    function showPhotoMobile(index) {
        // Виправлено: беремо ширину саме одного слайда, а не контейнера
        const slideWidth = photosMobile[0].clientWidth;
        mobileSlider.scrollTo({
            left: index * slideWidth,
            behavior: "smooth"
        });
    }

    function nextPhotoMobile() {
        currentIndex = (currentIndex + 1) % totalPhotos;
        showPhotoMobile(currentIndex);
    }

    function prevPhotoMobile() {
        currentIndex = (currentIndex - 1 + totalPhotos) % totalPhotos;
        showPhotoMobile(currentIndex);
    }

    // Обробка свайпу
    mobileSlider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    mobileSlider.addEventListener("touchmove", (e) => {
        endX = e.touches[0].clientX;
    });

    mobileSlider.addEventListener("touchend", () => {
        let diffX = endX - startX;

        if (Math.abs(diffX) > 50) { // поріг свайпу
            if (diffX > 0) {
                prevPhotoMobile();
            } else {
                nextPhotoMobile();
            }
        }
    });



    // Ініціалізація
    showPhotoMobile(currentIndex);

    // Автоперемикання кожні 10 секунд
    setInterval(nextPhotoMobile, 10000);
};

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector('textarea[name="message"]');
    const counter = document.querySelector('.char-count');

    textarea.addEventListener('input', function () {
        const currentLength = textarea.value.length;
        counter.textContent = `${currentLength}/300`;
    });
});




