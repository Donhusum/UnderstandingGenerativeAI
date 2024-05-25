let i = 0;

const gameQuestions = [
    "You are looking for the hottest new shoes on the market based on your region. You are based in the EU. What shoes should you choose?",
    "You are writing a report about the movie business. You are looking for the highest grossing film of 2023. What is the movie?",
    "You want to make some traditional danish cookies. What cookies are you making?"
]
const answers = [
    "adidas",
    "barbie",
    "vaniljekranse"
]

let messages = [[],[],[]];

let textContainer = document.getElementById('textContainers')
textContainer.className = 'text-container';

let gameQuestion = document.getElementById("questions");

gameQuestion.textContent = gameQuestions[0];


let nextQ = document.getElementById("next");
let previousQ = document.getElementById("previous");

nextQ.onclick = () => {
    if (i<2){
        i++
        textContainer.replaceChildren();
        for (let b of messages[i]){
            updateTextArea(b)
        }
    }
    gameQuestion.textContent = gameQuestions[i];
    console.log(messages)
}

previousQ.onclick = () => {
    if (i>0){
        i--
        textContainer.replaceChildren();
        for (let b of messages[i]){
            updateTextArea(b)
        }
    }
    gameQuestion.textContent = gameQuestions[i];
}

let answerButton = document.getElementById("answer");
let answerBox = document.getElementById("answerInput");
answerButton.onclick = ()=>{
    if (answerBox.value.toLowerCase() == answers[i].toLowerCase()){
        answerButton.textContent = "Correct";
        answerButton.style.backgroundColor = "green"
    } else {
        answerButton.textContent = "Incorrect";
        answerButton.style.backgroundColor = "red"
    }
    setTimeout(()=>{
        answerButton.textContent = "Submit"
        answerButton.style.backgroundColor = "white"
    }, 2000)
}


let userInput = document.getElementById('userInput')
console.log(userInput)


document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    console.log("User input: " + userInput.value)
    if (userInput.value == "") return;
    let userMessage = {text: userInput.value, user: "user"}
    messages[i].push(userMessage)
    updateTextArea(userMessage)

    let datasets = []

    $('#data1').is(':checked') ? datasets.push(true) : datasets.push(false);
    $('#data2').is(':checked') ? datasets.push(true) : datasets.push(false);
    $('#data3').is(':checked') ? datasets.push(true) : datasets.push(false);
    $('#data4').is(':checked') ? datasets.push(true) : datasets.push(false);

    const formData = {prompt: userInput.value, dataset: datasets}
    console.log(formData)

    fetch('/chat', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(formData)
    })
        .then(res => res.json())
        .then(res => {
            console.log(res.message)
            messages[i].push(res.message);
            updateTextArea(res.message)
        });

})

function updateTextArea(message){
    let bubble = document.createElement('div')
    if (message.user == 'user'){
        bubble.className = 'bubble-user'
    } else if (message.user == 'AI'){
        bubble.className = 'bubble-ai'
    }
    let text = document.createElement('span')
    text.textContent = message.text;
    bubble.appendChild(text);
    bubble.appendChild(document.createElement('br'));
    textContainer.appendChild(bubble);
    bubble.scrollIntoView()
}
