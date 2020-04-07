const readline = require('readline');
const fs = require('fs');
const RandomizedQueue = require('./randomized_queue')

class Permutation {
  constructor() {
    this.randomizedQueue = new RandomizedQueue();
  }
}

let perm = new Permutation();
let num = parseInt(process.argv[2]);

let filename = process.argv[3]

fs.readFile(filename, 'utf8', function (err, data) {
  if (err) throw err;
  let line = data;
  let string = "";

  for (let i = 0; i < line.length; i++) {
    if (line[i] === " ") {
      perm.randomizedQueue.enqueue(string)
      string = "";
    } else {
      string += line[i]
      if (i === line.length - 1) {
        perm.randomizedQueue.enqueue(string)
      }
    }
  }

  for (let i = 0; i < num; i++) {
    console.log(perm.randomizedQueue.dequeue());
  }

});