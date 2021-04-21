import { Component } from "react";
import Display from "./Display";
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

  factorial = (x) => {
    if (x < 0) return;
    if (x === 0) return 1;
    return x * this.factorial(x - 1);
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

  factorial = (n) => {
    if (n === 0) return 1;
    let f = 1;
    for (let i = 1; i < n; i++) {
      f = f * (i + 1);
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
    const { displayValue, deg } = this.state;
    return (
      <div className="calculator">
        <Display value={displayValue} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
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
              );
            }}
          />
          <Route
            path="/scientific"
            render={() => {
              return (
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
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}
