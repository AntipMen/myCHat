socket.on("userName", function (userName) {
  console.log("You'r username is => " + userName);
  $("textarea").val(
    $("textarea").val() + "You'r username => " + userName + "\n"
  );
});

$(document).on("click", "button", function () {
  // Прослушка кнопки на клик
  var message = $("input").val(); // Все что в поле для ввода записываем в переменную
  socket.emit("message", message); // Отправляем событие 'message' на сервер c самим текстом (message)- как переменная
  $("input").val(null); // Заполняем поле для ввода 'пустотой'
});

socket.on("messageToClients", function (msg, name) {
  console.log(name + " | => " + msg); // Логгирование в консоль браузера
  $("textarea").val($("textarea").val() + name + " : " + msg + "\n"); // Добавляем в поле для текста сообщение типа (Ник : текст)
});
