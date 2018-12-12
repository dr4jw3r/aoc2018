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

function compareBoxes (box1, box2) {
    let differences = 0;
    let index = -1;

    for (let i = 0; i < box1.serialSplit.length; i++) {
        const letter = box1.serialSplit[i];
        if (letter !== box2.serialSplit[i]) {
            index = i;
            differences++;

            if (differences > 1) {
                return null;
            }
        }
    }

    return { box1, box2, index };
}

function init () {
    const lines = readFile('./input.txt');
    const boxes = [];

    for (const line of lines) {
        boxes.push(new Box(line.trim()));
    }

    let brk = false;
    const twoBoxes = boxes.filter(b => b.hasTwo());
    const threeBoxes = boxes.filter(b => b.hasThree());

    const concatenated = twoBoxes.concat(threeBoxes);

    for (const box of concatenated) {
        if (brk) {
            break;
        }

        for (const box2 of concatenated) {
            if (box === box2) {
                continue;
            } else {
                let result = compareBoxes(box, box2);

                if (result != null) {
                    console.log(result.box1.serial);
                    console.log(result.box1.serial.slice(0, result.index) + result.box1.serial.slice(result.index + 1));
                    brk = true;
                    break;
                }
            }
        }
    }
}

init();