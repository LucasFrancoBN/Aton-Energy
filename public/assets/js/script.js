import DropDownMenu from "./modules/dropdown.js";
import MenuMobile from "./modules/menu-mobile.js";

const dropdown = new DropDownMenu("[data-dropdown]");
dropdown.init();

const menuMobile = new MenuMobile(
  "[data-mobile='button']",
  "[data-mobile='list']"
);
menuMobile.init();
