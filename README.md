# algs4
Implementations using JavaScript/Node
## Percolation
Takes two _command-line arguments_  _n_ and _T_, performs _T_ independent computational experiments (discussed above) on an _n_-by-_n_ grid, and prints the sample mean, sample standard deviation, and the _95% confidence interval_ for the percolation threshold.

How to run:

1. cd into percolation/ and run the following command:

        node PercolationStats.js 10 1000
    where the first argument is creating a n-by-n grid, and the second argument is the # of trials.

## Collinear Points

Run `node BruteCollinearPoints.js && node FastCollinearPoints.js` to compare execution times between `BruteCollinearPoints.js` and `FastCollinearPoints.js`