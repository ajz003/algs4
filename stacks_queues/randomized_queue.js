// Fisher-Yates Shuffle: https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

class RandomizedQueue {

    // construct an empty randomized queue
    constructor() {
        this.array = [];
        this.n = 0;
    }

    // Make a copy of the array as a new Array, copy the elements, then make it the array;
    resize(len) {
        let copy = new Array(len);
        for (let i = 0; i < len; i++) {
            copy[i] = this.array[i];
        }
        this.array = copy;
    }

    // is the randomized queue empty?
    isEmpty() {
        if (this.n === 0) return true;
        return false;
    }

    // return the number of items on the randomized queue
    size() {
        return this.n;
    }

    // add the item
    enqueue(item) {
        if (this.n === this.array.length) this.resize(2 * this.array.length);
        this.array[this.n++] = item; // Combine iteration and index usage
    }

    // remove and return a random item
    // Note: We keep track of n because the array is full of 'undefined', so using this.array.length is inaccurate.
    dequeue() {
        if (this.isEmpty()) throw "No items in queue"
        let rand = Math.floor(Math.random() * this.n);
        let item = this.array[rand]
        // Rather, when you dequeue a random element from the array,
        // you then take the element on the tail of the array and insert it into that index.

        this.array[rand] = undefined; // empty array slots are undefined
        if (rand !== this.n - 1) {
            [this.array[rand], this.array[this.n - 1]] = [this.array[this.n - 1], this.array[rand]]

        }
        this.n--;
        if (this.n === this.array.length / 4) this.resize(this.array.length / 2);
        return item;
    }

    // return a random item (but do not remove it)
    sample() {
        if (this.isEmpty()) throw "No items in queue"
        let rand = Math.floor(Math.random() * this.n);
        let item = this.array[rand]
        return item
    }

    // return an independent iterator over items in random order
    iterator() {
        let copy = this.array;
        shuffle(copy);

        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                process.stdout.write(copy[i] + "-" + copy[j] + " ");
            }
            console.log("\n")
        }
    }

    // unit testing (required)
    main(args) {
        this.enqueue(1);
        this.enqueue(2);
        this.enqueue(3);
        this.enqueue(4);
        console.log(this.sample());
        console.log(this.dequeue());
        console.log(this.size()); // 3
        this.iterator();
    }

}

let random = new RandomizedQueue();

random.main();