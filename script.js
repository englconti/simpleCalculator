"use strict";

/* TO BE CONSTRUCTED:

1) Function to validate length of final number (avoid something like 5864.21870317684716);

2) Possibility to add negative numbers at the beginning;

3) Separate script.js in different files using modulation (try something like Model-View-Controller architecture);

4) Refactor some code into specific functions;

5) Make code more clear;

*/

// Selecting screen
const screen = document.querySelector("#screen");

// Selecting buttons
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const zero = document.querySelector("#zero");
const separator = document.querySelector("#separator");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const equal = document.querySelector("#equal");
const division = document.querySelector("#division");
const multiply = document.querySelector("#multiply");
const del = document.querySelector("#del");
const clear = document.querySelector("#clear");

// Array of numeral buttons
const numberBtns = [one, two, three, four, five, six, seven, eight, nine, zero];

// Array to store the numbers on screen
let valueTyped = [];

// Variable to keep the numbers from screen
let screenShow = "";

// Array to keep the values and operations in order
let sequence = [];

// Initial screen message
screen.textContent = "hello :)";

// Function to investigate code in console - only used during coding
const logging = () => {
  console.log("sequence: ", sequence);
  console.log("valueTyped:", valueTyped);
  console.log("screenShow: ", screenShow);
};

// Operation function
const operation = function (arr) {
  let res;
  if (arr.length === 2) {
    if (arr[1] == "+") {
      res = arr[0] + Number(screenShow);
    }
    if (arr[1] == "-") {
      res = arr[0] - Number(screenShow);
    }
    if (arr[1] == "*") {
      res = arr[0] * Number(screenShow);
    }
    if (arr[1] == "/") {
      res = arr[0] / Number(screenShow);
    }
    screenShow = res;
    screen.textContent = screenShow;
    valueTyped = [];
    sequence = [];
    sequence.push(screenShow);
    screenShow = "";

    // logging();
  }
};

// NUMERAL BUTTONS -- OK
numberBtns.map((number) =>
  number.addEventListener("click", function () {
    screen.textContent = screenShow;
    if (valueTyped.length <= 7) {
      valueTyped.push(number.textContent);
      screenShow = valueTyped.join("");
      screen.textContent = screenShow;

      // logging();
    }
  })
);

// SEPARATOR BUTTON -- OK
separator.addEventListener("click", function () {
  if (valueTyped.indexOf(".") == -1) {
    valueTyped.push(separator.textContent);
    screenShow = valueTyped.join("");
    screen.textContent = screenShow;
  }
});

// DEL BUTTON -- OK
del.addEventListener("click", function () {
  if (valueTyped.length != "") {
    valueTyped.pop();
    screenShow = valueTyped.join("");
    screen.textContent = screenShow;
  }
});

// CLEAR BUTTON -- OK
clear.addEventListener("click", function () {
  valueTyped = [];
  screenShow = "";
  sequence = [];
  screen.textContent = screenShow;

  // logging();
});

// PLUS & DIVISION & MULTIPLY BUTTONS
[plus, division, multiply, minus].map((operator) =>
  operator.addEventListener("click", function () {
    // Not considering first sequence element as +, -, * or /
    if (valueTyped.length === 0 && sequence.length === 0) {
      if (
        operator.textContent === "*" ||
        operator.textContent === "+" ||
        operator.textContent === "/" ||
        operator.textContent === "-"
      )
        return;
    }

    // Using operator buttons as "equal" to proceed to next operation
    if (
      sequence.length >= 2 &&
      valueTyped.length !== 0 &&
      screenShow != 0 &&
      screenShow != "."
    ) {
      operation(sequence);
      sequence.push(operator.textContent);
      // console.log("Operation with operators");
      // logging();
    }
    // If there is something on the sequence already
    else if (sequence.length !== 0) {
      // Replacing operator
      if (
        typeof sequence[sequence.length - 1] == "string" &&
        screenShow === ""
      ) {
        sequence[sequence.length - 1] = operator.textContent;
        // console.log("Replacing operators");
        // console.log(sequence);
      }
      // Checking if there is only "."
      else if (
        typeof sequence[sequence.length - 1] == "string" &&
        screenShow != 0 &&
        screenShow != "."
      ) {
        sequence.push(Number(screenShow));
        sequence.push(operator.textContent);
        valueTyped = [];
        screenShow = "";

        // console.log("pushing number and operator");
        // console.log(sequence);
      }
      // Adding values
      else if (typeof sequence[sequence.length - 1] == "number") {
        sequence.push(operator.textContent);
        valueTyped = [];
        screenShow = "";

        // console.log("pushing operator only");
        // console.log(sequence);
      }
    }

    // Checking if sequence is empty
    if (sequence.length === 0) {
      // Add operator if there is nothing on screen
      if (screenShow == "") {
        sequence.push(operator.textContent);

        console.log(sequence);
      }
      // Stop adding only "." or "0000...""
      else if (screenShow != 0 && screenShow != ".") {
        sequence.push(Number(screenShow));
        sequence.push(operator.textContent);
        valueTyped = [];
        screenShow = "";

        console.log("sequence: ", sequence);
        console.log("valueTyped:", valueTyped);
        console.log("screenShow: ", screenShow);
      }
    }
  })
);

// EQUAL BUTTON
equal.addEventListener("click", function () {
  operation(sequence);
});

// TESTING .toExponential()
// const num = 12321431;
// const numExp = num.toExponential(2);
// console.log(num);
// console.log("typeof num: ", typeof num);
// console.log(numExp); // 1.23e+7
// console.log("typeof numExp: ", typeof numExp);
// console.log(numExp + 20);
// console.log(+numExp + 20);
