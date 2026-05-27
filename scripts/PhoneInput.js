class PhoneInput {
  selectors = {
    root: "[data-js-phone-input]",
  };

  constructor() {
    this.inputElement = document.querySelector(this.selectors.root);

    if (!this.inputElement) return;

    this.init();
  }

  init() {
    window.intlTelInput(this.inputElement, {
      initialCountry: "in",
      strictMode: true,
      loadUtils: () =>
        import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js"),
    });
  }
}

new PhoneInput();
