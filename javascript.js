const calculatorContainer = document.querySelector("#calculator-container");
const displayInput = document.querySelector("#display-input");
const buttonContainer = document.querySelector("#button-container");

const buttonArray = [
    {text: 'AC'}, {text: 'DEL'}, {text: '%'}, {text: '+'},
    {text: '7'}, {text: '8'}, {text: '9'}, {text: '-'},
    {text: '4'}, {text: '5'}, {text: '6'}, {text: '*'},
    {text: '1'}, {text: '2'}, {text: '3'}, {text: '/'},
    {text: '0'}, {text: '00'}, {text: '.'}, {text: '='},
];

buttonArray.forEach(item => {
    const btn = document.createElement("button");
    btn.classList.add("button-style");
    btn.textContent = item.text;
    buttonContainer.appendChild(btn);
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
