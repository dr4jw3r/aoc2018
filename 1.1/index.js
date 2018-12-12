const fs = require('fs');

function readFile (path) {
    const contents = fs.readFileSync(path).toString();
    return contents.split('\n');

}

function init () {
    const lines = readFile('./input.txt');
    let frequency = 0;
    const pattern = /(\d+)/;

    for (const line of lines) {
        let isAdd = line.charAt(0) === '+';
        let value = pattern.exec(line);

        if (isAdd) {
            frequency += parseInt(value[1]);
        } else {
            frequency -= parseInt(value[1]);
        }
    }

    console.log(frequency);
}

init();