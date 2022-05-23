import checkJs from "./modules/checkJs";
import slideshow from "./modules/slideshow";
import mapRealize from "./modules/map";
import menuRealize from "./modules/menu";
import formRealize from "./modules/form";

checkJs();


//Проверить на какой мы странице и запустить соответствующие функции

const checkURI = () => {
  const URI = document.documentURI;

  if (URI.includes('catalog')) {
    mapRealize();
    menuRealize();
  } else if (URI.includes('form')) {
    mapRealize();
    menuRealize();
    formRealize();
  } else {
    slideshow();
    mapRealize();
    menuRealize();
  }
}

checkURI();