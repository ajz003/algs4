const WeightedQuickUnionUF = require('./weightedQuickUnionUF');

class Percolation {

    constructor(n) {
        this.uf = new WeightedQuickUnionUF(n * n + 2);
        this.gridSize = n * n;
        this.sideLength = n
        this.openSites = 0;
        this.virtualTopIndex;
        this.virtualBottomIndex;
        this.grid = this.Percolation(n);
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
        this.virtualTopIndex = (n * n + 1) - 1;
        this.virtualBottomIndex = (n * n + 2) - 1;

        // link all top nodes to virtual node
        for (let i = 0; i < this.sideLength; i++) {
            this.uf.union(i, this.virtualTopIndex)
        }

        // link all bottom nodes to virtual node
        for (let i = (this.sideLength * (this.sideLength - 1)); i < (this.sideLength * this.sideLength); i++) {
            this.uf.union(i, this.virtualBottomIndex)
        }

        return grid;
    }

    // opens the site (row, col) if it is not open already
    open(row, col) {
        // compensate for sites starting at index 0 from .txt files; remove if given actual row,col indices
        row += 1;
        col += 1;

        this.validate(row, col);

        let rowI = row - 1
        let colI = col - 1

        if (this.grid[rowI][colI] === 0) this.grid[rowI][colI] = 1;
        this.openSites++;

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

    xyTo1D(x, y) {
        return x * this.sideLength + y;
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
        let site = this.xyTo1D(row, col);
        if (this.isOpen(row, col) && this.uf.find(this.virtualTopIndex) === this.uf.find(site)) {
            return true;
        }
        return false;
    }

    // returns the number of open sites
    numberOfOpenSites() {
        return this.openSites;
    }

    // does the system percolate?
    percolates() {
        if (this.uf.find(this.virtualTopIndex) === this.uf.find(this.virtualBottomIndex)) {
            return true;
        }
        return false;
    }

    // test client (optional)
    // static void main(String[] args)
}

let percolation = new Percolation(20);

// 6
// percolation.open(0, 5)
// percolation.open(1, 5)
// percolation.open(2, 5)
// percolation.open(3, 5)
// percolation.open(4, 5)
// percolation.open(4, 4)
// percolation.open(3, 3)
// percolation.open(2, 3)
// percolation.open(1, 3)
// percolation.open(1, 2)
// percolation.open(1, 1)
// percolation.open(1, 0)
// percolation.open(2, 0)
// percolation.open(3, 0)
// percolation.open(4, 0)
// percolation.open(4, 1)
// percolation.open(5, 1)
// percolation.open(4, 3)

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

// 10
// percolation.open(9, 1)
// percolation.open(1, 9)
// percolation.open(5, 7)
// percolation.open(1, 5)
// percolation.open(0, 3)
// percolation.open(7, 3)
// percolation.open(9, 0)
// percolation.open(3, 1)
// percolation.open(3, 7)
// percolation.open(8, 2)
// percolation.open(1, 1)
// percolation.open(8, 0)
// percolation.open(3, 2)
// percolation.open(4, 4)
// percolation.open(4, 6)
// percolation.open(1, 7)
// percolation.open(5, 3)
// percolation.open(6, 4)
// percolation.open(8, 5)
// percolation.open(2, 6)
// percolation.open(3, 6)
// percolation.open(6, 0)
// percolation.open(8, 3)
// percolation.open(2, 9)
// percolation.open(0, 9)
// percolation.open(8, 6)
// percolation.open(0, 4)
// percolation.open(8, 7)
// percolation.open(5, 0)
// percolation.open(1, 4)
// percolation.open(2, 3)
// percolation.open(5, 8)
// percolation.open(4, 7)
// percolation.open(2, 1)
// percolation.open(3, 5)
// percolation.open(0, 6)
// percolation.open(6, 8)
// percolation.open(2, 8)
// percolation.open(3, 3)
// percolation.open(3, 9)
// percolation.open(2, 4)
// percolation.open(2, 7)
// percolation.open(0, 7)
// percolation.open(2, 0)
// percolation.open(5, 6)
// percolation.open(1, 2)
// percolation.open(6, 3)
// percolation.open(8, 9)
// percolation.open(6, 5)
// percolation.open(4, 1)
// percolation.open(7, 2)
// percolation.open(9, 7)
// percolation.open(6, 9)
// percolation.open(3, 4)
// percolation.open(7, 9)

20
percolation.open(6, 10)
percolation.open(17, 10)
percolation.open(11, 4)
percolation.open(8, 4)
percolation.open(4, 8)
percolation.open(0, 0)
percolation.open(11, 0)
percolation.open(4, 3)
percolation.open(15, 18)
percolation.open(2, 12)
percolation.open(8, 13)
percolation.open(11, 3)
percolation.open(3, 10)
percolation.open(2, 2)
percolation.open(1, 1)
percolation.open(4, 16)
percolation.open(4, 19)
percolation.open(16, 10)
percolation.open(9, 2)
percolation.open(3, 16)
percolation.open(12, 3)
percolation.open(3, 17)
percolation.open(2, 3)
percolation.open(7, 14)
percolation.open(12, 4)
percolation.open(14, 6)
percolation.open(18, 19)
percolation.open(18, 17)
percolation.open(4, 0)
percolation.open(18, 10)
percolation.open(8, 9)
percolation.open(6, 14)
percolation.open(6, 0)
percolation.open(8, 12)
percolation.open(2, 11)
percolation.open(1, 12)
percolation.open(3, 9)
percolation.open(9, 10)
percolation.open(8, 0)
percolation.open(9, 16)
percolation.open(12, 14)
percolation.open(8, 5)
percolation.open(5, 4)
percolation.open(7, 16)
percolation.open(5, 8)
percolation.open(13, 5)
percolation.open(4, 9)
percolation.open(3, 11)
percolation.open(11, 15)
percolation.open(17, 1)
percolation.open(4, 10)
percolation.open(14, 15)
percolation.open(16, 12)
percolation.open(3, 14)
percolation.open(10, 2)
percolation.open(10, 12)
percolation.open(17, 19)
percolation.open(7, 11)
percolation.open(4, 5)
percolation.open(1, 5)
percolation.open(13, 17)
percolation.open(12, 13)
percolation.open(10, 6)
percolation.open(10, 19)
percolation.open(10, 13)
percolation.open(12, 9)
percolation.open(14, 16)
percolation.open(5, 14)
percolation.open(17, 9)
percolation.open(13, 10)
percolation.open(2, 0)
percolation.open(7, 9)
percolation.open(11, 13)
percolation.open(5, 13)
percolation.open(13, 9)
percolation.open(10, 8)
percolation.open(8, 18)
percolation.open(14, 1)
percolation.open(18, 5)
percolation.open(14, 12)
percolation.open(5, 1)
percolation.open(7, 6)
percolation.open(8, 8)
percolation.open(9, 6)
percolation.open(13, 19)
percolation.open(13, 7)
percolation.open(0, 13)
percolation.open(10, 14)
percolation.open(18, 0)
percolation.open(17, 7)
percolation.open(12, 7)
percolation.open(17, 11)
percolation.open(1, 4)
percolation.open(4, 1)
percolation.open(3, 6)
percolation.open(3, 19)
percolation.open(13, 12)
percolation.open(1, 7)
percolation.open(14, 11)
percolation.open(19, 11)
percolation.open(11, 6)
percolation.open(7, 13)
percolation.open(4, 4)
percolation.open(17, 15)
percolation.open(4, 11)
percolation.open(9, 14)
percolation.open(1, 6)
percolation.open(4, 18)
percolation.open(2, 8)
percolation.open(19, 12)
percolation.open(10, 7)
percolation.open(15, 17)
percolation.open(3, 4)
percolation.open(8, 14)
percolation.open(16, 9)
percolation.open(13, 18)
percolation.open(18, 7)
percolation.open(6, 12)
percolation.open(18, 11)
percolation.open(10, 11)
percolation.open(14, 17)
percolation.open(12, 17)
percolation.open(13, 0)
percolation.open(10, 18)
percolation.open(11, 18)
percolation.open(16, 3)
percolation.open(11, 5)
percolation.open(0, 8)
percolation.open(3, 8)
percolation.open(17, 8)
percolation.open(16, 18)
percolation.open(12, 19)
percolation.open(6, 1)
percolation.open(1, 3)
percolation.open(7, 10)
percolation.open(18, 6)
percolation.open(11, 1)
percolation.open(19, 5)
percolation.open(3, 15)
percolation.open(14, 4)
percolation.open(14, 2)
percolation.open(16, 5)
percolation.open(16, 11)
percolation.open(0, 4)
percolation.open(4, 13)
percolation.open(19, 6)
percolation.open(17, 6)
percolation.open(2, 18)
percolation.open(13, 14)
percolation.open(15, 16)
percolation.open(16, 14)
percolation.open(18, 18)
percolation.open(9, 5)
percolation.open(0, 7)
percolation.open(1, 8)
percolation.open(14, 10)
percolation.open(5, 6)
percolation.open(11, 17)
percolation.open(14, 3)
percolation.open(17, 16)
percolation.open(0, 10)
percolation.open(15, 19)
percolation.open(15, 3)
percolation.open(18, 8)
percolation.open(0, 6)
percolation.open(7, 1)
percolation.open(0, 12)
percolation.open(18, 12)
percolation.open(7, 2)
percolation.open(15, 2)
percolation.open(3, 1)
percolation.open(14, 8)
percolation.open(10, 3)
percolation.open(3, 0)
percolation.open(0, 14)
percolation.open(3, 7)
percolation.open(7, 12)
percolation.open(13, 11)
percolation.open(18, 13)
percolation.open(17, 14)
percolation.open(4, 6)
percolation.open(16, 13)
percolation.open(3, 5)
percolation.open(6, 8)
percolation.open(12, 6)
percolation.open(1, 14)
percolation.open(10, 0)
percolation.open(15, 10)
percolation.open(17, 4)
percolation.open(10, 1)
percolation.open(14, 14)
percolation.open(14, 7)
percolation.open(16, 6)
percolation.open(15, 7)
percolation.open(17, 0)
percolation.open(17, 2)
percolation.open(2, 17)
percolation.open(6, 7)
percolation.open(9, 13)
percolation.open(13, 13)
percolation.open(16, 15)
percolation.open(0, 3)
percolation.open(17, 12)
percolation.open(6, 9)
percolation.open(15, 1)
percolation.open(5, 7)
percolation.open(10, 5)
percolation.open(11, 8)
percolation.open(11, 10)
percolation.open(6, 5)
percolation.open(1, 2)
percolation.open(12, 0)
percolation.open(0, 1)
percolation.open(14, 0)
percolation.open(12, 15)
percolation.open(16, 19)
percolation.open(12, 18)
percolation.open(14, 18)
percolation.open(7, 0)
percolation.open(18, 9)
percolation.open(4, 12)
percolation.open(0, 16)
percolation.open(13, 4)
percolation.open(5, 9)
percolation.open(11, 11)
percolation.open(6, 15)
percolation.open(19, 18)
percolation.open(8, 10)
percolation.open(2, 5)
percolation.open(15, 0)
percolation.open(19, 0)
percolation.open(6, 17)
percolation.open(19, 4)
percolation.open(6, 11)
percolation.open(8, 1)
percolation.open(7, 19)
percolation.open(2, 14)
percolation.open(2, 13)
percolation.open(2, 4)
percolation.open(4, 17)
percolation.open(18, 16)
percolation.open(15, 11)
percolation.open(19, 3)
percolation.open(4, 15)
percolation.open(5, 2)
percolation.open(7, 5)
percolation.open(11, 14)
percolation.open(1, 15)
percolation.open(15, 5)
percolation.open(0, 17)

console.log(percolation.grid);
console.log(percolation.numberOfOpenSites(), "number of open sites");
console.log("Percolates? " + percolation.percolates());


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