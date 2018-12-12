const { readFile } = require('../utils');

class Box {
    constructor (serial) {
        this.serial = serial;
        this.serialSplit = this.serial.split('');
    }

    hasTwo () {
        let counts = {};

        for (const letter of this.serialSplit) {
            if (counts.hasOwnProperty(letter)) {
                counts[letter]++;
            } else {
                counts[letter] = 1;
            }
        }

        for (const key of Object.keys(counts)) {
            if (counts[key] === 2) {
                return true;
            }
        }

        return false;
    }

    hasThree () {
        let counts = {};

        for (const letter of this.serialSplit) {
            if (counts.hasOwnProperty(letter)) {
                counts[letter]++;
            } else {
                counts[letter] = 1;
            }
        }

        for (const key of Object.keys(counts)) {
            if (counts[key] === 3) {
                return true;
            }
        }

        return false;
    }
}

function init () {
    const lines = readFile('./input.txt');
    const boxes = [];

    for (const line of lines) {
        boxes.push(new Box(line.trim()));
    }

    const twoBoxes = boxes.filter(b => b.hasTwo());
    const threeBoxes = boxes.filter(b => b.hasThree());

    const checksum = twoBoxes.length * threeBoxes.length;
    console.log(checksum);
}

init();