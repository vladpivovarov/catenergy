// Проверить, подключился ли js на страницу
document.documentElement.classList.remove("no-js");


const slideshow = () => {
  console.log("Slideshow");
  //SLIDESHOW VARIABLES
  const slider = document.querySelector(".slider");
  const controlBefore = slider.querySelector(".controls__btn_before");
  const controlAfter = slider.querySelector(".controls__btn_after");
  const sliderImgBlock1 = slider.querySelector(".slider__before");
  const sliderImgBlock2 = slider.querySelector(".slider__after");
  const sliderLine = slider.querySelector(".slider__handle");
  const sliderControl = slider.querySelector(".conrols__line");


  //SLIDESHOW WITH HANDLE
  var checkWidth = false;
  if (window.innerWidth >= 768) {
    checkWidth = true;
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      checkWidth = true;
    } else {
      checkWidth = false;
      sliderLine.style = "";
      sliderImgBlock1.style = "";
      sliderImgBlock2.style = "";
    }
  })

  sliderLine.addEventListener("mousedown", function (event) {

    if (!checkWidth) {
      return;
    }

    sliderLine.style.position = 'absolute';
    moveAt(event.pageX);

    // переносит мяч на координаты (pageX, pageY),
    // дополнительно учитывая изначальный сдвиг относительно указателя мыши
    function moveAt(pageX) {
      if (
        pageX >= sliderControl.getBoundingClientRect().left &&
        pageX <= sliderControl.getBoundingClientRect().left + sliderControl.clientWidth
      ) {
        sliderLine.style.left = pageX - sliderControl.getBoundingClientRect().left + 'px';
        sliderLine.style.top = 50 + '%';

        let sliderControlWidth = sliderControl.clientWidth;
        let x = (pageX - sliderControl.getBoundingClientRect().left) * 100 / sliderControlWidth;
        sliderImgBlock1.style.width = x + "%";
        sliderImgBlock2.style.width = 100 - x + "%";
      }
    }

    function onMouseMove(event) {
      moveAt(event.pageX);
    }

    // передвигаем мяч при событии mousemove
    document.addEventListener('mousemove', onMouseMove);

    // отпустить мяч, удалить ненужные обработчики
    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', onMouseMove);
      sliderLine.onmouseup = null;
    });
  });


  //SLIDESHOW BEFORE-AFTER
  controlBefore.addEventListener("click", function () {
    showBefore();
    console.log("controlBefore");
  });

  controlAfter.addEventListener("click", function () {
    showAfter();
  });

  function showBefore() {
    sliderImgBlock2.style.width = 0 + "%";
    sliderImgBlock1.style.width = 100 + "%";
    sliderLine.style.left = 100 + "%";

    if (sliderImgBlock2.classList.contains("slider_show")) {
      sliderImgBlock2.classList.remove("slider_show")
    }
    if (sliderImgBlock1.classList.contains("slider_hide")) {
      sliderImgBlock1.classList.remove("slider_hide")
    }

    sliderImgBlock1.classList.add("slider_show");
    sliderImgBlock2.classList.add("slider_hide");
    sliderLine.style.width = "5%";
  }

  function showAfter() {
    sliderImgBlock1.style.width = 0 + "%";
    sliderImgBlock2.style.width = 100 + "%";
    sliderLine.style.left = 0 + "%";

    if (sliderImgBlock1.classList.contains("slider_show")) {
      sliderImgBlock1.classList.remove("slider_show");
    }
    if (sliderImgBlock2.classList.contains("slider_hide")) {
      sliderImgBlock2.classList.remove("slider_hide");
    }

    sliderImgBlock2.classList.add("slider_show");
    sliderImgBlock1.classList.add("slider_hide");
    sliderLine.style.width = "100%";
  }
}

