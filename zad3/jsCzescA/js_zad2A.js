function printDivisibleNumbers(a, b, c) {
    if (c === 0) {
        console.log("Dzielenie przez zero jest niemożliwe.");
        return;
    }

    console.log(`Liczby z przedziału ${a} - ${b} podzielne przez ${c}:`);
    for (let i = a; i <= b; i++) {
        if (i % c === 0) {
            console.log(i);
        }
    }
}

printDivisibleNumbers(10, 30, 5);
printDivisibleNumbers(1, 20, 3);
