
// ==========================   DATA   ===============================
// Инициализация родительского узла и элемента, который меняем
let head = document.querySelector(".head");
let headTitle = document.querySelector(".head__title");
// Получть wrapperContainer чтобы монтировать в него messageContainer
let wraperMessage = document.querySelector(".wraper__message");
let messageInput = document.querySelector(".message__input");
const btnSend = document.querySelector(".btn__send");
const editBtn = document.querySelector(".context-menu__btn");
const editTitle = document.querySelector('.edit-title');
let screenX = 0;
let screenY = 0;
let mode = "default";
let messageId = null;
// Шаблон обекта сообщения
const messageData = {
  id: null,
  content: null,
  fromId: null,
};
const myId = 33566;
let message = "";

// =====================================================================



// ==========================   METHODS   ===============================
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

function setPositionContextMenu() {
  const contextMenu = document.querySelector(".context-menu");
  contextMenu.style.display = "block";
  contextMenu.style.top = screenY + "px";
  contextMenu.style.left = screenX + "px";
}

function mountedMessages() {
  let featchedArray = getMessages();
  for (let i = 0; i < featchedArray.length; i++) {
    let currentMessage = featchedArray[i];
    createMessageView(currentMessage.content, currentMessage.id);

    const presentMessages = document.getElementById(currentMessage.id + "");
    presentMessages.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      setPositionContextMenu();
      let selectedMessage = document.getElementById(event.target.id);

      messageId = event.target.id;

      editBtn.addEventListener("click", () => {
        mode = "edit";
        document.querySelector(".context-menu").style.display = "none";
        messageInput.value = selectedMessage.innerHTML;
        editTitle.style.display = 'block';
      });
    });
  }
}

// Заполнение объекта нового сообщения
function filledMessageData(id, content, fromId) {
  messageData.id = id;
  messageData.content = content;
  messageData.fromId = fromId;
}

function handlerDefaultMode() {
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
}

function handlerEditMode() {
  if (message == "") {
    return;
  }
  updateMessage(messageId, message);
  let newMes = document.getElementById(messageId);
  newMes.textContent = message;
  mode = "default";
  messageInput.value = "";
  message = '';
  editTitle.style.display = 'none';
}

// =====================================================================


// ==========================   MOUNTED   ===============================
document.addEventListener("mousemove", (event) => {
  screenX = event.pageX;
  screenY = event.pageY;
});
messageInput.addEventListener("input", (event) => {
  message = event.target.value;
});

btnSend.addEventListener("click", () => {
  if (mode === 'default') {
    handlerDefaultMode();
  } else if (mode === "edit") {
    handlerEditMode();
  }
});

replaceTitle("Чат поддержки для IT");
mountedMessages();

// =====================================================================



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