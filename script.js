const keys = document.querySelectorAll(".keys button");
const display = document.querySelector("#display");
const history = document.querySelector("#history");
const clear = document.querySelector("#clear");
let operator, number1, number2;

function handleKeyboard(e) {
  //handles numbers
  e.preventDefault();
  if (e.keyCode >= 48 && e.keyCode <= 57 && !e.shiftKey) {
    handle((e.keyCode - 48).toString());
  } else if (e.shiftKey && e.keyCode == 187) {
    handle("+");
  } else if (e.shiftKey && e.keyCode == 56) {
    handle("*");
  } else if (e.keyCode == 187 || e.keyCode == 13) {
    handle("=");
  } else if (e.keyCode == 189) {
    handle("-");
  } else if (e.keyCode == 191) {
    handle("/");
  } else if (e.keyCode == 8) {
    backspace();
  }
}

document.onkeydown = handleKeyboard;

keys.forEach((key) =>
  key.addEventListener("click", (e) => {
    handle(key.textContent);
  })
);

//handles input
function handle(string) {
  console.log(string);
  if (string == "=") {
    evaluate();
    return;
  } else if (string.match(/[+\-*/]/)) {
    updateValues();
    //evaluate if ready
    if (operator && number1 && number2) evaluate();
    //Dose nothing when operator is already set
    else if (operator) return;
  } else if (string.match(/[1-9]/)) {
    //removes initial zero
    if (display.innerText == "0") {
      display.innerText = "";
    }
  } else if (string == ".") {
    //checks if the numbers already have a .
    updateValues();
    if (operator) {
      if (number2.includes(".")) {
        return;
      }
    } else if (number1.includes(".")) {
      return;
    }
  }
  display.innerText += string;
}
clear.addEventListener("click", () => {
  display.innerText = "0";
  number1 = 0;
  number2 = 0;
  operator = "";
});

function add(number1, number2) {
  return number1 + number2;
}
function subtract(number1, number2) {
  return number1 - number2;
}
function multiply(number1, number2) {
  return number1 * number2;
}
function divide(number1, number2) {
  if (number2 == 0) {
    alert("You can't divide by 0!");
    return 0;
  }
  return number1 / number2;
}

function operate(operator, number1, number2) {
  let func = function () {};
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
  return Math.round(func(number1, number2) * 100) / 100;
}
function evaluate() {
  updateValues();
  history.innerText = display.innerText;
  display.innerText = operate(operator, Number(number1), Number(number2));
  updateValues();
}
function updateValues() {
  const firstChar = display.innerText.substring(0, 1);
  const rest = display.innerText.substring(1);
  [number1, number2] = rest.split(/[+\-*/]/);
  number1 = firstChar + number1;
  operator = display.innerText
    .replace(`${number1}`, "")
    .replace(`${number2}`, "");
}
function backspace() {
  display.textContent = display.textContent.toString().slice(0, -1);
}
