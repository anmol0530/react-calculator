import { Component } from "react";
import Display from "./Display";
import { Switch, Route, Redirect } from "react-router-dom";
import Keypad from "./Keypad";
import ScientificKeypad from "./ScientificKeypad";

export default class Calculator extends Component {
  state = {
    value: null,
    displayValue: "0",
    operator: null,
    waitingForOperand: false,
  };

  clearAll = () => {
    this.setState({
      value: null,
      displayValue: "0",
      operator: null,
      waitingForOperand: false,
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
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        displayValue:
          displayValue === "0" ? String(digit) : displayValue + digit,
      });
    }
  };

  CalculatorOperations = {
    "/": (prevValue, nextValue) => prevValue / nextValue,
    "*": (prevValue, nextValue) => prevValue * nextValue,
    "+": (prevValue, nextValue) => prevValue + nextValue,
    "-": (prevValue, nextValue) => prevValue - nextValue,
    "=": (prevValue, nextValue) => nextValue,
  };

  performOperation = (nextOperator) => {
    const { value, displayValue, operator } = this.state;
    const inputValue = parseFloat(displayValue);

    if (value == null) {
      this.setState({
        value: inputValue,
      });
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = this.CalculatorOperations[operator](
        currentValue,
        inputValue
      );

      this.setState({
        value: newValue,
        displayValue: String(newValue),
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator,
    });
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
    } else if (key === "Clear") {
      event.preventDefault();

      if (this.state.displayValue !== "0") {
        this.clearDisplay();
      } else {
        this.clearAll();
      }
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const { displayValue } = this.state;
    return (
      <div className="calculator">
        <Display value={displayValue} />
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Keypad
                displayValue={displayValue}
                clearDisplay={this.clearDisplay}
                toggleSign={this.toggleSign}
                clearAll={this.clearAll}
                inputPercent={this.inputPercent}
                inputDigit={this.inputDigit}
                inputDot={this.inputDot}
                performOperation={this.performOperation}
              />
            )}
          />
          <Route
            path="/scientific"
            component={() => (
              <ScientificKeypad
                displayValue={displayValue}
                clearDisplay={this.clearDisplay}
                toggleSign={this.toggleSign}
                clearAll={this.clearAll}
                inputPercent={this.inputPercent}
                inputDigit={this.inputDigit}
                inputDot={this.inputDot}
                performOperation={this.performOperation}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
