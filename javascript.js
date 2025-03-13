const calculatorContainer = document.querySelector("#calculator-container");
const displayInput = document.querySelector("#display-input");
const buttonContainer = document.querySelector("#button-container");

const buttonArray = [
    {text: 'AC'}, {text: 'DEL'}, {text: '%'}, {text: '+'},
    {text: '7'}, {text: '8'}, {text: '9'}, {text: '-'},
    {text: '4'}, {text: '5'}, {text: '6'}, {text: '*'},
    {text: '1'}, {text: '2'}, {text: '3'}, {text: '/'},
    {text: '0', classes: 'wide'}, {text: '.'}, {text: '='},
];

buttonArray.forEach(item => {
    const btn = document.createElement("button");
    btn.classList.add("button-style");
    btn.textContent = item.text;
    /*If we specified extra classes*/
    if (item.classes) {
        item.classes.split(" ").forEach(cls => btn.classList.add(cls));
    }
    buttonContainer.appendChild(btn);
})

const operator = [buttonArray[4], buttonArray[8], buttonArray[12], buttonArray[16]];

buttonContainer.addEventListener('click', event => {
    let target = event.target;

    if (target.classList.contains('button-style')) {
        const val = target.textContent; /*Assign text content from the button*/

        console.log(target);

        displayInput.textContent += val;
    }
})


function add (a, b) {
    return a + b;
}
function subtract (a, b) {
    return a - b;
}
function multiply (a, b) {
    return a * b;
}
function divide (a, b) {
    return a / b;
}
