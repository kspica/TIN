function multiplication(n) {
    if (n <= 0) {
        console.log("Wartość musi być większa od 0.");
        return;
    }

    for (let i = 1; i <= n; i++) {
        let row = "";
        for (let j = 1; j <= n; j++) {
            row += (i * j) + " ";
        }
        console.log(row.trim());
    }
}

multiplication(3);
multiplication(5);

