const calculatorContainer = document.querySelector("#calculator-container");
const displayInput = document.querySelector("#display-input");
const buttonContainer = document.querySelector("#button-container");

let currentOperand = '';
let previousOperand = '';
let currentOperator = '';


const buttonArray = [
    {text: 'AC'}, {text: 'DEL'}, {text: '%'}, {text: '+',},
    {text: '7', classes: 'numb'}, {text: '8', classes: 'numb'}, {text: '9', classes: 'numb'}, {text: '-'},
    {text: '4', classes: 'numb'}, {text: '5', classes: 'numb'}, {text: '6', classes: 'numb'}, {text: '*'},
    {text: '1', classes: 'numb'}, {text: '2', classes: 'numb'}, {text: '3', classes: 'numb'}, {text: '/'},
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

buttonContainer.addEventListener('click', event => {
    let target = event.target;
    const val = target.textContent; /*Assign text content from the button*/

    if (typeof target.textContent == 'number') { /*will check for class name target.classList.contains('button-style')*/
        displayInput.textContent += val;
        currentOperand += val;
    } else if (target.textContent === '+' || target.textContent === '-' || target.textContent === '*' ||target.textContent === '/') {
        currentOperator = val;
        previousOperand = currentOperand;
        currentOperand = '';
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
