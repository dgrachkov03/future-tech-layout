class Header {
  selectors = {
    root: "[data-js-header]",
    overlay: "[data-js-header-overlay]",
    overlayWrapper: "[data-js-header-overlay-wrapper]",
    burgerButton: "[data-js-header-burger-button]",
  };

  stateClasses = {
    isActive: "is-active",
    isLock: "is-lock",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.overlayElement = this.rootElement.querySelector(this.selectors.overlay);
    this.overlayWrapperElement = this.rootElement.querySelector(this.selectors.overlayWrapper);
    this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton);
    this.isOpen = false;

    this.bindEvents();
  }

  onBurgerButtonClick = () => {
    this.toggleMenu();
  };

  onOverlayClick = (event) => {
    if (!this.overlayWrapperElement.contains(event.target)) {
      this.closeMenu();
    }
  };

  onKeydown = (event) => {
    if (event.key === "Escape" && this.isOpen) {
      this.closeMenu();
    }
  };

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.updateMenuState();
  }

  closeMenu() {
    this.isOpen = false;
    this.updateMenuState();
  }

  updateMenuState = () => {
    this.burgerButtonElement.classList.toggle(this.stateClasses.isActive, this.isOpen);
    this.overlayElement.classList.toggle(this.stateClasses.isActive, this.isOpen);
    document.documentElement.classList.toggle(this.stateClasses.isLock, this.isOpen);
  }

  bindEvents() {
    this.burgerButtonElement.addEventListener("click",this.onBurgerButtonClick);
    this.overlayElement.addEventListener("click", this.onOverlayClick);
    document.addEventListener("keydown", this.onKeydown);
  }
}

export default Header;