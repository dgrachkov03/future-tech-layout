class Header {
  selectors = {
    root: "[data-js-header]",
    logo: "[data-js-header-logo]",
    overlay: "[data-js-header-overlay]",
    overlayWrapper: "[data-js-header-overlay-wrapper]",
    burgerButton: "[data-js-header-burger-button]",
  };

  stateClasses = {
    isActive: "is-active",
    isLock: "is-lock",
  };

  focusableSelectors = [
    "a[href]",
    "button:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(", ");

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);

    if (!this.rootElement) return;

    this.logoElement = this.rootElement.querySelector(this.selectors.logo);
    this.overlayElement = this.rootElement.querySelector(
      this.selectors.overlay,
    );
    this.overlayWrapperElement = this.rootElement.querySelector(
      this.selectors.overlayWrapper,
    );
    this.burgerButtonElement = this.rootElement.querySelector(
      this.selectors.burgerButton,
    );

    this.isOpen = false;

    this.mobileQuery = window.matchMedia("(width <= 767.98px)");

    this.initInert();
    this.bindEvents();
  }

  isMobile() {
    return this.mobileQuery.matches;
  }

  getFocusableElements() {
    return [
      ...this.rootElement.querySelectorAll(this.focusableSelectors),
    ].filter((element) => !element.closest("[inert]"));
  }

  initInert() {
    this.overlayElement.toggleAttribute("inert", this.isMobile());
  }

  toggleInert() {
    if (!this.isMobile()) {
      this.overlayElement.removeAttribute("inert");
      return;
    }

    const parent = this.rootElement.parentElement;

    parent
      .querySelectorAll(`:scope > *:not(${this.selectors.root})`)
      .forEach((element) => {
        element.toggleAttribute("inert", this.isOpen);
      });

    this.overlayElement.toggleAttribute("inert", !this.isOpen);
    this.logoElement.toggleAttribute("inert", this.isOpen);
  }

  updateState() {
    const { isActive, isLock } = this.stateClasses;

    this.burgerButtonElement.classList.toggle(isActive, this.isOpen);
    this.overlayElement.classList.toggle(isActive, this.isOpen);
    document.documentElement.classList.toggle(isLock, this.isOpen);

    this.burgerButtonElement.setAttribute("aria-expanded", this.isOpen);
    this.burgerButtonElement.setAttribute(
      "aria-label",
      this.isOpen ? "Close menu" : "Open menu",
    );

    this.toggleInert();

    if (this.isOpen) {
      document.addEventListener("keydown", this.onFocusTrap);

      this.overlayElement.addEventListener(
        "transitionend",
        () => {
          const focusableElements = this.getFocusableElements();
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          }
        },
        { once: true },
      );
    } else {
      document.removeEventListener("keydown", this.onFocusTrap);
      this.burgerButtonElement.focus();
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.updateState();
  }

  onFocusTrap = (event) => {
    if (event.key !== "Tab") return;

    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  onKeydown = ({ key }) => {
    if (key === "Escape" && this.isOpen) {
      this.toggle();
    }
  };

  onBurgerButtonClick = () => {
    this.toggle();
  };

  onOverlayClick = ({ target }) => {
    if (!this.overlayWrapperElement.contains(target)) {
      this.toggle();
    }
  };

  onMobileQueryChange = () => {
    if (!this.isMobile() && this.isOpen) {
      this.isOpen = false;
      this.updateState();
    }

    this.initInert();
  };

  bindEvents() {
    document.addEventListener("keydown", this.onKeydown);
    this.burgerButtonElement.addEventListener(
      "click",
      this.onBurgerButtonClick,
    );
    this.overlayElement.addEventListener("click", this.onOverlayClick);
    this.mobileQuery.addEventListener("change", this.onMobileQueryChange);
  }
}

export default Header;