const { readFile } = require('../utils');

class Claim {
    constructor (id, left, top, width, height) {
        this.id = parseInt(id);
        this.left = parseInt(left);
        this.top = parseInt(top);
        this.width = parseInt(width);
        this.height = parseInt(height);
    }
}

function createClaims (lines) {
    const claims = [];
    const pattern = /#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/;

    for (const line of lines) {
        const result = pattern.exec(line);
        claims.push(new Claim(result[1], result[2], result[3], result[4], result[5]));
    }

    return claims;
}

function calculateMatrix (claims) {
    const matrix = [];
    let overlappingInches = 0;

    for (const claim of claims) {
        for (let i = claim.left; i < claim.left + claim.width; i++) {
            for(let j = claim.top; j < claim.top + claim.height; j++) {
                if (matrix[j] === undefined) {
                    matrix[j] = [];
                }

                if (matrix[j][i] === undefined) {
                    matrix[j][i] = claim.id;
                } else if (matrix[j][i] === 'X') {
                    continue;
                } else {
                    matrix[j][i] = 'X';
                    overlappingInches++;
                }
            }
        }
    }

    return { matrix, overlappingInches };
}

function init () {
    const lines = readFile('./input.txt');
    const claims = createClaims(lines);
    const result = calculateMatrix(claims);

    console.log('======================');
    console.log(result.overlappingInches);
}

init();