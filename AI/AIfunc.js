const getPythonPath = require('./PyPath');
exports.askAI = (res, question, selectedDataset, callback) => {


    console.log("AskAI called...")
    const spawn = require("child_process").spawn;

    //Path to your python exe

    const pythonExePath = "C:/Users/stefa/AppData/Local/Programs/Python/Python312/python.exe";

    //const pythonExePath = getPythonPath();
    //Path to python script, Might need absolut path
    const AIPath = "./../../AI/AIScript.py";

    const ask = spawn(pythonExePath, [AIPath, question, selectedDataset]);

    let ans;

    ask.stdout.on('data', (data) => {
        console.log(data.toString()); // Shows the answer in the terminal
        console.log("AskAI done...")
        ans = data.toString();
        callback(res, ans);
    })
    // Handle error output from the Python script
    ask.stderr.on('data', (data) => {
        console.error(`Error from Python: ${data}`);
    });
}
