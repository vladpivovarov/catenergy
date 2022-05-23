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

    const scrollTo = (input) => {
      seamless.scrollIntoView(input, {
        behavior: "smooth",
        block: "center"
      });
    }

    function validateE(email) {
      const emailBlock = form.querySelector("[name=email]");
      const emailRegexp = new RegExp(
        /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
      )

      if (emailRegexp.test(email) == false) {
        scrollTo(emailBlock);
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
        scrollTo(telBlock);
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
        scrollTo(nameBlock);
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
        scrollTo(weightBlock);
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

export default formRealize;