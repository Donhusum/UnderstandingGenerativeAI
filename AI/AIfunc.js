const PyPath = require('./PyPath');
const Cont = require("../web/controllers/chatController");


let resGlobal;

exports.askAI = (res, question, selectedDataset) => {


    console.log("AskAI called...")
    resGlobal = res;

    sendDataToPython(question + "\n" + selectedDataset)

    console.log("AskAI done...")

}
const spawn = require("child_process").spawn;
//Path to your python exe

//const pythonExePath = "C:/Users/stefa/AppData/Local/Microsoft/WindowsApps/python.exe"
const pythonExePath = "C:/Users/stefa/AppData/Local/Programs/Python/Python312/python.exe";
//Path to python script, Might need absolut path
//const pythonExePath = getPythonPath();
const AIPath = "./../../AI/AIScript.py";

const ask = spawn(pythonExePath, [AIPath]);
ask.stdout.on('data', (data) => {
    console.log(data.toString()); // Shows the answer in the terminal

    let ans = data.toString();
    Cont.addAnswerAndSend(resGlobal, ans);
})
// Handle error output from the Python script
ask.stderr.on('data', (data) => {
    console.error(`Error from Python: ${data}`);
});
function sendDataToPython(data) {
    ask.stdin.write(`${data}\n`);
    console.log("Done sending")
}


