import React from "react";
import express from "express";
import socket from "socket.io";

const Menu = () => (
  <>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto">itProger</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="#">
          Главная
        </a>
        <a class="p-2 text-dark" href="#">
          Про нас
        </a>
        <a class="p-2 text-dark" href="#">
          Поддержка
        </a>
        <a class="p-2 text-dark" href="#">
          Цены
        </a>
      </nav>
      <a class="btn btn-outline-primary" href="#">
        Регистрация
      </a>
    </div>
  </>
);

const MainContent = () => (
  <>
    <div class="container">
      <div class="py-5 text-center">
        <h2>Чат программа</h2>
        <p class="lead">Укажите ваше имя и начинайте переписку</p>
      </div>
      <div class="row">
        <div class="col-6">
          <h3>Форма сообщений</h3>
          <form id="messForm">
            <label for="name">Имя</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Введите имя"
              class="form-control"
            />
            <label for="message">Сообщение</label>
            <textarea
              name="message"
              id="message"
              class="form-control"
              placeholder="Введите сообщение"
            ></textarea>
            <input type="submit" value="Отправить" class="btn btn-danger" />
          </form>
        </div>
        <div class="col-6">
          <h3>Сообщения</h3>
          <div id="all_mess"></div>
        </div>
      </div>
    </div>
  </>
);

let users = [];
let connections = [];
socket.sockets.on("connection", function (socket) {
  console.log("done");
  connections.push(socket);

  socket.on("disconnect", function (data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("by");
  });
});

export { Menu, MainContent };
