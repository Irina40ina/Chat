
// REST API функции

// =================================   CREATE   ==================================
function createMessageDB(messageData) {
    const messages = JSON.parse(localStorage.getItem('messages'));
    if(messages) {
        messages.push(messageData);
        localStorage.setItem('messages', JSON.stringify(messages));
    } else {
        const array = [];
        array.push(messageData);
        localStorage.setItem('messages', JSON.stringify(array));
    }
}

// =================================   READ   ==================================
function getMessages() {
    let fetchedMes = JSON.parse(localStorage.getItem('messages'));
    if(fetchedMes === null) {
        fetchedMes = [];
    } 
    return fetchedMes;
}

// =================================   UPDATE   ==================================



// =================================   DELETE   ==================================
