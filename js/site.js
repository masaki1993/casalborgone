const languageButtons = document.querySelectorAll("[data-lang]");
const translatable = document.querySelectorAll("[data-it][data-en]");
const menuButton = document.querySelector(".menu-button");
const navWrap = document.querySelector(".nav-wrap");

function setLanguage(language) {
  const activeLanguage = language === "en" ? "en" : "it";
  document.documentElement.lang = activeLanguage;

  translatable.forEach((element) => {
    element.textContent = element.dataset[activeLanguage];
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === activeLanguage;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("casalborgone-language", activeLanguage);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

if (menuButton && navWrap) {
  menuButton.addEventListener("click", () => {
    const isOpen = navWrap.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navWrap.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navWrap.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

setLanguage(localStorage.getItem("casalborgone-language") || "it");
