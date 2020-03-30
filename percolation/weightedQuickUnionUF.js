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

module.exports = WeightedQuickUnionUF;