const mapRealize = () => {
  console.log("Map");
  // CONTACT VARIABLES
  const contactAddress = document.querySelector(".contact__address");
  var placemarkSize = {
    mobile: [52, 53],
    tablet: [98, 106],
    desktop: [98, 106]
  }
  // Стандартно - левый верхний угол изображения -> поэтому сдвигаем его
  var placemarkOffset = {
    mobile: [-27, -53],
    tablet: [-50, -106],
    desktop: [-50, -106]
  }
  var placemarkCurrentSize = placemarkSize.mobile;
  var placemarkCurrentOffset = placemarkOffset.mobile;

  // Яндекс карта
  // https://yandex.ru/dev/maps/jsapi/doc/2.1/quick-start/index.html
  // https://developer.tech.yandex.ru/services/3
  function ready() {
    ymaps.ready(init);

    function init() {
      var myMap = new ymaps.Map("map", {
        center: [59.938635, 30.323118],
        zoom: 19,
        controls: ["zoomControl"],
        behaviors: ["drag"]
      });

      var balloonHtml = contactAddress.innerHTML;

      if (window.innerWidth >= 768 && window.innerWidth < 1370) {
        placemarkCurrentSize = placemarkSize.tablet;
        placemarkCurrentOffset = placemarkOffset.tablet;

      } else if (window.innerWidth >= 1370) {
        placemarkCurrentSize = placemarkSize.desktop;
        placemarkCurrentOffset = placemarkOffset.desktop;
      }

      var placemark = new ymaps.Placemark([59.938635, 30.323118], {
        hintContent: "Cat Energy",
        balloonContent: balloonHtml
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map-pin.png',
        iconImageSize: placemarkCurrentSize,
        iconImageOffset: placemarkCurrentOffset
      });

      myMap.geoObjects.add(placemark);
    }

    // Ищем и удаляем мусор с карты (кроме логотипа и копирайта)
    function delets() {
      let elem = document.querySelector(".ymaps-2-1-79-gototech");

      if (elem) {
        elem.parentNode.removeChild(elem);
        clearInterval(check);
      }
    }

    var check = setInterval(delets, 200);
  }

  document.addEventListener("DOMContentLoaded", ready);
}


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


const formRealize = () => {

  const form = document.querySelector(".selection__form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let sendBool = true;
    const formData = new FormData(form);

    // Проверка валидности
    const name = formData.get("name");
    const email = formData.get("email");
    const tel = formData.get("phone");
    const weight = formData.get("weight");

    function validateE(email) {
      const emailBlock = form.querySelector("[name=email]");
      const emailRegexp = new RegExp(
        /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
      )

      if (emailRegexp.test(email) == false) {
        emailBlock.classList.add("error");
        sendBool = false;
        return false;
      } else {
        sendBool = true;
        emailBlock.classList.remove("error");
      }
    }

    function validateT(tel) {
      const telBlock = form.querySelector("[name=phone]");
      const reg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
      const address = tel;
      if (reg.test(address) == false) {
        telBlock.classList.add("error");
        sendBool = false;
        return false;
      } else {
        sendBool = true;
        telBlock.classList.remove("error");
      }
    }

    function validateN(name) {
      const nameBlock = form.querySelector("[name=name]");
      const names = name;
      if (names == false) {
        nameBlock.classList.add("error");
        sendBool = false;
        return false;
      } else {
        sendBool = true;
        nameBlock.classList.remove("error");
      }
    }


    function validateW(weight) {
      const weights = weight;
      const weightBlock = form.querySelector("[name=weight]");
      if (weights == false) {
        weightBlock.classList.add("error");
        sendBool = false;
        return false;
      } else {
        sendBool = true;
        weightBlock.classList.remove("error");
      }
    }

    validateN(name);
    if (!sendBool) return;
    validateW(weight);
    if (!sendBool) return;
    validateE(email);
    if (!sendBool) return;
    validateT(tel);
    if (!sendBool) return;
    // Если проверка не прошла выходим из функции

    // Отправляем данные на сервер
    fetch('', {
        method: 'POST',
        body: formData
      })
      .then((response) => {
        if (response.status === 400) throw new Error("Данные не отправлены :(");
        if (response.status === 401) throw new Error("Неверные учетные данные :(");
        if (response.status === 403) throw new Error("Доступ запрещен :(");
        if (response.status === 404) throw new Error("Данные потерялись :(");
        if (response.status === 500) throw new Error("Ошибочка на сервере :(");

        return response.json()
      })
      .then((json) => console.log("Пришло с сервера: " + JSON.stringify(json)))
      .catch(error => {
        alert(error.message)
      })
      .finally(form.reset());
  })
}


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


//Тесты из книги CSS
//Изменение пользовательских свойств css

// let rootElement = document.documentElement;
// let styles = getComputedStyle(rootElement);
// let bgColor = styles.getPropertyValue("--bg");
// console.log(bgColor);

// rootElement.style.setProperty("--bg", "orange");
