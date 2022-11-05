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
// deals with what to do when numbers are pressed
const numbers = document.querySelectorAll(".number");
const display = document.querySelector("#display");
let operation, number1, number2;
numbers.forEach((number) => number.addEventListener("click", (e) => {
    if (display.innerText == "0") display.innerText = "";
    // ensures that the user can't type more than one "."
    if (e.target.innerText == ".") {
        if (number1) {
            let num = number1.toString();
            if (num.substring(0, 2) == "0.") {
                num = num.replace("0.", ".");
            }
            if (display.innerText.replace(`${num}`, '').includes(".")) return;
        }
    }
    display.innerText += e.target.innerText;
}));
// deals with what to do when operation keys are pressed
const operations = document.querySelectorAll(".operation");
const history = document.querySelector("#history");
operations.forEach((o) => o.addEventListener("click", (e) => {
    if (e.target.innerText == "=") {
        getNumber2();
    } else if (operation) {
        getNumber2();
        getNumber1(e);
    } else {
        getNumber1(e);
    }
}));
function getNumber1(e) {
    //swaps the operation
    if (display.innerText.toString().match(/[+\-*/]/g)) backspace();
    number1 = Number(display.innerText);
    operation = e.target.innerText;
    display.innerText += operation;
}
function getNumber2() {
    number2 = Number(display.innerText.split(/[+\-*/]/g)[1]);
    if (number2) {
        history.innerText = display.innerText;
        display.innerText = operate(operation, number1, number2);
        number1 = Number(display.innerText);
        operation = null;
    }
}
const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    display.innerText = "0";
    number1 = 0;
    number2 = 0;
    operation = "";
})
function backspace() {
    display.textContent = display.textContent
        .toString()
        .slice(0, -1)
}