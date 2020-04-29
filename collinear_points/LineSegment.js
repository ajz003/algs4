class LineSegment {
    /**
     * Initializes a new line segment.
     *
     * @param  p one endpoint
     * @param  q the other endpoint
     */
    constructor(p, q) {
        if (p == null || q == null) {
            throw ("argument is null");
        }
        this.p = p;
        this.q = q;   
    }

    /**
     * Returns a string representation of this line segment
     * This method is provide for debugging;
     * your program should not rely on the format of the string representation.
     *
     * @return a string representation of this line segment
     */
    toString() {
        return this.p + " -> " + this.q;
    }

}

module.exports = LineSegment;