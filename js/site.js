const languages = ["it", "en", "fr", "ja"];
const languageButtons = document.querySelectorAll("[data-lang]");
const translatable = document.querySelectorAll("[data-it]");
const menuButton = document.querySelector(".menu-button");
const navWrap = document.querySelector(".nav-wrap");

function setLanguage(language) {
  const activeLanguage = languages.includes(language) ? language : "it";
  document.documentElement.lang = activeLanguage;

  translatable.forEach((element) => {
    const text = element.dataset[activeLanguage] || element.dataset.it;
    if (text) element.textContent = text;
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === activeLanguage;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("casalborgone-language", activeLanguage);
}

function setMenu(open) {
  if (!menuButton || !navWrap) return;
  navWrap.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

if (menuButton && navWrap) {
  menuButton.addEventListener("click", () => {
    setMenu(!navWrap.classList.contains("open"));
  });

  navWrap.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
}

setLanguage(localStorage.getItem("casalborgone-language") || "it");
