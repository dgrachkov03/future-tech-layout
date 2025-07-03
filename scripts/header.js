export default function initHeader() {
  // Бургер-меню
  const overlay = document.querySelector(".header__overlay");
  const burgerButton = document.querySelector(".burger-button");
  const body = document.body;

  if (overlay && burgerButton) {
    burgerButton.addEventListener("click", () => {
      overlay.classList.toggle("is-active");
      burgerButton.classList.toggle("is-active");
      body.classList.toggle("is-lock");
    });
  }

  // Закрыть меню при нажатии на Ecsape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      overlay.classList.remove("is-active");
      burgerButton.classList.remove("is-active");
      body.classList.remove("is-lock");
    }
  });

  // Закрыть меню за пределами элемента
  overlay.addEventListener("click", (e) => {
    const menuWrapper = document.querySelector(".header__overlay-wrapper");

    if (!menuWrapper.contains(e.target)) {
      overlay.classList.remove("is-active");
      burgerButton.classList.remove("is-active");
      body.classList.remove("is-lock");
    }
  });
}