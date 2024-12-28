function rectangleArea(a, b) {
    return a * b;
}

function trapezoidArea(a, b, h) {
    return ((a + b) * h) / 2;
}

function parallelogramArea(a, h) {
    return a * h;
}

function triangleArea(a, h) {
    return (a * h) / 2;
}

function calculateArea(shapeType, ...dimensions) {
    let area;

    switch (shapeType) {
        case 'prostokąt':
            if (dimensions.length === 2) {
                area = rectangleArea(dimensions[0], dimensions[1]);
            } else {
                console.log("Prostokąt wymaga dwóch wymiarów (a, b).");
            }
            break;
        case 'trapez':
            if (dimensions.length === 3) {
                area = trapezoidArea(dimensions[0], dimensions[1], dimensions[2]);
            } else {
                console.log("Trapez wymaga trzech wymiarów (a, b, h).\"");
            }
            break;
        case 'równoległobok':
            if (dimensions.length === 2) {
                area = parallelogramArea(dimensions[0], dimensions[1]);
            } else {
                console.log("Równoległobok wymaga dwóch wymiarów (a, h).");
            }
            break;
        case 'trójkąt':
            if (dimensions.length === 2) {
                area = triangleArea(dimensions[0], dimensions[1]);
            } else {
                console.log("Trójkąt wymaga dwóch wymiarów (a, h).");
            }
            break;
        default:
            console.log("Nieznany typ figury.");
            break;
    }

    return area;
}

console.log("Pole prostokąta (4, 5):", calculateArea('prostokąt', 4, 5));
console.log("Pole trapezu (4, 6, 5):", calculateArea('trapez', 4, 6, 5));
console.log("Pole równoległoboku (4, 6):", calculateArea('równoległobok', 4, 6));
console.log("Pole trójkąta (4, 5):", calculateArea('trójkąt', 4, 5));
