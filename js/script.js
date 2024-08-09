class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
					this.previousOperandTextElement = previousOperandTextElement; // Store reference to the element displaying previous operand
					this.currentOperandTextElement = currentOperandTextElement; // Store reference to the element displaying current operand
					this.clear(); // Initialize calculator by clearing all operands and operation
	}

	clear() {
					this.currentOperand = ''; // Clear current operand
					this.previousOperand = ''; // Clear previous operand
					this.operation = undefined; // Clear operation
	}

	delete() {
					this.currentOperand = this.currentOperand.slice(0, -1); // Remove last character from current operand
	}

	appendNumber(number) {
					if (number === '.' && this.currentOperand.includes('.')) return; // Ensure only one decimal point in the operand
					this.currentOperand = this.currentOperand.toString() + number.toString(); // Append number to current operand
	}

	chooseOperation(operation) {
					if (this.currentOperand === '') return; // Operation cannot be chosen if current operand is empty
					if (this.previousOperand !== '') {
									this.compute(); // Compute result if previous operand exists
					}
					this.operation = operation; // Set chosen operation
					this.previousOperand = this.currentOperand; // Store current operand as previous operand
					this.currentOperand = ''; // Clear current operand for next input
	}

	compute() {
					let computation; // Variable to store the result of computation
					const prev = parseFloat(this.previousOperand); // Convert previous operand to float
					const current = parseFloat(this.currentOperand); // Convert current operand to float
					if (isNaN(prev) || isNaN(current)) return; // Check if either operand is not a number
					switch (this.operation) { // Perform operation based on chosen operation
									case '+':
													computation = prev + current;
													break;
									case '-':
													computation = prev - current;
													break;
									case '*':
													computation = prev * current;
													break;
									case '/':
													computation = prev / current;
													break;
									default:
													return;
					}
					this.currentOperand = computation; // Set current operand to the computed result
					this.operation = undefined; // Clear operation
					this.previousOperand = ''; // Clear previous operand
	}

	getDisplayNumber(number) {
					const stringNumber = number.toString(); // Convert number to string
					const integerDigits = parseFloat(stringNumber.split('.')[0]); // Get integer part of number
					const decimalDigits = stringNumber.split('.')[1]; // Get decimal part of number
					let integerDisplay;
					if (isNaN(integerDigits)) {
									integerDisplay = ''; // Set integer display to empty if integer part is not a number
					}   else {
									integerDisplay = integerDigits.toLocaleString('en', {
													maximumFractionDigits: 0 }); // Format integer part with commas
					}
					if (decimalDigits != null) {
									return `${integerDisplay}.${decimalDigits}`; // Return formatted number with decimal part
					}   else {
									return integerDisplay; // Return formatted integer part only
					}
	}

	updateDisplay() {
					this.currentOperandTextElement.innerText = 
									this.getDisplayNumber(this.currentOperand); // Update current operand display with formatted number
					if (this.operation != null) {
									this.previousOperandTextElement.innerText =
													`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`; // Update previous operand display with formatted number and operation
					}   else {
									this.previousOperandTextElement.innerText = ''; // Clear previous operand display if no operation is chosen
					}
	}
}

// DOM Selections
const numberButtons = document.querySelectorAll('[data-number]'); // Select all number buttons
const operationButtons = document.querySelectorAll('[data-operation]'); // Select all operation buttons
const equalsButton = document.querySelector('[data-equals]'); // Select the equals button
const deleteButton = document.querySelector('[data-delete]'); // Select the delete button
const allClearButton = document.querySelector('[data-all-clear]'); // Select the all-clear button
const previousOperandTextElement = document.querySelector(
	'[data-previous-operand]'); // Select the element displaying previous operand
const currentOperandTextElement = document.querySelector(
	'[data-current-operand]'); // Select the element displaying current operand

// Calculator instance creation
const calculator = new Calculator(previousOperandTextElement, 
	currentOperandTextElement); // Initialize a new calculator instance

// Event listeners for number buttons
numberButtons.forEach(button => {
	button.addEventListener('click', () => {
					calculator.appendNumber(button.innerText); // Append clicked number to current operand
					calculator.updateDisplay(); // Update display
	});
});

// Event listeners for operation buttons
operationButtons.forEach(button => {
	button.addEventListener('click', () => {
					calculator.chooseOperation(button.innerText); // Choose operation based on clicked button
					calculator.updateDisplay();
	});
});

// Event listener for equals button
equalsButton.addEventListener('click', button => {
	calculator.compute(); // Compute result
	calculator.updateDisplay(); // Update display
});

// Event listener for all-clear button
allClearButton.addEventListener('click', button => {
	calculator.clear(); // Clear calculator
	calculator.updateDisplay(); // Update display
});

// Event listener for delete button
deleteButton.addEventListener('click', button => {
	calculator.delete(); // Delete last character from current operand
	calculator.updateDisplay(); // Update display
});