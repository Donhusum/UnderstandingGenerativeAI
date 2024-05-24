let i = 0;

const gameQuestions = [
    "You are looking for the hottest new shoes on the market based on your region. You are based in the EU. What shoes should you choose?",
    "You are writing a report about the movie business. You are looking for the highest grossing film of 2023. What is the movie?",
    "You want to make some traditional danish cookies. What cookies are you making?"
]

let messages = [];

let textContainer = document.getElementById('textContainers')
textContainer.className = 'text-container';

let gameQuestion = document.getElementById("questions");

gameQuestion.textContent = gameQuestions[0];


let nextQ = document.getElementById("next");
let previousQ = document.getElementById("previous");

nextQ.onclick = () => {
    if (i<2){i++}
    gameQuestion.textContent = gameQuestions[i];
    console.log(messages)
}

previousQ.onclick = () => {
    if (i>0){i--}
    gameQuestion.textContent = gameQuestions[i];
}


let userInput = document.getElementById('userInput')
console.log(userInput)


document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    console.log(userInput.value)
    messages.push({text: userInput.value, user: "user"})
    updateTextArea(messages[messages.length-1])

    let datasets = []

    $('#data1').is(':checked') ? datasets.push(true) : datasets.push(false);
    $('#data2').is(':checked') ? datasets.push(true) : datasets.push(false);
    $('#data3').is(':checked') ? datasets.push(true) : datasets.push(false);
    $('#data4').is(':checked') ? datasets.push(true) : datasets.push(false);

    console.log(datasets)


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
            console.log(res.messages)
            messages = res.messages;
            updateTextArea(messages[messages.length-1])
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


//.scrollIntoView()