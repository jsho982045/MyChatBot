let conversation = [
    {"role": "system", "content": "You are a helpful assistant."},
];

function formatMessage(message) {
    // If the message contains a code block, format it as code
    if (message.startsWith("```") && message.endsWith("```")) {
        let code = message.slice(3, -3);  // Remove the backticks
        return '<pre><code>' + code + '</code></pre>';
    } else {
        return message;
    }
}

function sendMessage() {
    let message = $('#userInput').val();
    if (message.trim() !== '') {  // Prevent sending empty messages
        conversation.push({"role": "user", "content": message});
        $('#chatbox').append('<div class="message user-message"><p>You: ' + message + '</p></div>');
        $('#loading').show();  // Show the loading symbol
        $.ajax({
            url: '/get_response',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({conversation: conversation}),
            success: function(data) {
                console.log(data);  // Log the response from the server
                let formattedMessage = formatMessage(data.message);
                $('#chatbox').append('<div class="message bot-message"><p>>> ' + formattedMessage + '</p></div>');
                conversation.push({"role": "assistant", "content": data.message});
                // Highlight the code in the bot's response
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                });
            },
            error: function(error) {
                console.error(error);  // Log any errors that occur
            },
            complete: function() {
                $('#loading').hide();  // Hide the loading symbol
            }
        });
        $('#userInput').val('');  // Clear the input box
    }
}

// Send the message when the user presses the Enter key
$('#userInput').keypress(function(e) {
    if (e.which == 13) {  // Enter key
        sendMessage();
        return false;  // Prevent form submission
    }
});




