function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b == 0) {
        alert("You can't divide by 0!");
        return 0;
    };
    return a / b;
}
function operate(operator, a, b) {
    let func = function () { };
    switch (operator) {
        case "+":
            func = add;
            break;
        case "-":
            func = subtract;
            break;
        case "*":
            func = multiply;
            break;
        case "/":
            func = divide;
            break;
        default:
            return "error";
    }
    return Math.round((func(a, b) * 100)) / 100;
}
const numbers = document.querySelectorAll(".numbers");
const display = document.querySelector("#display");
let operation, number1, number2;

numbers.forEach((number) => number.addEventListener("click", (e) => {
    if (display.innerText == "0") display.innerText = "";
    display.innerText += e.target.innerText;
}));
const operations = document.querySelectorAll(".operations");
operations.forEach((operation) => operation.addEventListener("click", (e) => {
    if ((e.target.innerText == "=") || !(e.target.innerText)) {
        number2 = Number(display.innerText.split(/[+\-*/]/g)[1]);
        display.innerText = operate(operation, number1, number2);
        operation = 0;

    } else {
        number1 = Number(display.innerText);
        display.innerText += e.target.innerText;
        operation = e.target.innerText;
    }
}));
const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    display.innerText = "0";
    number1 = 0;
    number2 = 0;
    operation = "";
})