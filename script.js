class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number, operation) {
    if (number === '.' && this.currentOperand.includes('.')) {
      return;
    }

    if (this.operation != '=') {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString();
    }
    if (this.currentOperand.length >= 17) {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') {
      return;
    }

    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) {
      return;
    }

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '÷':
        computation = prev / current;
        break;
      case '*':
        computation = prev * current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandText.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach((button) => {
  button.addEventListener('click' || 'touch', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click' || 'touch', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
    calculator.appendNumber();
  });
});

equalsButton.addEventListener('click' || 'touch', (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click' || 'touch', (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click' || 'touch', (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
