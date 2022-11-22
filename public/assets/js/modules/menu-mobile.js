import outsideClick from "./outsideClick.js";
export default function initMenuMobile() {
  const menuButton = document.querySelector("[data-mobile='button']");
  const menuList = document.querySelector("[data-mobile='list']");
  function handleClick(event) {
    event.target.classList.add("ativo");
    menuList.classList.add("ativo");
    outsideClick(menuList, () => {
      event.target.classList.remove("ativo");
      menuList.classList.remove("ativo");
    });
  }
  menuButton.addEventListener("click", handleClick);
}
