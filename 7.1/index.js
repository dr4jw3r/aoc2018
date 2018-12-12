const fs = require('fs');

class Node {
    constructor (name) {
        this.name = name;
        this.dependecies = [];
        this.isResolved = false;
    }

    addDependency (node) {
        this.dependecies.push(node);
    }

    canResolve () {
        return this.dependecies.length === 0
            ? true
            : this.dependecies.map(d => d.isResolved).indexOf(false) === -1
    }

    setResolved () {
        this.isResolved = true;
    }
}

function createNodes () {
    const nodes = [];

    const file = fs.readFileSync('./input.txt').toString();
    const lines = file.split('\n');
    const pattern = /Step (\w) must be finished before step (\w) can begin/;

    for (const line of lines) {
        const match = pattern.exec(line);
        const nodeName = match[2];
        const dependencyName = match[1];

        let node = nodes.find(n => n.name === nodeName);
        let dependencyNode = nodes.find(n => n.name === dependencyName);

        if (node === undefined) {
            node = new Node(nodeName);
            nodes.push(node);
        }

        if (dependencyNode === undefined) {
            dependencyNode = new Node(dependencyName);
            nodes.push(dependencyNode);
        }

        node.addDependency(dependencyNode);
    }

    return nodes;
}

function init () {
    const nodes = createNodes();
    nodes.sort((a, b) => { return a.name.localeCompare(b.name); });

    let output = '';

    while (nodes.filter(n => !n.isResolved).length > 0) {
        let resolveableNodes = nodes.filter(n => n.canResolve() && !n.isResolved);
        let node = resolveableNodes[0];

        node.setResolved();
        output += node.name;
    }

    console.log(output);
}

// Run
init();