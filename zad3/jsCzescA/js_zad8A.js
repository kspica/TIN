const rectangleArea = (a, b) => a * b;
const trapezoidArea = (a, b, h) => ((a + b) * h) / 2;
const parallelogramArea = (a, h) => a * h;
const triangleArea = (a, h) => (a * h) / 2;

const shapes = {
    prostokąt: rectangleArea,
    trapez: trapezoidArea,
    równoległobok: parallelogramArea,
    trójkąt: triangleArea
};

function calculateArea(shapeType, ...dimensions) {
    const calculate = shapes[shapeType];
    if (calculate) {
        return calculate(...dimensions);
    } else {
        console.log("Nieznany typ figury.");
    }
}

console.log("Pole prostokąta (4, 5):", calculateArea('prostokąt', 4, 5));
console.log("Pole trapezu (4, 6, 5):", calculateArea('trapez', 4, 6, 5));
console.log("Pole równoległoboku (4, 6):", calculateArea('równoległobok', 4, 6));
console.log("Pole trójkąta (4, 5):", calculateArea('trójkąt', 4, 5));
