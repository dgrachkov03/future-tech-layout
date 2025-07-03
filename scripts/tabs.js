export default function initTabs() {
  const btns = document.querySelectorAll(".tabs__button");
  const contents = document.querySelectorAll(".tabs__content");

  if (btns.length === 0 || contents.length === 0) {
    return;
  }

  // Обработчик кликов на табах
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("is-active")) {
        return;
      }

      btns.forEach((element) => {
        element.classList.remove("is-active");
        element.setAttribute("aria-selected", "false");
        element.setAttribute("tabindex", "-1");
      });

      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      btn.setAttribute("tabindex", "0");

      contents.forEach((content) => {
        content.classList.remove("is-active");
      });

      const activeContent = document.getElementById(btn.dataset.tab);
      if (activeContent) {
        activeContent.classList.add("is-active");
      } else {
        console.error(`Tab content with id "${btn.dataset.tab}" not found`);
      }
    });
  });

  const defaultTabBtn = document.querySelector("[data-tab='tab-1']");
  const defaultTabContent = document.querySelector("#tab-1");
  
  if (defaultTabBtn && defaultTabContent) {
    defaultTabBtn.classList.add("is-active");
    defaultTabContent.classList.add("is-active");
  } else {
    console.warn("Default tab elements not found, activating first available tab");
    if (btns.length > 0 && contents.length > 0) {
      btns[0].classList.add("is-active");
      btns[0].setAttribute("aria-selected", "true");
      btns[0].setAttribute("tabindex", "0");
      contents[0].classList.add("is-active");
    }
  }

  // Переключение табов клавишами
  btns.forEach((btn, index) => {
    btn.addEventListener("keydown", (event) => {
      event.preventDefault();

      if (event.key === "ArrowLeft") {
        const prevIndex = (index - 1 + btns.length) % btns.length;
        btns[prevIndex].focus();
      } else if (event.key === "ArrowRight") {
        const nextIndex = (index + 1) % btns.length;
        btns[nextIndex].focus();
      } else if (event.key === "Enter" || event.key === " ") {
        btn.click();
      }
    });
  });
}