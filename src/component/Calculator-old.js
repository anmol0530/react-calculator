import { Component } from "react";
import Display from "./Display";
import History from "./History";
import FloatingHistoryButton from "./FloatingHistoryButton";
import KeyboardShortcuts from "./KeyboardShortcuts";
import { Switch, Route } from "react-router-dom";
import Keypad from "./Keypad";
import ScientificKeypad from "./ScientificKeypad";

export default class Calculator extends Component {
  state = {
    value: null,
    displayValue: "0",
    operator: null,
    waitingForOperand: false,
    deg: true,
    history: [],
    showHistory: false,
    currentExpression: "",
    isScientificMode: false,
  };

  clearAll = () => {
    this.setState({
      value: null,
      displayValue: "0",
      operator: null,
      waitingForOperand: false,
      currentExpression: "",
    });
  };

  clearDisplay = () => {
    this.setState({
      displayValue: "0",
    });
  };

  clearLastChar = () => {
    const { displayValue } = this.state;

    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || "0",
    });
  };

  toggleDeg = () => {
    const { deg } = this.state;
    this.setState({ deg: !deg });
  };

  toggleSign = () => {
    const { displayValue } = this.state;
    const newValue = parseFloat(displayValue) * -1;

    this.setState({
      displayValue: String(newValue),
    });
  };

  inputPercent = () => {
    const { displayValue } = this.state;
    const currentValue = parseFloat(displayValue);

    if (currentValue === 0) return;

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
    const newValue = parseFloat(displayValue) / 100;

    this.setState({
      displayValue: String(newValue.toFixed(fixedDigits.length + 2)),
    });
  };

  inputDot = () => {
    const { displayValue } = this.state;

    if (!/\./.test(displayValue)) {
      this.setState({
        displayValue: displayValue + ".",
        waitingForOperand: false,
      });
    }
  };

  inputDigit = (digit) => {
    const { displayValue, waitingForOperand, currentExpression } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
        currentExpression: currentExpression + String(digit)
      });
    } else {
      this.setState({
        displayValue:
          displayValue === "0" ? String(digit) : displayValue + digit,
        currentExpression: 
          currentExpression === "" || currentExpression === "0" 
            ? String(digit) 
            : currentExpression + String(digit)
      });
    }
  };

  // History management methods
  loadHistoryFromStorage = () => {
    try {
      const savedHistory = localStorage.getItem('calculator-history');
      if (savedHistory) {
        this.setState({ history: JSON.parse(savedHistory) });
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  saveHistoryToStorage = (history) => {
    try {
      localStorage.setItem('calculator-history', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  addToHistory = (expression, result) => {
    const newHistoryItem = {
      expression,
      result,
      timestamp: new Date().toLocaleTimeString()
    };

    this.setState(prevState => {
      const newHistory = [newHistoryItem, ...prevState.history].slice(0, 50); // Keep last 50 calculations
      this.saveHistoryToStorage(newHistory);
      return { history: newHistory };
    });
  };

  clearHistory = () => {
    this.setState({ history: [] });
    localStorage.removeItem('calculator-history');
  };

  toggleHistory = () => {
    this.setState(prevState => ({
      showHistory: !prevState.showHistory
    }));
  };

  selectFromHistory = (result) => {
    this.setState({
      displayValue: String(result),
      value: result,
      operator: null,
      waitingForOperand: false,
      currentExpression: String(result)
    });
  };

  toggleCalculatorMode = () => {
    this.setState(prevState => ({
      isScientificMode: !prevState.isScientificMode
    }));
  };

  CalculatorOperations = {
    "/": (prevValue, nextValue) => prevValue / nextValue,
    "*": (prevValue, nextValue) => prevValue * nextValue,
    "+": (prevValue, nextValue) => prevValue + nextValue,
    "-": (prevValue, nextValue) => prevValue - nextValue,
    "**": (prevValue, nextValue) => prevValue ** nextValue,
    sin: (prevValue, nextValue) =>
      this.state.deg
        ? Math.sin((nextValue * Math.PI) / 180)
        : Math.sin(nextValue),
    "sin⁻¹": (prevValue, nextvalue) =>
      this.state.deg
        ? (Math.asin(nextvalue) * 180) / Math.PI
        : Math.asin(nextvalue),
    cos: (prevValue, nextValue) =>
      this.state.deg
        ? Math.cos((nextValue * Math.PI) / 180)
        : Math.cos(nextValue),
    "cos⁻¹": (prevValue, nextvalue) =>
      this.state.deg
        ? (Math.acos(nextvalue) * 180) / Math.PI
        : Math.acos(nextvalue),
    tan: (prevValue, nextValue) =>
      this.state.deg
        ? Math.tan((nextValue * Math.PI) / 180)
        : Math.tan(nextValue),
    "tan⁻¹": (prevValue, nextvalue) =>
      this.state.deg
        ? (Math.atan(nextvalue) * 180) / Math.PI
        : Math.atan(nextvalue),
    lg: (prevValue, nextValue) => Math.log10(nextValue),
    ln: (prevValue, nextValue) => Math.log(nextValue),
    "10ˣ": (prevValue, nextValue) => Math.pow(10, nextValue),
    eˣ: (prevValue, nextValue) => Math.exp(nextValue),
    "√": (prevValue, nextValue) => Math.sqrt(nextValue),
    "!": (prevValue, nextValue) => this.factorial(nextValue),
    "1/x": (prevValue, nextValue) => 1 / nextValue,
    π: () => Math.PI,
    e: () => Math.E,
    "=": (prevValue, nextValue) => nextValue,
  };

  performOperation = (nextOperator) => {
    const { value, displayValue, operator, currentExpression } = this.state;
    const inputValue = parseFloat(displayValue);

    if (value == null) {
      this.setState({
        value: inputValue,
        currentExpression: currentExpression + this.getOperatorSymbol(nextOperator)
      });
    } else if (operator) {
      const currentValue = value || 0;
      let newValue;
      try {
        newValue = this.CalculatorOperations[operator](currentValue, inputValue);
        
        // Handle mathematical errors
        if (isNaN(newValue) || !isFinite(newValue)) {
          newValue = "Error";
        }
      } catch (error) {
        newValue = "Error";
      }

      // If this is equals operation, add to history
      if (nextOperator === "=") {
        const expression = currentExpression;
        if (newValue !== "Error") {
          this.addToHistory(expression, newValue);
        }
        this.setState({
          value: newValue === "Error" ? null : newValue,
          displayValue: String(newValue),
          currentExpression: newValue === "Error" ? "" : String(newValue)
        });
      } else {
        if (newValue === "Error") {
          this.setState({
            value: null,
            displayValue: "Error",
            currentExpression: "",
            waitingForOperand: true,
            operator: null
          });
          return;
        }
        this.setState({
          value: newValue,
          displayValue: String(newValue),
          currentExpression: currentExpression + this.getOperatorSymbol(nextOperator)
        });
      }
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator,
    });
  };

  getOperatorSymbol = (operator) => {
    const symbols = {
      "+": " + ",
      "-": " - ",
      "*": " × ",
      "/": " ÷ ",
      "**": " ^ ",
      "=": " = ",
      "√": "√",
      "sin": "sin(",
      "cos": "cos(",
      "tan": "tan(",
      "sin⁻¹": "sin⁻¹(",
      "cos⁻¹": "cos⁻¹(",
      "tan⁻¹": "tan⁻¹(",
      "lg": "lg(",
      "ln": "ln(",
      "10ˣ": "10^",
      "eˣ": "e^",
      "!": "!",
      "1/x": "1/",
      "π": "π",
      "e": "e"
    };
    return symbols[operator] || ` ${operator} `;
  };

  factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let f = 1;
    for (let i = 2; i <= n; i++) {
      f = f * i;
    }
    return f;
  };

  handleKeyDown = (event) => {
    let { key } = event;

    if (key === "Enter") key = "=";

    if (/\d/.test(key)) {
      event.preventDefault();
      this.inputDigit(parseInt(key, 10));
    } else if (key in this.CalculatorOperations) {
      event.preventDefault();
      this.performOperation(key);
    } else if (key === ".") {
      event.preventDefault();
      this.inputDot();
    } else if (key === "%") {
      event.preventDefault();
      this.inputPercent();
    } else if (key === "Backspace") {
      event.preventDefault();
      this.clearLastChar();
    } else if (key === "Clear" || key === "Escape") {
      event.preventDefault();

      if (this.state.displayValue !== "0") {
        this.clearDisplay();
      } else {
        this.clearAll();
      }
    } else if (key === "c" || key === "C") {
      event.preventDefault();
      this.clearDisplay();
    } else if (key === "h" || key === "H") {
      event.preventDefault();
      this.toggleHistory();
    } else if (key === "s" || key === "S") {
      event.preventDefault();
      this.toggleCalculatorMode();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    this.loadHistoryFromStorage();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const { displayValue, deg, history, showHistory, isScientificMode } = this.state;
    return (
      <div className="calculator">
        <Display value={displayValue} />
        {isScientificMode ? (
          <ScientificKeypad
            displayValue={displayValue}
            deg={deg}
            clearDisplay={this.clearDisplay}
            toggleSign={this.toggleSign}
            toggleDeg={this.toggleDeg}
            clearAll={this.clearAll}
            inputPercent={this.inputPercent}
            inputDigit={this.inputDigit}
            inputDot={this.inputDot}
            performOperation={this.performOperation}
            toggleCalculatorMode={this.toggleCalculatorMode}
            isScientificMode={isScientificMode}
          />
        ) : (
          <Keypad
            displayValue={displayValue}
            clearDisplay={this.clearDisplay}
            toggleSign={this.toggleSign}
            clearAll={this.clearAll}
            inputPercent={this.inputPercent}
            inputDigit={this.inputDigit}
            inputDot={this.inputDot}
            performOperation={this.performOperation}
            toggleCalculatorMode={this.toggleCalculatorMode}
            isScientificMode={isScientificMode}
          />
        )}
        <History
          history={history}
          isVisible={showHistory}
          onSelectCalculation={this.selectFromHistory}
          onClearHistory={this.clearHistory}
          onToggleHistory={this.toggleHistory}
        />
        <FloatingHistoryButton 
          onClick={this.toggleHistory}
          showHistory={showHistory}
        />
        <KeyboardShortcuts />
      </div>
    );
  }
}
