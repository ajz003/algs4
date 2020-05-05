class Board {
    // create a board from an n-by-n array of tiles,
    // where tiles[row][col] = tile at (row, col)
    constructor(tiles) {
        this.n = tiles[0].length;
        this.board = tiles;
    }

    // string representation of this board
    toString() {
        console.log(this.n)
        for (let i = 0; i < this.n; i++) {
            let row = ""
            for (let j = 0; j < this.n; j++) {
                row += this.board[i][j] + " "
            }
            console.log(row);
        }
    }

    // board dimension n
    dimension() {
        return this.n;
    }

    // number of tiles out of place
    hamming() {
        let num = 1;
        let outOfPlace = 0;
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.board[i][j] !== 0 && this.board[i][j] !== num) {
                    outOfPlace++;
                }
                num++;
            }
        }
        return outOfPlace;
    }

    // sum of Manhattan distances between tiles and goal
    manhattan() {

        let totalDistance = 0;
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.board[i][j] !== 0) {
                    let num = this.board[i][j];
                    let expectedRow = Math.floor((num - 1) / this.n);
                    let expectedCol = (num - 1) % this.n;
                    let distance = Math.abs(expectedRow - i) + Math.abs(expectedCol - j);
                    totalDistance += distance;
                }
            }
        }
        return totalDistance;
    }

    // is this board the goal board?
    isGoal() {
        let num = 1;
        let goal = true;
        for (let i = 0; i < this.n && goal === true; i++) {
            for (let j = 0; j < this.n && goal === true; j++) {
                if (this.board[i][j] !== 0 && this.board[i][j] !== num) {
                    goal = false;
                }
                num++;
            }
        }
        return goal;
    }

    // does this board equal y?
    equals(y) {
        let isEqual = true;
        if (y.dimension() !== this.dimension()) throw "Boards not same dimension";
        for (let i = 0; i < this.n && isEqual === true; i++) {
            for (let j = 0; j < this.n && isEqual === true; j++) {
                if (this.board[i][j] !== y.board[i][j]) {
                    isEqual = false;
                }
            }
        }
        return isEqual;
    }

    // all neighboring boards
    neighbors() {
        let neigboringBoards = [];

        // Find 0;
        let zeroRow;
        let zeroCol;
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.board[i][j] === 0) {
                    zeroRow = j;
                    zeroCol = i;
                }
            }
        }

        if (this.board[zeroCol][zeroRow - 1]) {
            let clone = new Board(this.clone());
            let target = clone.board[zeroCol][zeroRow - 1];
            clone.board[zeroCol][zeroRow - 1] = 0;
            clone.board[zeroCol][zeroRow] = target;
            neigboringBoards.push(clone);
        }
        if (this.board[zeroCol][zeroRow + 1]) {
            let clone = new Board(this.clone());
            let target = clone.board[zeroCol][zeroRow + 1];
            clone.board[zeroCol][zeroRow + 1] = 0;
            clone.board[zeroCol][zeroRow] = target;
            neigboringBoards.push(clone);
        }
        if (this.board[zeroCol + 1]) {
            let clone = new Board(this.clone());
            let target = clone.board[zeroCol + 1][zeroRow];
            clone.board[zeroCol + 1][zeroRow] = 0;
            clone.board[zeroCol][zeroRow] = target;
            neigboringBoards.push(clone);
        }
        if (this.board[zeroCol - 1]) {
            let clone = new Board(this.clone());
            let target = clone.board[zeroCol - 1][zeroRow];
            clone.board[zeroCol - 1][zeroRow] = 0;
            clone.board[zeroCol][zeroRow] = target;
            neigboringBoards.push(clone);
        }
        return neigboringBoards;
    }

    // a board that is obtained by exchanging any pair of tiles
    twin() {
        let twin = new Board(this.clone());

        let tileOne = {};
        let tileTwo = {};

        // Find two non-0 values
        let foundTileOne = false;
        for (let i = 0; i < this.n && foundTileOne === false; i++) {
            for (let j = 0; j < this.n; j++) {
                if (twin.board[i][j] !== 0) {
                    tileOne.i = i;
                    tileOne.j = j;
                    foundTileOne = true;
                    break;
                }
            }
        }
        let foundTileTwo = false;
        for (let i = 0; i < this.n && foundTileTwo === false; i++) {
            for (let j = 0; j < this.n; j++) {
                if (twin.board[i][j] !== 0 && (twin.board[i][j] !== twin.board[tileOne.i][tileOne.j])) {
                    tileTwo.i = i;
                    tileTwo.j = j;
                    foundTileTwo = true;
                    break;
                }
            }
        }

        // Swap array values
        let t = twin.board[tileOne.i][tileOne.j];
        twin.board[tileOne.i][tileOne.j] = twin.board[tileTwo.i][tileTwo.j]
        twin.board[tileTwo.i][tileTwo.j] = t;

        return twin;

    }

    clone() {
        let clonedArr = [];
        for (let i = 0; i < this.n; i++) {
            let row = [];
            for (let j = 0; j < this.n; j++) {
                row.push(this.board[i][j])
            }
            clonedArr.push(row);
        }
        return clonedArr;
    }

    // unit testing (not graded)
    main() {
        this.toString()
        console.log("dimension(): " + this.dimension());
        console.log("hamming(): " + this.hamming());
        console.log("manhattan(): " + this.manhattan());
        console.log("isGoal(): " + this.isGoal());
        let mainEqualTest = new Board([[0, 1, 2], [3, 4, 5], [6, 7, 8]]);
        console.log("equals(): " + this.equals(mainEqualTest));
        console.log("neighbors(): ");
        console.log(this.neighbors());
        console.log("twin(): ");
        this.twin().toString();
    }
}

let test = new Board([[0, 1, 2], [3, 4, 5], [6, 7, 8]]);
let testDupe = new Board([[0, 1, 2], [3, 4, 5], [6, 7, 8]]);
let correct = new Board([[1, 2, 3], [4, 5, 6], [7, 8, 0]]);
let fourNeighbors = new Board([[1, 2, 3], [4, 0, 5], [6, 7, 8]]);
let threeNeighbors = new Board([[1, 0, 3], [4, 2, 5], [7, 8, 6]]);
let twoNeighbors = new Board([[0, 1, 2], [3, 5, 4], [8, 7, 6]]);

test.main();