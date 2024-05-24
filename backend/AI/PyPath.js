const { exec } = require('child_process');
const os = require('os');

function PyPath() {
    const command = os.platform() === 'win32' ? 'where python' : 'which python';

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`Python executable path: ${stdout.trim()}`);
    });
}

PyPath();
module.exports = PyPath;