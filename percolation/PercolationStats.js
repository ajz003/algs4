const Percolation = require('./percolation');

class PercolationStats {

    // perform independent trials on an n-by-n grid
    constructor(n, trials) {

        if (n <= 0) throw "n is currently " + n + ". n must be greater than 0."
        if (trials <= 0) throw "trials is currently " + trials + ". trials must be greater than 0."
        this.trials = trials;
        this.trialThresholds = [];
        this.denominator = n * n;

        for (let i = 0; i < trials; i++) {
            let percolation = new Percolation(n);
            let percolates = false;
            let threshold = 0;
            let lastOpened;
            while (percolates === false) {
                let row = Math.floor(Math.random() * n) + 1;
                let column = Math.floor(Math.random() * n) + 1
                if (!percolation.isOpen(row, column)) {
                    percolation.open(row, column)
                    lastOpened = [row, column]
                }
                percolates = percolation.percolates();
                threshold = percolation.numberOfOpenSites() / this.denominator;
            }
            this.trialThresholds.push(threshold);
        }
    }

    // sample mean of percolation threshold
    mean() {
        let sum = 0;
        for (let i = 0; i < this.trialThresholds.length; i++) {
            sum += this.trialThresholds[i];
        }
        let avg = sum / this.trialThresholds.length;
        // Alternate (used below)
        // const n = this.trialThresholds.length;
        // const avg = this.trialThresholds.reduce((a,b) => a+b)/n;

        return avg;
    }

    // sample standard deviation of percolation threshold (https://stackoverflow.com/questions/7343890/standard-deviation-javascript)
    stddev() {
        const n = this.trialThresholds.length;
        const mean = this.trialThresholds.reduce((a, b) => a + b) / n;
        const s = Math.sqrt(this.trialThresholds.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
        return s;
    }

    // low endpoint of 95% confidence interval
    confidenceLo() {
        const n = this.trialThresholds.length;
        const mean = this.trialThresholds.reduce((a, b) => a + b) / n;
        const s = Math.sqrt(this.trialThresholds.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
        let lo = mean - ((1.96 * s) / Math.sqrt(this.trials))
        return lo;
    }

    // high endpoint of 95% confidence interval
    confidenceHi() {
        const n = this.trialThresholds.length;
        const mean = this.trialThresholds.reduce((a, b) => a + b) / n;
        const s = Math.sqrt(this.trialThresholds.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
        let hi = mean + ((1.96 * s) / Math.sqrt(this.trials))
        return hi;
    }

}

var myArgs = process.argv.slice(2);

let percolationStats = new PercolationStats(myArgs[0], myArgs[1]);

console.log("Sample mean: " + percolationStats.mean())
console.log("Sample standard deviation: " + percolationStats.stddev())
console.log("95% confidence interval: [" + percolationStats.confidenceLo() + ", " + percolationStats.confidenceHi() + "]")