
// REST API функции

// =================================   CREATE   ==================================
function createMessageDB(messageData) {
    const messages = JSON.parse(localStorage.getItem('messages'));
    if (Array.isArray(messages)) {
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
    if (fetchedMes === null) {
        fetchedMes = [];
    }
    return fetchedMes;
}

// =================================   UPDATE   ==================================
function updateMessage(id, content) {
    let fetchedMes = getMessages();
    // 1-ый Способ
    fetchedMes = fetchedMes.map((element) => {
        if (element.id == id) {
            element.content = content;
            return element;
        }
        return element;
    });
    localStorage.setItem('messages', JSON.stringify(fetchedMes));

    // 2-ой Способ
}

// =================================   DELETE   ==================================

