import outsideClick from "./outsideClick.js";
export default function initDropdown() {
  const dropdown = document.querySelectorAll("[data-dropdown]");
  function handleClick(event) {
    event.target.classList.add("ativo");
    outsideClick(event.target, () => {
      event.target.classList.remove("ativo");
    });
  }
  dropdown.forEach((elemento) =>
    elemento.addEventListener("click", handleClick)
  );
}
