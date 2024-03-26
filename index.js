// Инициализация родительского узла и элемента, который меняем
let head = document.querySelector(".head");
let headTitle = document.querySelector(".head__title");

// ТУТ Я РЕШИЛ ПРОБЛЕМУ
let screenX = 0;
let screenY = 0;

// ==========================   Mouse Move   ===============================
document.addEventListener("mousemove", (event) => {
  screenX = event.pageX;
  screenY = event.pageY;
});

// Создаю функцию
function replaceTitle(content) {
  //Создаю новый элемент
  let newTitle = document.createElement("h1");
  newTitle.innerHTML = content;
  // Накидываю стили на новый заголовок
  newTitle.classList.add("head__title");
  // Функция замены
  head.replaceChild(newTitle, headTitle);
}

// Вызов функции
replaceTitle("Чат поддержки для IT");

// Шаблон обекта сообщения
const messageData = {
  id: null,
  content: null,
  fromId: null,
};

// Получть wrapperContainer чтобы монтировать в него messageContainer
let wraperMessage = document.querySelector(".wraper__message");

// Создание сообщения (ПРЕДСТАВЛЕНИЕ)
function createMessageView(content, id) {
  // 1) Создать messageContainer
  let messageContainer = document.createElement("div");
  messageContainer.classList.add("message_container");

  // 2) Создать саму сушность сообщения
  let message = document.createElement("div");
  message.classList.add("message");

  // 3) Добавление текста в сообщение
  message.innerHTML = content;

  // 4) Добавление ID для сообщения
  message.id = id;

  // 5) Добавить в messageContainer message
  messageContainer.appendChild(message);

  // 6) Монтируем контейнер сообщения в wrapperMessage
  wraperMessage.appendChild(messageContainer);
}

let mode = "default";

function mountedMessages() {
  let featchedArray = getMessages();
  for (let i = 0; i < featchedArray.length; i++) {
    let currentMessage = featchedArray[i];
    createMessageView(currentMessage.content, currentMessage.id);

    const presentMessages = document.getElementById(currentMessage.id + "");
    presentMessages.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      const contextMenu = document.querySelector(".context-menu");
      contextMenu.style.display = "block";
      contextMenu.style.top = screenY + "px";
      contextMenu.style.left = screenX + "px";
      let presentMessage = document.getElementById(event.target.id);
      console.log(presentMessage);

      messageId = event.target.id;
      // console.log(messageId);

      const contextMenuBtn = document.querySelector(".context-menu__btn");
      contextMenuBtn.addEventListener("click", (event) => {
        messageInput.value = presentMessage.innerHTML;
        const editTitle = document.querySelector('.edit-title');
        editTitle.style.display = 'block';
      });

    });
  }
  let mode = "edit";
}

mountedMessages();

// Заполнение объекта нового сообщения
function filledMessageData(id, content, fromId) {
  messageData.id = id;
  messageData.content = content;
  messageData.fromId = fromId;
}

const myId = 33566;
let message = "";
let messageInput = document.querySelector(".message__input");
messageInput.addEventListener("input", (event) => {
  message = event.target.value;
});

// Инициирует создание нового сообщения
const btnSend = document.querySelector(".btn__send");
const btnEdit = document.querySelector(".context-menu__btn");

console.log(btnSend);

let messageId = null;

btnEdit.addEventListener("click", () => {
  mode = "edit";
  document.querySelector(".context-menu").style.display = "none";
});

btnSend.addEventListener("click", () => {
  console.log(mode);
  if (mode === "default") {
    if (message !== "") {
      filledMessageData(Date.now(), message, myId);
      createMessageDB(messageData);
      createMessageView(message, messageData.id);
      messageInput.value = "";
      message = "";
      messageData.content = null;
      messageData.fromId = null;
      messageData.id = null;
    } else {
      console.log("Сообщение пустое");
    }
  } else if (mode === "edit") {
    if (message == "") {
      return;
    }

    let newMes = document.getElementById(messageId);
    newMes.textContent = message;
    mode = "default";
  }
});

// Сообщение отправляется при нажатии на Enter
// document.addEventListener("keydown", enterSend);
// function enterSend(event) {
//   if (event.key == "Enter") {
//     if (message !== "") {
//       filledMessageData(Date.now(), message, myId);
//       createMessageDB(messageData);
//       createMessageView(message);
//       messageInput.value = "";
//       message = "";
//       messageData.content = null;
//       messageData.fromId = null;
//       messageData.id = null;
//     } else {
//       console.log("Сообщение пустое");
//     }
//   }
// }    
