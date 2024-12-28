function christmasTree(height) {
    if (height <= 0) {
        console.log("Wysokość musi być większa od 0.");
        return;
    }

    for (let i = 1; i <= height; i++) {
        console.log("*".repeat(i));
    }
}

christmasTree(4);
christmasTree(6);
christmasTree(0);
