// const fs = require('fs');

// var readline = require('readline');
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// });

// rl.on('line', function(line){
//     console.log(line);
// })

class WeightedQuickUnionUF {

    constructor(n) {
        this.count = n;
        this.parent = [];
        this.size = [];
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
            this.size[i] = 1;
        }
    }

    find(p) {
        this.validate(p);
        while (p !== this.parent[p]) {
            p = this.parent[p];
        }
        return p;
    }

    validate(p) {
        let n = this.parent.length;
        if (p < 0 || p >= n) {
            throw "index " + p + " is not between 0 and " + (n-1)
        }
    }

    union(p, q) {
        let rootP = this.find(p);
        let rootQ = this.find(q);
        if (rootP === rootQ) return;

        if (this.size[rootP] < this.size[rootQ]) {
            this.parent[rootP] = rootQ;
            this.size[rootQ] += this.size[rootP];
        }
        else {
            this.parent[rootQ] = rootP;
            this.size[rootP] += this.size[rootQ];
        }
        this.count--;
    }
}

function main() {
    var myArgs = process.argv.slice(2);

    let n = myArgs[0];

    let uf = new WeightedQuickUnionUF(n);

    let p = 3
    let q = 0
    if (uf.find(p) === uf.find(q)) {

    }
    uf.union(p, q);
    console.log(p + " " + q);

    console.log(uf.count + " components")    
}


module.exports = WeightedQuickUnionUF;
