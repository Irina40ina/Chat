
// REST API функции
function createMessageDB(messageData) {
    const messages = JSON.parse(localStorage.getItem('messages'));
    if(messages) {
        messages.push(messageData);
    } else {
        localStorage.setItem('message', '[]');
    }
}
