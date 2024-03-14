// Инициализация родительского узла и элемента, который меняем
let head = document.querySelector('.head');
let headTitle = document.querySelector('.head__title')
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




// Получть wrapperContainer чтобы монтировать в него messageContainer
let wraperMessage = document.querySelector('.wraper__message');

function createMessage(content) {
    // 1) Создать messageContainer
    let messageContainer = document.createElement('div');
    messageContainer.classList.add('message_container');

    // 2) Создать саму сушность сообщения
    let message = document.createElement('div');
    message.classList.add('message');

    // 3) Добавление текста в сообщение
    message.innerHTML = content;

    // 4) Добавить в messageContainer message
    messageContainer.appendChild(message);

    // 5) Монтируем контейнер сообщения в wrapperMessage
    wraperMessage.appendChild(messageContainer);
}


let message = '';
let messageInput = document.querySelector ('.message__input');
messageInput.addEventListener('input', (event) => {
    message = event.target.value;
})

const btnSend = document.querySelector('.btn__send');
btnSend.addEventListener('click', () => {
    if (message !== '') {
    createMessage(message);
    messageInput.value = '';} 
    else {
        console.log("Сообщение пустое");
    }
})

