// Здесь может быть ваша логика (обработка формы, анимации, взаимодействие с API и т.д.)
// Для примера добавим простой обработчик формы:

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".contact-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = form.querySelector("#name").value;
        const phone = form.querySelector("#phone").value;
        const message = form.querySelector("#message").value;
  
        // Пример простой имитации отправки
        alert(`Спасибо, ${name}! Ваша заявка принята.\nТелефон: ${phone}\nСообщение: ${message}`);
        form.reset();
      });
    }
  });
