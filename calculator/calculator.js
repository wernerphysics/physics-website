// Grab elements from the DOM
const display = document.getElementById('display');
const equals = document.getElementById('btn-equals');
const clear = document.getElementById('btn-clear');
const numKeys = [...document.getElementsByClassName('number')];
const decimal = document.getElementById('btn-dec');
const operators = [...document.getElementsByClassName('operator')];
const buttons = [...document.getElementsByClassName('button')];

let isDecimal = false;
let isCached = false;
let cache = 0;
let nextOp;

// Buttons flash when clicked
buttons.forEach((button) => {
    origColor = button.style.backgroundColor;
    button.onmousedown = () => {
        button.style.backgroundColor = '#eeeeee';
    };
    button.onmouseup = () => {
        button.style.backgroundColor = origColor;
    }
});

// Define number key behavior
numKeys.forEach((num) => {
    num.onclick = () => {
        if(display.textContent === '0' || isCached) {
            display.textContent = num.textContent;
            isCached = false;
        } else {
            display.textContent += num.textContent;
        }
    }
});

// Define decimal point behavior. Don't add a decimal point
// if there already is one.
decimal.onclick = () => {
    if(!isDecimal) {
        display.textContent += '.';
        isDecimal = true;
    }
};

// Define equals behavior
equals.onclick = () => {
    cache = parseFloat(cache);
    switch(nextOp) {
        case "+":
            display.textContent = cache + parseFloat(display.textContent);
            break;
        case "-":
            display.textContent = cache - display.textContent;
            break;
        case "*":
            display.textContent *= cache;
            break;
        case "/":
            display.textContent = cache / display.textContent;
            break;
        default:
            console.log("Operator not selected.");
    }
    isCached = true;
};

// Define clear behavior
clear.onclick = () => {
    display.textContent = 0;
    isDecimal = false;
};

// Define operator behavior
operators.forEach((opKey) => {
    opKey.onclick = () => {
        cache = display.textContent;
        isCached = true;
        nextOp = opKey.textContent;
    }
});
