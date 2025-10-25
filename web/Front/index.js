// Дочекаємось завантаження DOM
document.addEventListener("DOMContentLoaded", function () {
    // Плавне прокручування до "About us" при натисканні кнопки "Learn more"
    const learnMoreBtn = document.querySelector(".learn-more-btn");
    const aboutSection = document.querySelector(".about-us");

    learnMoreBtn.addEventListener("click", function () {
        aboutSection.scrollIntoView({ behavior: "smooth" });
    });

});

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav a"); // Всі лінки навігації
    const sections = document.querySelectorAll("main > div"); // Всі секції на сторінці

    // Плавне прокручування до відповідної секції при натисканні на лінк
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Зупиняємо стандартну поведінку (перехід за лінком)
            const targetId = link.getAttribute("href").substring(1); // Отримуємо id секції
            const targetSection = document.getElementById(targetId);

            targetSection.scrollIntoView({ behavior: "smooth" }); // Плавне прокручування
        });
    });

    // Відстежуємо скролл і змінюємо активний лінк
    window.addEventListener("scroll", function () {
        let currentSectionId = "";
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute("href").substring(1) === currentSectionId) {
                link.classList.add("checked"); // Додаємо клас для активного лінка
            } else {
                link.classList.remove("checked"); // Видаляємо клас для неактивного лінка
            }
        });
    });
});

// Функція для плавного прокручування до елемента з ID "title"
function scrollToTop() {
    const titleElement = document.getElementById("title"); // Знаходимо елемент за ID
    if (titleElement) {
        titleElement.scrollIntoView({
            behavior: "smooth", // Плавна прокрутка
            block: "start" // Початок блоку
        });
    }
}

// Показ/приховування кнопки "наверх" залежно від прокрутки
window.addEventListener("scroll", function () {
    const scrollTopButton = document.querySelector(".scroll-top");
    if (window.scrollY > 300) { // Показуємо кнопку, якщо прокручено більше ніж 300px
        scrollTopButton.style.display = "flex"; // Відображення кнопки
    } else {
        scrollTopButton.style.display = "none"; // Приховуємо кнопку
    }
});

// Функція для перемикання видимості меню
function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "flex"; // Показуємо меню
    } else {
        menu.style.display = "none"; // Ховаємо меню
    }
}

// Отримуємо елементи
const mobileMenu = document.getElementById('mobileMenu');
const closeBtn = document.getElementById('closeBtn');

// Функція для відкриття меню
function openMenu() {
    mobileMenu.classList.add('show');
}

// Функція для закриття меню
function closeMenu() {
    mobileMenu.classList.remove('show');
}

// Додати обробник події для кнопки закриття
closeBtn.addEventListener('click', closeMenu);




