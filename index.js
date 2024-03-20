// Инициализация родительского узла и элемента, который меняем
let head = document.querySelector('.head');
let headTitle = document.querySelector('.head__title');


// ==========================   Mouse Move   ===============================
document.addEventListener('mousemove', (event) => {
    document.body.style.cssText += `--screen-x: ${event.pageX}px`;
    document.body.style.cssText += `--screen-y: ${event.pageY}px`;
});

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    const contextMenu = document.querySelector('.context-menu');
    contextMenu.style.display = 'block';
    contextMenu.style.top = '300px';
    contextMenu.style.left = '300px';
});

// Создаю функцию
function replaceTitle(content) {
    //Создаю новый элемент 
    let newTitle = document.createElement('h1');
    newTitle.innerHTML = content;
    // Накидываю стили на новый заголовок
    newTitle.classList.add('head__title');
    // Функция замены
    head.replaceChild(newTitle, headTitle);
}

// Вызов функции
replaceTitle('Чат поддержки для IT');

// Шаблон обекта сообщения
const messageData = {
    id: null,
    content: null,
    fromId: null
}


// Получть wrapperContainer чтобы монтировать в него messageContainer
let wraperMessage = document.querySelector('.wraper__message');

// Создание сообщения (ПРЕДСТАВЛЕНИЕ)
function createMessageView(content, id) {
    // 1) Создать messageContainer
    let messageContainer = document.createElement('div');
    messageContainer.classList.add('message_container');

    // 2) Создать саму сушность сообщения
    let message = document.createElement('div');
    message.classList.add('message');

    // 3) Добавление текста в сообщение
    message.innerHTML = content;

    // 4) Добавление ID для сообщения
    message.id = id;

    // 5) Добавить в messageContainer message
    messageContainer.appendChild(message);

    // 6) Монтируем контейнер сообщения в wrapperMessage
    wraperMessage.appendChild(messageContainer);
}

function mountedMessages() {
    let featchedArray = getMessages();
    for(let i=0; i < featchedArray.length; i++) {
        let currentMessage = featchedArray[i];
        createMessageView(currentMessage.content);
    } 
    
}
mountedMessages();

// Заполнение объекта нового сообщения
function filledMessageData(id, content, fromId) {
    messageData.id = id;
    messageData.content = content;
    messageData.fromId = fromId;
}

const myId = 33566;
let message = '';
let messageInput = document.querySelector('.message__input');
messageInput.addEventListener('input', (event) => {
    message = event.target.value;
});

// Инициирует создание нового сообщения
const btnSend = document.querySelector('.btn__send');
btnSend.addEventListener('click', () => {
    if (message !== '') {
        filledMessageData(Date.now(), message, myId);
        createMessageDB(messageData);
        createMessageView(message, messageData.id);
        messageInput.value = '';
        message = '';
        messageData.content = null;
        messageData.fromId = null;
        messageData.id = null;
    }
    else {
        console.log("Сообщение пустое");
    }
});

// Сообщение отправляется при нажатии на Enter
document.addEventListener('keydown', enterSend);
function enterSend(event) {
    if (event.key == "Enter") {
        if (message !== '') {
            filledMessageData(Date.now(), message, myId);
            createMessageDB(messageData);
            createMessageView(message);
            messageInput.value = '';
            message = '';
            messageData.content = null;
            messageData.fromId = null;
            messageData.id = null;
        }
        else {
            console.log("Сообщение пустое");
        }
    }
}

