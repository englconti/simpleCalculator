class View {
  // Selecting screen
  _screen = document.querySelector("#screen");

  // Selecting buttons
  one = document.querySelector("#one");
  two = document.querySelector("#two");
  three = document.querySelector("#three");
  four = document.querySelector("#four");
  five = document.querySelector("#five");
  six = document.querySelector("#six");
  seven = document.querySelector("#seven");
  eight = document.querySelector("#eight");
  nine = document.querySelector("#nine");
  zero = document.querySelector("#zero");
  separator = document.querySelector("#separator");
  plus = document.querySelector("#plus");
  minus = document.querySelector("#minus");
  equal = document.querySelector("#equal");
  division = document.querySelector("#division");
  multiply = document.querySelector("#multiply");
  del = document.querySelector("#del");
  clear = document.querySelector("#clear");

  // Array of numeral buttons
  numberBtns = [one, two, three, four, five, six, seven, eight, nine, zero];

  // Array to store the numbers on screen
  _valueTyped = [];

  // Variable to keep the numbers from screen
  _screenShow = "";

  // Array to keep the values and operations in order
  _sequence = [];

  /**
   * @param {string} msg
   */
  set screenMessage(msg) {
    this._screen.textContent = msg;
  }

  // Operation method
  operation() {
    let res;

    if (this._sequence.length >= 2) {
      if (this._sequence[this._sequence.length - 1] == "+") {
        res = this._sequence[0] + Number(this._screenShow);
      }
      if (this._sequence[this._sequence.length - 1] == "-") {
        res = this._sequence[0] - Number(this._screenShow);
      }
      if (this._sequence[this._sequence.length - 1] == "*") {
        res = this._sequence[0] * Number(this._screenShow);
      }
      if (this._sequence[this._sequence.length - 1] == "/") {
        res = this._sequence[0] / Number(this._screenShow);
      }

      this._screenShow = res;
      this._screen.textContent = this._screenShow;
      this._valueTyped = [];
      this._sequence = [];
      this._sequence.push(this._screenShow);
      this._screenShow = "";
    }
  }

  // Deletion method
  deletion() {
    if (this._valueTyped.length != "") {
      this._valueTyped.pop();
      this._screenShow = this._valueTyped.join("");
      this._screen.textContent = this._screenShow;
    }
  }

  // Numbers operation method
  numbersOperation(number, screenLength) {
    this._screen.textContent = this._screenShow;
    if (this._valueTyped.length <= screenLength - 1) {
      this._valueTyped.push(number.textContent);
      this._screenShow = this._valueTyped.join("");
      this._screen.textContent = this._screenShow;
    }
  }

  // Clear method
  clearCalc() {
    this._valueTyped = [];
    this._screenShow = "";
    this._sequence = [];
    this._screen.textContent = this._screenShow;
  }

  sepOperation() {
    if (this._valueTyped.indexOf(".") == -1) {
      this._valueTyped.push(separator.textContent);
      this._screenShow = this._valueTyped.join("");
      this._screen.textContent = this._screenShow;
    }
  }

  // Minus operation
  minusOperation() {
    // Adding a - as first element
    if (this._valueTyped.length === 0 && this._sequence.length === 0) {
      this._valueTyped.push(this.minus.textContent);
      this._screenShow = this._valueTyped.join("");
      this._screen.textContent = this._screenShow;
    } else this.commonLogic(this.minus);
  }

  plusDivisionMultiply(operator) {
    // Deleting first element if is a '-'
    if (this._valueTyped.length === 1 && this._valueTyped[0] === "-") {
      deletion();
      return;
    }
    // Not considering first this._sequence element as +, * or /
    if (this._valueTyped.length === 0 && this._sequence.length === 0) {
      return;
    }
    this.commonLogic(operator);
  }

  // Function with shared logic for all +,-,* and / operators
  commonLogic(operator) {
    // Using operator buttons as "equal" to proceed to next operation
    if (
      this._sequence.length >= 2 &&
      this._valueTyped.length !== 0 &&
      this._screenShow != 0 &&
      this._screenShow != "."
    ) {
      this.operation(this._sequence);
      this._sequence.push(operator.textContent);
      console.log("Operation with operators");
    }
    // If there is something on the this._sequence already
    else if (this._sequence.length !== 0) {
      // Replacing operator
      if (
        typeof this._sequence[this._sequence.length - 1] == "string" &&
        this._screenShow === "" &&
        this._sequence[0] !== "-"
      ) {
        this._sequence[this._sequence.length - 1] = operator.textContent;
        console.log("Replacing operators");
        console.log(this._sequence);
      }
      // Checking if there is only "."
      else if (
        typeof this._sequence[this._sequence.length - 1] == "string" &&
        this._screenShow != 0 &&
        this._screenShow != "."
      ) {
        this._sequence.push(Number(this._screenShow));
        this._sequence.push(operator.textContent);
        this._valueTyped = [];
        this._screenShow = "";

        console.log("pushing number and operator");
        console.log(this._sequence);
      }
      // Adding values
      else if (typeof this._sequence[this._sequence.length - 1] == "number") {
        this._sequence.push(operator.textContent);
        this._valueTyped = [];
        this._screenShow = "";

        console.log("pushing operator only");
        console.log(this._sequence);
      }
    }

    // Checking if this._sequence is empty
    if (this._sequence.length === 0) {
      // Add operator if there is nothing on screen
      if (this._screenShow == "") {
        this._sequence.push(operator.textContent);

        console.log(this._sequence);
      }
      // Stop adding only "." or "0000...""
      else if (this._screenShow != 0 && this._screenShow != ".") {
        this._sequence.push(Number(this._screenShow));
        this._sequence.push(operator.textContent);
        this._valueTyped = [];
        this._screenShow = "";
      }
    }
  }
}

export default new View();
