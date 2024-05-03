
exports.askAI = (question, selectedDataset) => {

    console.log("AskAI called...")
    const spawn = require("child_process").spawn;

    //Path to your python exe
    const pythonExePath = "C:/Users/stefa/AppData/Local/Programs/Python/Python312/python.exe";
    //Path to python script, Might need absolut path
    const AIPath = "C:/Ting/Projects/UnderstandingGenerativeAI/backend/AI/DummyAI.py";

    const ask = spawn(pythonExePath,[AIPath, question, selectedDataset] );

    let answer;

    ask.stdout.on('data', (data) => {
        console.log(data.toString()); // Shows the answer in the terminal
        answer = data.toString()
    } )
    console.log("AskAI done...")

    return answer;



}

