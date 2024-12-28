function binomialCoefficient(n, k) {
    if (k === 0 || k === n) {
        return 1;
    }
    return binomialCoefficient(n - 1, k - 1) + binomialCoefficient(n - 1, k);
}

function pascalTriangle(h) {
    for (let n = 0; n < h; n++) {
        let row = "";
        for (let k = 0; k <= n; k++) {
            row += binomialCoefficient(n, k) + " ";
        }
        console.log(row.trim());
    }
}

pascalTriangle(6);
