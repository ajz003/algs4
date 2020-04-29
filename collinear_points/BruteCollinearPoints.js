const Point = require('./Point')
const LineSegment = require('./LineSegment')

// finds all line segments containing 4 points
class BruteCollinearPoints {

    constructor(points) {
        console.time("Constructor time");
        this.segments = [];
        this.numberOfSegments = 0;

        // Error checking for corner cases
        if (!points) {
            throw "Argument is null"
        }
        for (let i = 0; i < points.length; i++) {
            if (points[i].x === undefined || points[i].y === undefined) {
                throw "A point is null"
            }
            for (let j = i + 1; j < points.length; j++) {
                if (points[i] === points[j]) {
                    throw "Duplicate points " + points[i] + " and " + points[j]
                }
            }
        }

        for (let p = 0; p < points.length; p++) {
            for (let q = 0 ; q < points.length; q++) {
                for (let r = 0; r < points.length; r++) {
                    for (let s = 0; s < points.length; s++) {
                        if (points[p].slopeTo(points[q]) === points[p].slopeTo(points[r]) &&
                            points[p].slopeTo(points[r]) === points[p].slopeTo(points[s])
                        ) {
                            this.sameLine = true;
                            if (points[p].compareTo(points[q]) < 0 &&
                                points[q].compareTo(points[r]) < 0 &&
                                points[r].compareTo(points[s]) < 0
                            ) {
                                let newSegment = new LineSegment(points[p], points[s])
                                this.segments.push(newSegment)
                                this.numberOfSegments++;
                            }

                        }
                    }
                }
            }
        }
        console.timeEnd("Constructor time");
    }

    // the number of line segments
    numberOfSegments() {
        return this.numberOfSegments;
     }

    // the line segments
    segments() {
        return this.segments;
     }

}

let p = new Point(1, 1)
let q = new Point(2, 2)
let r = new Point(3, 3)
let s = new Point(4, 4)
let t = new Point(5, 5)
let u = new Point(2, 4)
let v = new Point(1, 5)
let w = new Point(0, 6)
let x = new Point(0, 7)

let example = new BruteCollinearPoints([p, q, s, r,
    new Point(3, 2),
    new Point(5, 4),
    new Point(7, 6),
    new Point(9, 8),
    new Point(3, 6),
    new Point(4, 7),
    new Point(5, 8),
    new Point(6, 9)
]);

console.log(example.segments)