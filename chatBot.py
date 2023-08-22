from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
import openai
import os

# Load the OpenAI API key from the environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    conversation = request.json['conversation']

    # Call the OpenAI API
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=conversation
    )

    # Get the assistant's message from the response
    assistant_message = response['choices'][0]['message']['content']

    return jsonify({"message": assistant_message})

if __name__ == '__main__':
    app.run(port=5000, debug=True)






