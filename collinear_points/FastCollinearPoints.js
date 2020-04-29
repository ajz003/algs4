const Point = require('./Point')
const LineSegment = require('./LineSegment')

// finds all line segments containing 4 points
class FastCollinearPoints {

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

        for (let i = 0; i < points.length; i++) {
            let origin = points[i]
            let otherPoints = []
            for (let j = 0; j < points.length; j++) {
                if (points[j] !== origin) {
                    otherPoints.push(points[j])
                }
            }

            // Sort by the slope from the 'origin' to each other point
            otherPoints.sort(function (a, b) {
                return origin.slopeTo(a) - origin.slopeTo(b)
            });

            for (let j = 0; j < otherPoints.length - 2; j++) {
                if (
                    origin.slopeTo(otherPoints[j]) === origin.slopeTo(otherPoints[j + 1]) &&
                    origin.slopeTo(otherPoints[j + 1]) === origin.slopeTo(otherPoints[j + 2])

                ) {
                    let potential = [origin, otherPoints[j], otherPoints[j + 1], otherPoints[j + 2]]
                    potential.sort(function (a, b) {
                        return a.compareTo(b)
                    })
                    let newSegment = new LineSegment(potential[0], potential[3])
                    let alreadySeen = false;
                    for (let k = 0; k < this.segments.length; k++) {
                        if (this.segments[k].p === newSegment.p &&
                            this.segments[k].q === newSegment.q
                        ) {
                            alreadySeen = true;
                            break;
                        }
                    }
                    if (!alreadySeen) this.segments.push(newSegment)
                }
            }
        }
        console.timeEnd("Constructor time");
    }

    // the number of line segments
    numberOfSegments() {
        return this.segments.length;
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

let example = new FastCollinearPoints([p, q, s, r,
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