function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply() {
    let product = 1;
    arguments.forEach(number => {
        product *= number;
    });
    return product;
}
function divide(a, b) {
    return a / b;
}
function operate(operator, a, b) {
    let func = function () { };
    switch (operator) {
        case "+":
            func = add;
        case "-":
            func = subtract;
        case "*":
            func = multiply;
        case "/":
            func = divide;
    }
    return func(a, b);
}
// for (let i = 1; i < 10; i++) {
//     let button = document.createElement("button");
//     button.textContent = i;
//     document.body.appendChild(button);
// }
