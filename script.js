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
const keys = document.querySelectorAll(".keys button");
const display = document.querySelector("#display");
const history = document.querySelector("#history");
const clear = document.querySelector("#clear");
keys.forEach((key => key.addEventListener("click", (e) => {
    if (key.textContent == "=") { evaluate(); return; }
    else if (key.textContent.match(/[+\-*/]/)) {
        if (display.innerText.substring(1).match(/[+\-*/]/)) {
            if (display.innerText.substring(1, text.length - 1).match(/[+\-*/]/)) return;
            evaluate();
        }
    }
    else if (key.textContent.match(/[1-9]/)) {
        if (display.innerText == "0") {
            display.innerText = "";
        }
    }
    else if (key.textContent == ".") {
        if (evaluate(1)[1]) {
            if (evaluate(1)[1].includes(".")) return;
        } else if (evaluate(1)[0].includes(".")) return;
    }
    display.innerText += key.textContent;
})))
function evaluate(p) {
    let firstChar = display.innerText.substring(0, 1);
    let rest = display.innerText.substring(1);
    let [a, b] = rest.split(/[+\-*/]/);
    a = firstChar + a;
    let operator = display.innerText.replace(`${a}`, '').replace(`${b}`, '')
    if (p) return [a, b, operator];
    history.innerText = display.innerText;
    display.innerText = operate(operator, Number(a), Number(b));
    console.table(a)
    console.log(b);
    console.log(operator)
}
clear.addEventListener("click", () => {
    display.innerText = "0";
    number1 = 0;
    number2 = 0;
    operator = "";
})
function backspace() {
    display.textContent = display.textContent
        .toString()
        .slice(0, -1)
}