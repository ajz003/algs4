const WeightedQuickUnionUF = require('./weightedQuickUnionUF');

class Percolation {

    constructor(n) {
        this.grid = this.Percolation(n);
        this.uf = new WeightedQuickUnionUF(n*n + 2);
        this.gridSize = n * n;
        this.sideLength = n
    }

    // creates n-by-n grid, with all sites initially blocked
    Percolation(n) {
        if (n <= 0) throw "n must be greater than 0"
        let grid = [];
        for (let i = 0; i < n; i++) {
            let row = [];
            for (let j = 0; j < n; j++) {
                row.push(0);
            }
            grid.push(row);
        }
        return grid;
    }

    // opens the site (row, col) if it is not open already
    open(row, col) {
        // this.validate(row, col);

        let rowI = row 
        let colI = col 

        if (this.grid[rowI][colI] === 0) this.grid[rowI][colI] = 1;

        if (this.grid[rowI - 1] && this.grid[rowI - 1][colI] === 1) {
            this.uf.union(
                this.xyTo1D(rowI - 1, colI),
                this.xyTo1D(rowI, colI)
            )
        }
        if (this.grid[rowI + 1] && this.grid[rowI + 1][colI] === 1) {
            this.uf.union(
                this.xyTo1D(rowI + 1, colI),
                this.xyTo1D(rowI, colI)
            )
        }
        if (this.grid[rowI][colI - 1] && this.grid[rowI][colI - 1] === 1) {
            this.uf.union(
                this.xyTo1D(rowI, colI - 1),
                this.xyTo1D(rowI, colI)
            )
        }
        if (this.grid[rowI][colI + 1] && this.grid[rowI][colI + 1] === 1) {
            this.uf.union(
                this.xyTo1D(rowI, colI + 1),
                this.xyTo1D(rowI, colI)
            )
        }

    }

    validate(row, col) {
        if (row < 0 || row > this.sideLength) throw row + " is not between 1 and " + this.sideLength;
        if (col < 0 || col > this.sideLength) throw col + " is not between 1 and " + this.sideLength;
    }

    xyTo1D(y, x) {
        return y*this.sideLength + x;
    }

    // is the site (row, col) open?
    isOpen(row, col) {
        if (this.grid[row - 1][col - 1] === 1) {
            return true;
        }
        return false;
    }

    // is the site (row, col) full?
    isFull(row, col) { 

    }

    // returns the number of open sites
    numberOfOpenSites() {
        let openSites = 0;
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] === 1) openSites++;
            }
        }
        return openSites;
    }

    // does the system percolate?
    percolates() { 
        // link all top nodes to virtual node, link all bottom nodes to virtual node
        let n = (this.grid[0].length*this.grid[0].length) + 2;
        console.log(n)
        for (let i = 0; i < this.grid[0].length; i++) {
            this.uf.union(i, n-2)
        }
        for (let i = n - (this.grid[0].length+2); i < n - 2; i++) {
            this.uf.union(i, n-1)
        }
        console.log(this.uf.parent);
        if (this.uf.findfind(n-2) === this.uf.findfind(n-1)) {
            return true;
        }
        return false;
    }

    // test client (optional)
    // static void main(String[] args)
}

let sites = 10;

let percolation = new Percolation(sites);

// 8
// percolation.open( 0, 5);
// percolation.open( 4, 0);
// percolation.open( 5, 4);
// percolation.open( 1, 1);
// percolation.open( 3, 2);
// percolation.open( 4, 7);
// percolation.open( 5, 1);
// percolation.open( 5, 5);
// percolation.open( 2, 4);
// percolation.open( 4, 6);
// percolation.open( 1, 3);
// percolation.open( 3, 6);
// percolation.open( 2, 5);
// percolation.open( 3, 4);
// percolation.open( 0, 3);
// percolation.open( 0, 2);
// percolation.open( 3, 3);
// percolation.open( 6, 4);
// percolation.open( 5, 3);
// percolation.open( 1, 2);
// percolation.open( 3, 5);
// percolation.open( 6, 1);
// percolation.open( 7, 2);
// percolation.open( 6, 2);
// percolation.open( 7, 6);
// percolation.open( 6, 5);
// percolation.open( 1, 7);
// percolation.open( 2, 0);
// percolation.open( 2, 1);
// percolation.open( 6, 7);
// percolation.open( 7, 0);
// percolation.open( 1, 4);
// percolation.open( 1, 0);


percolation.open(9, 1)
percolation.open(1, 9)
percolation.open(5, 7)
percolation.open(1, 5)
percolation.open(0, 3)
percolation.open(7, 3)
percolation.open(9, 0)
percolation.open(3, 1)
percolation.open(3, 7)
percolation.open(8, 2)
percolation.open(1, 1)
percolation.open(8, 0)
percolation.open(3, 2)
percolation.open(4, 4)
percolation.open(4, 6)
percolation.open(1, 7)
percolation.open(5, 3)
percolation.open(6, 4)
percolation.open(8, 5)
percolation.open(2, 6)
percolation.open(3, 6)
percolation.open(6, 0)
percolation.open(8, 3)
percolation.open(2, 9)
percolation.open(0, 9)
percolation.open(8, 6)
percolation.open(0, 4)
percolation.open(8, 7)
percolation.open(5, 0)
percolation.open(1, 4)
percolation.open(2, 3)
percolation.open(5, 8)
percolation.open(4, 7)
percolation.open(2, 1)
percolation.open(3, 5)
percolation.open(0, 6)
percolation.open(6, 8)
percolation.open(2, 8)
percolation.open(3, 3)
percolation.open(3, 9)
percolation.open(2, 4)
percolation.open(2, 7)
percolation.open(0, 7)
percolation.open(2, 0)
percolation.open(5, 6)
percolation.open(1, 2)
percolation.open(6, 3)
percolation.open(8, 9)
percolation.open(6, 5)
percolation.open(4, 1)
percolation.open(7, 2)
percolation.open(9, 7)
percolation.open(6, 9)
percolation.open(3, 4)
percolation.open(7, 9)

console.log(percolation.grid);
console.log(percolation.numberOfOpenSites())
console.log(percolation.percolates())


// let percolates = false;

// while (percolates === false) {
//     let row = Math.floor(Math.random() * sites) + 1;
//     let column = Math.floor(Math.random() * sites) + 1
//     if (!percolation.isOpen(row, column)) {
//         percolation.open(row, column)
//     }
//     console.log(percolation.grid)
//     percolates = percolation.percolates();
// }