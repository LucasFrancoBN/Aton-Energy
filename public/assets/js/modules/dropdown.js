import outsideClick from "./outsideClick.js";

export default class DropDownMenu {
  constructor(dropdownMenus, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);
    this.activeClass = "ativo";
    if (events === undefined) this.events = ["click"];
    else this.events = events;

    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
  }

  activeDropdownMenu(event) {
    const element = event.currentTarget;
    if (
      !(
        element === this.dropdownMenus[1] &&
        window.matchMedia("(max-width: 675px")
      )
    ) {
      element.classList.add(this.activeClass);
      outsideClick(element, this.events, () => {
        element.classList.remove(this.activeClass);
      });
    }
  }

  addDropdownMenusEvent() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropdownMenu);
      });
    });
  }

  init() {
    if (this.dropdownMenus.length) {
      this.addDropdownMenusEvent();
    }
    return this;
  }
}
