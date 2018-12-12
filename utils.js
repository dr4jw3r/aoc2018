const fs = require('fs');

function readFile (path) {
    const contents = fs.readFileSync(path).toString();
    return contents.split('\n');
}

module.exports = {
    readFile
}