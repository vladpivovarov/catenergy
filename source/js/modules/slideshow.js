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

export default slideshow;