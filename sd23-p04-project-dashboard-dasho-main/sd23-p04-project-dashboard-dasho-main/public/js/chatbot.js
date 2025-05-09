const input = document.querySelector('.form-control');
const addBtn = document.querySelector('.add-btn');
const listContainer = document.querySelector('.input-field');

function toggleButtonState() {
    const text = input.value;
    if (text.length !== 0) {
        addBtn.classList.remove("disabled");
    } else {
        addBtn.classList.add("disabled");
    }
}

input.addEventListener("input", toggleButtonState);

function addChatMessage(userInput, answerText) {
    const userHtml = `
    <div class="container-fluid d-flex justify-content-end flex-row user-input mb-1 align-items-center">
    <p class="p-2 bg-warning text-white message-back">${userInput}</p>
    <i class="bi bi-person-circle ms-2 bg-warning text-white rounded px-1"></i>
    </div>
      `;
    const answerHtml = `
    <div class="container-fluid d-flex justify-content-start flex-row robot mb-3 align-items-start">
    <i class="bi bi-robot me-2 bg-primary text-white rounded px-1"></i>
    <p class="p-2 bg-primary text-white message">${answerText}</p>
    </div>
      `;
    return userHtml + answerHtml;
}

function generateAnswer(userInput) {
    let answer;

    // Check user input and provide corresponding answers
    if (
        userInput.toLowerCase().includes("hello") ||
        userInput.toLowerCase().includes("hi")
    ) {
        answer = "Hello! How can I assist you today?";
    } else if (userInput.toLowerCase().includes("how are you")) {
        answer = "I'm just a bot, but thanks for asking!";
    } else if (userInput.toLowerCase().includes("help")) {
        answer = "Sure, I'll be happy to help. What do you need assistance with?";
    } else if (userInput.toLowerCase().includes("dashboard")) {
        answer = `Which dashboard are you lookin for? I can navigate you to these three: <br> <a href="#" class="text-decoration-none text-white fw-bold px-2 py-1 bg-warning rounded mt-1">Latif</a> <a href="#" class="text-decoration-none text-white fw-bold px-2 py-1 bg-warning rounded mt-1">Jordy</a> <a href="#" class="text-decoration-none text-white fw-bold px-2 py-1 bg-warning rounded mx-1 mt-1">Brandon</a> <a href="#" class="text-decoration-none text-white fw-bold px-2 py-1 bg-warning rounded mt-1">Rowesh</a>`;
    } else if (userInput.toLowerCase().includes("thanks") || userInput.toLowerCase().includes("thank you")) {
        answer = `Always here if you need anything.<a href="#" class="text-decoration-none text-white fw-bold px-2 py-1 bg-warning rounded ms-1">Go home</a>`;
    } else {
        answer = "I'm sorry, I didn't understand that. Can you please rephrase?";
    }

    return answer;
}

addBtn.addEventListener("click", function () {
    const userInput = input.value;
    // You would replace this with the actual answer from the chatbot
    const answerText = generateAnswer(userInput);

    const html = addChatMessage(userInput, answerText);

    // Append the user and answer messages to the chat messages container
    listContainer.insertAdjacentHTML("beforeend", html);

    // Clear the input field
    input.value = "";
    toggleButtonState();
});