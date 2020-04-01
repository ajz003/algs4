class Node {
    constructor() {
        this.item;
        this.next;
    }
}

let first = new Node();
let second = new Node();
let third = new Node();

first.item = "to";
second.item = "be";
third.item = "or";

first.next = second;
second.next = third;

// A linked list represents a sequence of items. Also can do this:
let s = [ "to", "be", "or" ];
// But it's easier to insert items and remove items from the sequence with linked lists.

// Actual order is more like:
    // let first = new Node();
    // first.item = "to";
    // let second = new Node();
    // second.item = "be";
    // first.next = second;
    // let third = new Node();
    // third.item = "or"
    // second.next = third;

// Traversing the list
for (x = first; x !== null; x = x.next) {
    console.log(x);
    if (!x.next) {
        break;
    }
}

// Insert at beginning:
// let oldfirst = first;

// first = new Node();
// first.item = "not";
// first.next = oldfirst;


// Remove from beginning;
// first = first.next;


// Insert at the end (need a linkt ot he last node in the list, third)
let oldlast = third;
let last = new Node();
last.item = "not";
oldlast.next = last;


// Traversing the list
let nodeBefore;
for (x = first; x !== null; x = x.next) {
    console.log(x.item);
    if (!x.next) {
        console.log("Last node is: " + x.item)
        console.log(x)
        break;
    }
    nodeBefore = x;
}
console.log(nodeBefore.item, "nodeBefore")
