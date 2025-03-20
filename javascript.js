const calculatorContainer = document.querySelector("#calculator-container");
const displayInput = document.querySelector("#display-input");
const buttonContainer = document.querySelector("#button-container");

let currentOperand = ''
    , previousOperand = ''
    , currentOperator = '';

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
    /* If we specified extra classes */
    if (item.classes) {
        item.classes.split(" ").forEach(cls => btn.classList.add(cls)); /* Add multiple classes this way */
    }
    buttonContainer.appendChild(btn);
})

const dot = document.querySelector('.dot'); /* Add variables to use the disabled buttons later */
const percent = document.querySelector('.percent');

buttonContainer.addEventListener('click', event => {
    let target = event.target;
    const val = target.textContent; /* Assign text content from the button */

    if (target.classList.contains('numb') && (currentOperand.length <= 9)) { /* will check for class name target.classList.contains('button-style')*/
        if (currentOperand === '') {
            displayInput.textContent = ''; /* Clear display after calculation and input a new number */
        }
        displayInput.textContent += val;
        currentOperand += val;
    } else if (target.classList.contains('dot') 
                && !currentOperand.includes('%') 
                && !displayInput.textContent.includes('.')) { /* Make sure the dot don't appear after percent 
                    and make sure the dot doesn't appear when the display still has a dot after calculation*/
        displayInput.textContent += val;
        currentOperand += val;
        dot.disabled = true; /* Disable dot button after clicking it */
    } else if (target.classList.contains('percent')) {
        displayInput.textContent += val;
        currentOperand += val;
        percent.disabled = true; /* Disable percent button after clicking it */
    } else if (target.classList.contains('operator')) {
        currentOperator = val
        , previousOperand = currentOperand
        , currentOperand = '';
        dot.disabled = false; /* Enable dot button */
        percent.disabled = false; /* Enable percent button */
    } else if (target.classList.contains('equator')) {
        if (previousOperand && currentOperand) {
            if (previousOperand.includes('%')) {
                previousOperand = (Number(previousOperand.slice(0, -1)) / 100); /* Convert percentage to number */
            }
            if (currentOperand.includes('%')) {
                currentOperand = (Number(currentOperand.slice(0, -1)) / 100);
            }
            let result = roundToMaxDeximal(operate(Number(previousOperand), Number(currentOperand), currentOperator),8); 
            /* The result here is a number */
            displayInput.textContent = result.toString(); /* Convert back to string to use the percentage check for
            the dot button*/
            previousOperand = result.toString(); 
            currentOperand = ''; /* Reset currentOperand to start a next calculation set */
            dot.disabled = false;
            percent.disabled = false;
        }
    } else if (target.classList.contains('delete')) { /* Remove the last character */
        if (currentOperand.slice(-1) == '.') {
            dot.disabled = false;
        } else if (currentOperand.slice(-1) == '%') {
            percent.disabled = false;
        }
        displayInput.textContent = displayInput.textContent.slice(0, -1);
        currentOperand = currentOperand.slice(0, -1);
    } else if (target.classList.contains('clear')) { /* Clear all character */
        displayInput.textContent = ''
        , currentOperand = ''
        , previousOperand = '';
        dot.disabled = false;
        percent.disabled = false;
    }
})

document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (!isNaN(key) && key !== ' ' && (currentOperand.length <= 9)) {
        if (currentOperand === '') {
            displayInput.textContent = ''; /* Clear display after calculation and input a new number */
        }
        displayInput.textContent += key;
        currentOperand += key;
    } else if (key === '.'
        && !currentOperand.includes('%') 
        && !displayInput.textContent.includes('.')) {
        displayInput.textContent += key;
        currentOperand += key;
        dot.disabled = true;
    } else if (key === '%') {
        displayInput.textContent += key;
        currentOperand += key;
        percent.disabled = true;
    } else if (['+', '-', '*', '/'].includes(key)) {
        currentOperator = key
        , previousOperand = currentOperand
        , currentOperand = '';
        dot.disabled = false; /* Enable dot button */
        percent.disabled = false;
    } else if (key === 'Enter') {
        if (previousOperand && currentOperand) {
            if (previousOperand.includes('%')) {
                previousOperand = (Number(previousOperand.slice(0, -1)) / 100); /* Convert percentage to number */
            }
            if (currentOperand.includes('%')) {
                currentOperand = (Number(currentOperand.slice(0, -1)) / 100);
            }
            let result = roundToMaxDeximal(operate(Number(previousOperand), Number(currentOperand), currentOperator),8); 
            /* The result here is a number */
            displayInput.textContent = result.toString(); /* Convert back to string to use the percentage check for
            the dot button*/
            previousOperand = result.toString(); 
            currentOperand = ''; /* Reset currentOperand to start a next calculation set */
            dot.disabled = false;
            percent.disabled = false;
        }
    } else if (key === 'Backspace') { /* Remove the last character */
        if (currentOperand.slice(-1) == '.') { /* Add this to reactivate the dot button after it being deleted */
            dot.disabled = false;
        } else if (currentOperand.slice(-1) == '%') { /* Add this to reactivate the percent button after it being deleted */
            percent.disabled = false;
        }
        displayInput.textContent = displayInput.textContent.slice(0, -1); /* This has to be after the conditionals
        because slice(-1) won't equal either dot or percent if had already been deleted */
        currentOperand = currentOperand.slice(0, -1);
    } else if (key === 'Escape') { /* Clear all character */
        displayInput.textContent = ''
        , currentOperand = ''
        , previousOperand = '';
        dot.disabled = false;
        percent.disabled = false;
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

function roundToMaxDeximal (number, maxDecimals) {
    const multipler = Math.pow(10, maxDecimals);
    return Math.round(number * multipler) / multipler;
}