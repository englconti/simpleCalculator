import view from "./View.js";
import { INITIAL_TEXT, SCREEN_LENGTH } from "./config.js";

// INITIAL SCREEN MESSAGE
view.screenMessage = INITIAL_TEXT;

// EQUAL BUTTON
view.equal.addEventListener("click", view.operation.bind(view));

// DEL BUTTON
view.del.addEventListener("click", view.deletion.bind(view));

// CLEAR BUTTON
view.clear.addEventListener("click", view.clearCalc.bind(view));

// NUMERAL BUTTONS
view.numberBtns.map((number) =>
  number.addEventListener("click", function () {
    view.numbersOperation(number, SCREEN_LENGTH);
  })
);

// SEPARATOR BUTTON
view.separator.addEventListener("click", view.sepOperation.bind(view));

// MINUS BUTTON
view.minus.addEventListener("click", view.minusOperation.bind(view));

// PLUS & DIVISION & MULTIPLY
[view.plus, view.division, view.multiply].map((operator) =>
  operator.addEventListener("click", function () {
    view.plusDivisionMultiply(operator);
  })
);
