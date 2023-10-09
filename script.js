const chatLog = document.getElementById('chat-log'),
    userInput = document.getElementById('user-input'),
    sendButton = document.getElementById('send-button'),
    buttonIcon = document.getElementById('button-icon'),
    info = document.querySelector('.info');

if (chatLog && userInput && sendButton && buttonIcon && info) {
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') {
            return;
        }
        appendMessage('user', message);
        userInput.value = '';

        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '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',
                'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
            },
            body: `{"messages":[{"role":"user","content":"${message}"}]}`
        };

        fetch('https://chatgpt53.p.rapidapi.com/', options)
        .then((response) => response.json())
        .then((response) => {
            appendMessage('bot', response.choices[0].message.content);
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        })
        .catch((err) => {
            if (err.name === 'TypeError') {
                appendMessage('bot', 'Error : Check Your Api Key!');
                buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
                buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
            }
        });
    }

    function appendMessage(sender, message) {
        info.style.display = "none";

        const messageElement = document.createElement('div');
        const iconElement = document.createElement('div');
        const chatElement = document.createElement('div');
        const icon = document.createElement('i');

        chatElement.classList.add("chat-box");
        iconElement.classList.add("icon");
        messageElement.classList.add(sender);
        messageElement.innerText = message;

        if (sender === 'user') {
            icon.classList.add('fa-regular', 'fa-user');
            iconElement.setAttribute('id', 'user-icon');
        } else {
            icon.classList.add('fa-solid', 'fa-robot');
            iconElement.setAttribute('id', 'bot-icon');
        }

        iconElement.appendChild(icon);
        chatElement.appendChild(iconElement);
        chatElement.appendChild(messageElement);
        chatLog.appendChild(chatElement);

        chatLog.scrollTop = chatLog.scrollHeight;
    }
}
