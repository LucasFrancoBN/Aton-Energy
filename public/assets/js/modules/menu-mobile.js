import outsideClick from "./outsideClick.js";

export default class MenuMobile {
  constructor(menuBtn, menuList, events) {
    this.menuButton = document.querySelector(menuBtn);
    this.menuList = document.querySelector(menuList);
    if (events === undefined) this.events = ["touchstart", "click"];
    else this.events = events;
    this.activeClass = "ativo";

    this.openMenu = this.openMenu.bind(this);
  }

  openMenu(event) {
    event.preventDefault();
    this.menuList.classList.add(this.activeClass);
    this.menuButton.classList.add(this.activeClass);
    outsideClick(this.menuList, this.events, () => {
      this.menuList.classList.remove(this.activeClass);
      this.menuButton.classList.remove(this.activeClass);
    });
  }

  addOpenMenuEvent() {
    this.events.forEach((event) => {
      this.menuButton.addEventListener(event, this.openMenu);
    });
  }

  init() {
    if (this.menuButton && this.menuList) {
      this.addOpenMenuEvent();
    }
    return this;
  }
}
