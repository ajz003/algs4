var assert = require('assert');

class MinPQ {
    constructor(keys) {
        this.n = keys.length;
        this.pq = new Array(keys.length + 1);
        for (let i = 0; i < this.n; i++) {
            this.pq[i+1] = keys[i];
        }
        for (let j = Math.floor(this.n/2); j >= 1; j--) {

            this.sink(j);
        }
        assert(this.isMinHeap());
    }

    isEmpty() {
        return this.n === 0;
    }

    size() {
        return this.n;
    }

    min() {
        if (this.isEmpty()) throw "Priority queue underflow";
        return this.pq[1];
    }

    resize(capacity) {
        assert(capacity > this.n);
        let temp = new Array(capacity);
        for (let i = 1; i <= this.n; i++) {
            temp[i] = this.pq[i];
        }
        this.pq = temp;
    }

    insert(x) {
        // double size of array if necessary
        if (this.n == this.pq.length - 1) resize(2 * this.pq.length);
        this.pq[++this.n] = x;
        swim(n);
        assert(this.isMinHeap());
    }

    delMin() {
        if (this.isEmpty()) throw "Priority queue underflow";
        let min = this.pq[1];
        this.exch(1, this.n--);
        this.sink(1);
        this.pq[n+1] = null;
        if ((this.n > 0) && (this.n == (this.pq.length - 1) / 4)) resize(this.pq.length / 2);
        assert(this.isMinHeap())
        return min;
    }

   /***************************************************************************
    * Helper functions to restore the heap invariant.
    ***************************************************************************/

    swim(k) {
        while (k > 1 && this.greater(Math.floor(k/2), k)) {
            this.exch(k, Math.floor(k/2));
            k = Math.floor(k/2);
        }
    }

    sink(k) {
        while (2*k <= this.n) {
            let j = 2*k;
            if (j < this.n && this.greater(j, j+1)) j++;
            if (!this.greater(k, j)) break;
            this.exch(k, j);
            k = j;
        }
    }

   /***************************************************************************
    * Helper functions for compares and swaps.
    ***************************************************************************/

    greater(i, j) {
        return this.pq[i] > this.pq[j];
    }

    exch(i, j) {

        let swap = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = swap;
    }

    isMinHeap() {
        for (let i = 1; i <= this.n; i++) {
            if (this.pq[i] === null) return false;
        }
        for (let i = this.n+1; i < this.pq.length; i++) {
            if (this.pq[i] !== null || this.pq[i] !== undefined) return false;
        }
        if (this.pq[0] !== undefined) return false;
        return this.isMinHeapOrdered(1);
    }
    
    isMinHeapOrdered(k) {
        if (k > this.n) return true;
        let left = 2*k;
        let right = 2*k + 1;
        if (left <= this.n && this.greater(k, left)) return false;
        if (right <= this.n && this.greater(k, right)) return false;
        return this.isMinHeapOrdered(left) && this.isMinHeapOrdered(right);
    }

}

let test = new MinPQ([18, 10, 8, 5, 3, 1])

// console.log(assert(3 > 5))
console.log(test);