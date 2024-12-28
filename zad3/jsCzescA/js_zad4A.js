function fibonacciSequence(length) {
    if (length <= 0) {
        console.log("Długość musi być większa od 0.");
        return;
    }

    const sequence = [];
    for (let i = 0; i < length; i++) {
        if (i === 0) {
            sequence.push(0);
        } else if (i === 1) {
            sequence.push(1);
        } else {
            sequence.push(sequence[i - 1] + sequence[i - 2]);
        }
    }

    console.log(sequence.join(", "));
}


fibonacciSequence(10);
fibonacciSequence(5);
fibonacciSequence(0);
