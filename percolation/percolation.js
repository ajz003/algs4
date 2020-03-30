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
        // row += 1;
        // col += 1;

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

module.exports = Percolation;

// let percolation = new Percolation(20);

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

// console.log(percolation.grid);
// console.log(percolation.numberOfOpenSites(), "number of open sites");
// console.log("Percolates? " + percolation.percolates());
