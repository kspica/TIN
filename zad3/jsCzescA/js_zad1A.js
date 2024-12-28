function isPythagoreanTriple(a, b, c) {
    const [x, y, z] = [a, b, c].sort((m, n) => m - n);
    return x ** 2 + y ** 2 === z ** 2;
}

console.log(isPythagoreanTriple(3, 4, 5));
console.log(isPythagoreanTriple(5, 12, 13));
console.log(isPythagoreanTriple(1, 2, 3));
