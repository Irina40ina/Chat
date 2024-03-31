
// ==========================   DATA   ===============================
// Инициализация родительского узла и элемента, который меняем
let head = document.querySelector(".head_title__box");
let headTitle = document.querySelector(".head__title");
// Получть wrapperContainer чтобы монтировать в него messageContainer
let wraperMessage = document.querySelector(".wraper__message");
let messageInput = document.querySelector(".message__input");
const btnSend = document.querySelector(".btn__send");
const editBtn = document.querySelector(".context-menu__btn");
const deleteBtn = document.querySelector('.context-menu_delete__btn');
const editTitle = document.querySelector('.edit-title');
const deleteWindow = document.querySelector('.delete-window');
const deleteBtnYes = document.querySelector('.delete-window__yes');
const deleteBtnNo = document.querySelector('.delete-window__no');
const searchBtn = document.querySelector('.search-btn');
const searchInputPanel = document.querySelector('.search__input-panel');
let filterArray = getMessages();
let presentMessages = {};
let selectedMessage = {};
let screenX = 0;
let screenY = 0;
let mode = "default";
let inputMode = 'create';
let messageId = null;
// Шаблон обекта сообщения
const messageData = {
  id: null,
  content: null,
  fromId: null,
};
let searchMessageInput = document.querySelector('.search__message-input');
// console.log(textSearch);
const myId = 33566;
let message = "";
let messageForSearch = '';

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

function filterItems(word, array) {
  return array.filter(message => {
    const regex = new RegExp(word, 'gi');
    return message.content.match(regex);
  })
}

  function displaySearchingMessages() {

    let searchingArray = filterItems(messageForSearch, filterArray);
    for (let i = 0; i < searchingArray.length; i++) {
      let searchingMassegesView = searchingArray[i];
      createMessageView(searchingMassegesView.content, searchingMassegesView.id);
    };
  };


function mountedMessages() {
  let featchedArray = getMessages();
  for (let i = 0; i < featchedArray.length; i++) {
    let currentMessage = featchedArray[i];
    createMessageView(currentMessage.content, currentMessage.id);
    presentMessages = document.getElementById(currentMessage.id + "");
    
    
    presentMessages.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      setPositionContextMenu();
      selectedMessage = document.getElementById(event.target.id);
      messageId = event.target.id;
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
    console.log(messageData);
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
  // updateMessage(messageId, message); 1-й способ
  filledMessageData(messageId, message, myId);
  updateMessage(messageId, messageData);
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


searchMessageInput.addEventListener("input", (event) => {
  messageForSearch = event.target.value;
  if(inputMode === 'create'){
  mountedMessages();
} else if(inputMode === 'correct'){
  // -------------------------??????????
  presentMessages.style.display = 'none';
  displaySearchingMessages();
}
});

  editBtn.addEventListener("click", () => {
    mode = "edit";
    document.querySelector(".context-menu").style.display = "none";
    messageInput.value = selectedMessage.innerHTML;
    editTitle.style.display = 'block';
  });

btnSend.addEventListener("click", () => {
  if (mode === 'default') {
    handlerDefaultMode();
  } else if (mode === "edit") {
    handlerEditMode();
  }
});
deleteBtn.addEventListener('click', () => {
  deleteWindow.style.display = 'flex';
  document.querySelector(".context-menu").style.display = "none";
});

deleteBtnYes.addEventListener('click', () => {
  deleteMessage(messageId);
  selectedMessage.remove();
  deleteWindow.style.display = 'none';
  messageInput.value = "";
  message = '';
});


deleteBtnNo.addEventListener('click', () => {
  deleteWindow.style.display = 'none';
});

searchBtn.addEventListener('click', () => {
  searchInputPanel.style.display = 'block';
  inputMode = 'correct';
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