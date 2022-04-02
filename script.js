"use strict";

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
let screenShow;

// Array to keep the values and operations in order
let sequence = [];

// NUMERAL BUTTONS -- OK
numberBtns.map((number) =>
  number.addEventListener("click", function () {
    screen.textContent = screenShow;
    if (valueTyped.length <= 7) {
      valueTyped.push(number.textContent);
      screenShow = valueTyped.join("");
      screen.textContent = screenShow;
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
});

// PLUS & DIVISION & MULTIPLY BUTTONS
[plus, division, multiply].map((operator) =>
  operator.addEventListener("click", function () {
    // Checking if there is something typed != "."
    if (
      valueTyped[valueTyped.length - 1] > 0 ||
      valueTyped[valueTyped.length - 1] < 0
    ) {
      sequence.push(Number(screenShow));
      sequence.push(operator.textContent);
      console.log(sequence);
      valueTyped = [];
      screenShow = "";
    }
    // Replacing operator
    if (typeof sequence[sequence.length - 1] == "string") {
      sequence[sequence.length - 1] = operator.textContent;
      console.log(sequence);
    }
  })
);

// MINUS BUTON
minus.addEventListener("click", function () {
  // Replacing operator
  if (typeof sequence[sequence.length - 1] == "string") {
    sequence[sequence.length - 1] = minus.textContent;
    console.log(sequence);
  } else if (sequence.length === 0) {
    sequence.push(minus.textContent);
    console.log(sequence);
  } else {
    sequence.push(Number(screenShow));
    sequence.push(operator.textContent);
    console.log(sequence);
    valueTyped = [];
    screenShow = "";
  }
});

// EQUAL BUTTON
equal.addEventListener("click", function () {
  console.log(sequence);
});
