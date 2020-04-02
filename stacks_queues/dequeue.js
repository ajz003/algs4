// Double-ended queue ("deque" deck), generalization of a stack and a queue that supports adding items from either 
// the front or the back of the data structure.

class Node {
    constructor() {
        this.item = null;
        this.next = null;
    }
}


// TODO: Now that we have a singly linked list, implement a doubly linked list to make 
// removeLast() method perform at constant worst-case time
class Deque {

    // construct an empty deque
    constructor() {
        this.first = null;
        this.last = null;
        this.n = 0;
    }

    // is the deque empty?
    isEmpty() {
        if (this.first === null) return true;
        return false;
    }

    // return the number of items on the deque
    size() {
        return this.n;
    }

    // add the item to the front
    addFirst(item) {
        let oldfirst = this.first;
        let first = new Node();
        first.item = item;
        if (this.isEmpty()) {
            this.first = first;
            this.last = this.first;
        } else {
            first.next = oldfirst;
            this.first = first;
        }
        this.n++;
    }

    // add the item to the back
    addLast(item) {

        let oldlast = this.last;
        let last = new Node();
        last.item = item;

        if (this.isEmpty()) {
            this.last = last;
            this.first = this.last;
        } else {
            oldlast.next = last;
            this.last = last;
        }
        this.n++;
    }

    // remove and return the item from the front
    removeFirst() {
        if (this.isEmpty()) {
            throw "No items left!"
        } else {
            let oldfirst = this.first;
            this.first = oldfirst.next;
            this.n--;
            if (this.isEmpty()) {
                this.last = null;
                this.first = this.last;
            }
            return oldfirst.item
        }
    }

    // remove and return the item from the back
    removeLast() {
        if (this.isEmpty()) {
            throw "No items left!"
        } else {

            let oldlast = this.last;
            let secondToLast;
            if (this.last !== this.first) {
                secondToLast = this.first;
                if (secondToLast.next.next !== null) {
                    while (secondToLast.next.next !== null) {
                        secondToLast = secondToLast.next;
                    }
                }

                secondToLast.next = null;
                this.last = secondToLast;
            }

            this.n--;
            if (this.isEmpty()) {
                this.first = null;
                this.last = this.first;
            }
            return oldlast.item
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
    }

}

let testQ = new Deque();

testQ.main(5);
// testQ.iterator();