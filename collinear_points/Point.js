class Point {

    /**
     * Initializes a new point.
     *
     * @param  x the <em>x</em>-coordinate of the point
     * @param  y the <em>y</em>-coordinate of the point
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Leftover methods from java version utilizing StdDraw
     *
     */
    draw() { }
    drawTo() { }

    /**
     * Returns the slope between this point and the specified point.
     * Formally, if the two points are (x0, y0) and (x1, y1), then the slope
     * is (y1 - y0) / (x1 - x0). For completeness, the slope is defined to be
     * +0.0 if the line segment connecting the two points is horizontal;
     * Double.POSITIVE_INFINITY if the line segment is vertical;
     * and Double.NEGATIVE_INFINITY if (x0, y0) and (x1, y1) are equal.
     *
     * @param  that the other point
     * @return the slope between this point and the specified point
     */
    slopeTo(that) {
        /* YOUR CODE HERE */
        let slope;

        let rise = that.y - this.y;
        let run = that.x - this.x;

        if (this.x === that.x && this.y == that.y) return Number.NEGATIVE_INFINITY;
        if (run === 0) return Number.POSITIVE_INFINITY;

        slope = rise / run;

        return slope;
    }

    /**
     * Compares two points by y-coordinate, breaking ties by x-coordinate.
     * Formally, the invoking point (x0, y0) is less than the argument point
     * (x1, y1) if and only if either y0 < y1 or if y0 = y1 and x0 < x1.
     *
     * @param  that the other point
     * @return the value <tt>0</tt> if this point is equal to the argument
     *         point (x0 = x1 and y0 = y1);
     *         a negative integer if this point is less than the argument
     *         point; and a positive integer if this point is greater than the
     *         argument point
     */
    compareTo(that) {
        /* YOUR CODE HERE */
        if (this.x === that.x && this.y == that.y) {
            return 0;
        } else if (this.y === that.y) {
            if (this.x < that.x) {
                return -1
            } else if (this.x > that.x) {
                return 1;
            }
        }
        else if (this.y < that.y) {
            return -1
        } else if (this.y > that.y) {
            return 1;
        }

    }

    /**
     * Compares two points by the slope they make with this point.
     * The slope is defined as in the slopeTo() method.
     *
     */
    slopeOrder(v, w) {
        return this.slopeTo(v) - this.slopeTo(w)
    }

    /**
     * Returns a string representation of this point.
     * This method is provide for debugging;
     * your program should not rely on the format of the string representation.
     *
     * @return a string representation of this point
     */
    toString() {
        /* DO NOT MODIFY */
        return "(" + this.x + ", " + this.y + ")";
    }

}

module.exports = Point