function nightChristmasTree(height) {
    if (height <= 0) {
        console.log("Wysokość musi być większa od 0.");
        return;
    }

    const maxWidth = 2 * height - 1;

    for (let i = height; i > 0; i--) {
        const stars = "*".repeat(i);
        const spacesCount = maxWidth - 2 * i;

        const spaces = spacesCount > 0 ? " ".repeat(spacesCount) : "";

        if (i === height) {
            console.log(stars + spaces + stars.slice(0,-1));
        } else {
            console.log(stars + spaces + stars);
        }
    }

    console.log("*".repeat(maxWidth));
}


nightChristmasTree(8);
