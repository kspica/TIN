const addDivButton = document.getElementById('addDiv');
const removeDivButton = document.getElementById('removeDiv');
const changeColorButton = document.getElementById('changeColor');
const updateTextButton = document.getElementById('updateText');
const divContainer = document.querySelector('.divs-container');

addDivButton.addEventListener('click', function () {
    const newDiv = document.createElement('div');
    newDiv.textContent = `Div ${divContainer.children.length + 1}`;
    divContainer.appendChild(newDiv);
});

removeDivButton.addEventListener('click', function () {
    for (let child of divContainer.children) {
        if (child.tagName === 'DIV') {
            divContainer.removeChild(child);
            break;
        }
    }
});

changeColorButton.addEventListener('click', function () {
    if (divContainer.children.length >= 3) {
        divContainer.children[2].style.backgroundColor = getRandomColor();
    }
});

updateTextButton.addEventListener('click', function () {
    for (let i = 0; i < divContainer.children.length; i++) {
        divContainer.children[i].textContent = 'Nowy tekst';
    }
});


function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}