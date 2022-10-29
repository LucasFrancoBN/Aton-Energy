export default function outsideClick(element, callback) {
  const html = document.documentElement;
  const outside = "data-outside";
  if (!element.hasAttribute(outside)) {
    element.setAttribute(outside, "");
    setTimeout(() => html.addEventListener("click", htmlClick));
  }
  function htmlClick(event) {
    if (
      !element.contains(event.target) ||
      !element.contains(event.target.dataset.dropdown) ||
      element.contains(element)
    ) {
      console.log(element.dataset.dropdown);
      element.removeAttribute(outside);
      html.removeEventListener("click", htmlClick);
      callback();
    }
  }
}
