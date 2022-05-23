const menuRealize = () => {
  console.log("Menu");
  //MENU VARIABLES
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".header");
  const headerBtn = header.querySelector(".header__btn");

  //MENU
  hideMenu();

  headerBtn.addEventListener("click", () => {
    if (header.classList.contains("header_active-js")) {
      hideMenu();
    } else {
      showMenu()
    }
  });

  function hideMenu() {
    header.classList.remove("header_active-js");
    nav.classList.remove("nav_active");
    headerBtn.classList.remove("header__btn_close");
  }

  function showMenu() {
    header.classList.add("header_active-js");
    nav.classList.add("nav_active");
    headerBtn.classList.add("header__btn_close");
  }
}

export default menuRealize;