const calculatorContainer = document.querySelector("#calculator-container");
const displayInput = document.querySelector("#display-input");
const buttonContainer = document.querySelector("#button-container");

let currentOperand = '';
let previousOperand = '';
let currentOperator = '';


const buttonArray = [
    {text: 'AC', classes: 'clear'}, {text: 'DEL', classes: 'delete'}, {text: '%', classes: 'percent'}, {text: '+', classes: 'operator'},
    {text: '7', classes: 'numb'}, {text: '8', classes: 'numb'}, {text: '9', classes: 'numb'}, {text: '-', classes: 'operator'},
    {text: '4', classes: 'numb'}, {text: '5', classes: 'numb'}, {text: '6', classes: 'numb'}, {text: '*', classes: 'operator'},
    {text: '1', classes: 'numb'}, {text: '2', classes: 'numb'}, {text: '3', classes: 'numb'}, {text: '/', classes: 'operator'},
    {text: '0', classes: 'wide numb'}, {text: '.', classes: 'dot'}, {text: '=', classes: 'equator'}, /*You can add two classes for the 0 button*/
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

    if (target.classList.contains('numb') && !currentOperand.includes('%')) { /* will check for class name target.classList.contains('button-style')*/
        if (currentOperand === '') {
            displayInput.textContent = '';
        }
        displayInput.textContent += val;
        currentOperand += val;
    } else if (target.classList.contains('dot') && !displayInput.textContent.includes('.') && !currentOperand.includes('%')) { /* Make sure the decimal only shows up one time in the number string */
        displayInput.textContent += val;
        currentOperand += val;
    } else if (target.classList.contains('percent') && !currentOperand.includes('%')) {
        displayInput.textContent += val;
        currentOperand += val;
    } else if (target.classList.contains('operator')) {
        currentOperator = val;
        previousOperand = currentOperand;
        currentOperand = '';
    } else if (target.classList.contains('equator')) {
        if (previousOperand && currentOperand) {
            if (previousOperand.includes('%')) {
                previousOperand = (Number(previousOperand.slice(0, -1)) / 100);
                console.log(previousOperand);
            }
            if (currentOperand.includes('%')) {
                currentOperand = (Number(currentOperand.slice(0, -1)) / 100);
                console.log(currentOperand);
            }
            let result = operate(Number(previousOperand), Number(currentOperand), currentOperator);
            displayInput.textContent = result.toString();
            currentOperand = result.toString();
        }
    } else if (target.classList.contains('delete')) { /* Remove the last character */
        displayInput.textContent = displayInput.textContent.slice(0, -1);
        currentOperand = currentOperand.slice(0, -1);
    } else if (target.classList.contains('clear')) { /* Clear all character */
        displayInput.textContent = '';
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
function operate (a, b, sign) {
    if (sign === '+') return add(a, b);
    else if (sign === '-') return subtract(a, b);
    else if (sign === '*') return multiply(a, b);
    else if (sign === '/') return divide(a, b);
}