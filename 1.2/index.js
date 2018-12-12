const fs = require('fs');

function readFile (path) {
    const contents = fs.readFileSync(path).toString();
    return contents.split('\n');
}

function init () {
    const lines = readFile('./input.txt');
    let frequency = 0;
    const pattern = /(\d+)/;
    const seenFrequencies = [];
    let duplicateFound = false;
    let iter = 0;

    while (!duplicateFound) {
        console.log('Iter', ++iter, seenFrequencies.length);

        for (const line of lines) {
            let isAdd = line.charAt(0) === '+';
            let value = parseInt(pattern.exec(line)[1]);

            if (isAdd) {
                frequency += value;
            } else {
                frequency -= value;
            }

            if (seenFrequencies.indexOf(frequency) === -1) {
                seenFrequencies.push(frequency);
            } else {
                duplicateFound = true;
                console.log('Found duplicate!', frequency);
                break;
            }
        }
    }
}

init();