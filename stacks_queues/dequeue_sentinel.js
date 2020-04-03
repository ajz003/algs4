// Double-ended queue ("deque" deck), generalization of a stack and a queue that supports adding items from either 
// the front or the back of the data structure.

class Node {
    constructor() {
        this.item = null;
        this.prev = null;
        this.next = null;
    }
}

class Deque {

    // construct an empty deque
    constructor() {
        this.pre = new Node();
        this.post = new Node();
        this.pre.next = this.post;
        this.post.prev = this.pre;
        this.n = 0;
    }

    // is the deque empty?
    isEmpty() {
        if (this.pre.next === this.post && this.post.prev === this.pre) return true;
        return false;
    }

    // return the number of items on the deque
    size() {
        return this.n;
    }

    // add the item to the front
    addFirst(item) {
        if (item === null) throw "IllegalArgumentException"

        let first = new Node();
        first.item = item;

        if (this.isEmpty()) {
            this.pre.next = first;
            first.next = this.post;
            this.post.prev = first;            
        } else {
            let oldfirst = this.pre.next;
            this.pre.next = first;
            first.prev = this.pre;
            first.next = oldfirst;
            oldfirst.prev = first;            
        }
        this.n++;
    }

    // add the item to the back
    addLast(item) {
        if (item === null) throw "IllegalArgumentException"

        let last = new Node();
        last.item = item;

        if (this.isEmpty()) {
            this.pre.next = last;
            last.next = this.post;
            this.post.prev = last;            
        } else {
            let oldlast = this.post.prev;
            oldlast.next = last;
            last.prev = oldlast;
            last.next = this.post;
            this.post.prev = last;
        }
        this.n++;
    }

    // remove and return the item from the front
    removeFirst() {
        if (this.isEmpty()) {
            throw "No items left!"
        } else {
            let oldfirst = this.pre.next;
            this.pre.next = this.pre.next.next;
            this.pre.next.prev = this.pre;
            this.n--;

            return oldfirst.item;
        }
    }

    // remove and return the item from the back
    removeLast() {
        if (this.isEmpty()) {
            throw "No items left!"
        } else {
            let oldlast = this.post.prev;
            this.post.prev = this.post.prev.prev;
            this.post.prev.next = this.post;
            this.n--;

            return oldlast.item;
        }
    }

    // return an iterator over items in order from front to back
    iterator() {
        for (var x = this.first; x !== null; x = x.next) {
            console.log(x.item);
        }

    }

    // unit testing (required)
    main(n) {
        // You should see the numbers 1 through n in ascending order.
        for (let i = 1; i < n; i++) {
            this.addFirst(i);
        }
        for (let i = 1; i < n; i++) {
            console.log(this.removeLast(i));
        }
        console.log(this.isEmpty())
    }
}

let testQ = new Deque();

testQ.main(5);
// testQ.iterator();