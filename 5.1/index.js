const { readFile } = require('../utils');

class Material {
    constructor (composition) {
        this.composition = composition.split('');
        this.stack = [];
    }

    isUppercase (char) {
        return char === char.toUpperCase();
    }

    isLowercase (char) {
        return char === char.toLowerCase();
    }

    reduce () {
        this.stack.push(this.composition.shift());

        while (this.composition.length > 0) {
            const first = this.stack.pop();
            const second = this.composition.shift();

            if (this.isUppercase(first) && this.isLowercase(second) ||
                this.isLowercase(first) && this.isUppercase(second)) {

                if (first.toLowerCase() === second.toLowerCase()) {
                    if (this.composition.length > 0) {
                        if(this.stack.length == 0){
                            this.stack.push(this.composition.shift());
                        }
                        continue;
                    }
                }
            }

            this.stack.push(first, second);
        }
    }

    getResult () {
        return this.stack.length;
    }
}

function getInput () {
    return readFile('./input.txt')[0].trim();
}

function init () {
    const sample = 'dabAcCaCBAcCcaDA';
    const input = getInput();
    const material = new Material(input);

    material.reduce();

    const answer = material.getResult();
    console.log(answer);
}

init();