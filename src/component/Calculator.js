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

  handleSideDrawerKeys = (oper) => {
    const newInput = this.state.displayValue;

    let result;
    let display;
    switch (oper) {
      case "sin(":
        if (newInput) {
          display = `${oper}${newInput}`;
          result = this.state.deg
            ? Math.sin((newInput * Math.PI) / 180)
            : Math.sin(newInput);
        } else if (this.state.displayResult !== undefined) {
          display = `${oper}${newInput}`;
          result = "";
        }
        this.setState({
          displayInput: display,
          sideOperators: oper,
        });
        this.calculate(result);
        break;
      case "sin⁻¹(":
        if (newInput) {
          display = `${oper}${newInput}`;
          result = this.state.deg
            ? Math.asin((newInput * Math.PI) / 180)
            : Math.asin(newInput);
        } else if (this.state.displayResult !== undefined) {
          display = `${oper}${newInput}`;
          result = "";
        }
        this.calculate(result);
        this.setState({
          displayInput: display,
          sideOperators: oper,
        });
        break;
      case "cos(":
        if (newInput) {
          display = `${oper}${newInput}`;
          result = this.state.deg
            ? Math.cos((newInput * Math.PI) / 180)
            : Math.cos(newInput);
        } else if (this.state.displayResult !== undefined) {
          display = `${oper}${newInput}`;
          result = "";
        }
        this.setState({
          displayInput: display,
          sideOperators: oper,
        });
        this.calculate(result);
        break;
      case "cos⁻¹(":
        if (newInput) {
          display = `${oper}${newInput}`;
          result = this.state.deg
            ? Math.acos((newInput * Math.PI) / 180)
            : Math.acos(newInput);
        } else if (this.state.displayResult !== undefined) {
          display = `${oper}${newInput}`;
          result = "";
        }
        this.setState({
          displayInput: display,
          sideOperators: oper,
        });
        this.calculate(result);
        break;
      case "tan(":
        if (newInput) {
          display = `${oper}${newInput}`;
          result = this.state.deg
            ? Math.tan((newInput * Math.PI) / 180)
            : Math.tan(newInput);
        } else if (this.state.displayResult !== undefined) {
          display = `${oper}${newInput}`;
          result = "";
        }
        this.setState({
          displayInput: display,
          sideOperators: oper,
        });
        this.calculate(result);
        break;
      case "tan⁻¹(":
        if (newInput) {
          display = `${oper}${newInput}`;
          result = this.state.deg
            ? Math.atan((newInput * Math.PI) / 180)
            : Math.atan(newInput);
        } else if (this.state.displayResult !== undefined) {
          display = `${oper}${newInput}`;
          result = "";
        }
        this.setState({
          displayInput: display,
          sideOperators: oper,
        });
        this.calculate(result);
        break;
      case "log(":
        if (newInput) {
          display = `${oper}${newInput}`;
          result = Math.log10(newInput);
        } else if (this.state.displayResult !== undefined) {
          display = `${oper}${newInput}`;
          result = "";
        }
        this.setState({
          displayInput: display,
          sideOperators: oper,
        });
        this.calculate(result);
        break;

      case "exp(":
        if (newInput) {
          display = `${oper}${newInput}`;
          result = Math.exp(newInput);
        } else if (this.state.displayResult !== undefined) {
          display = `${oper}${newInput}`;
          result = "";
        }
        this.setState({
          displayInput: display,
          sideOperators: oper,
        });
        this.calculate(result);
        break;
      case "ln(":
        if (newInput) {
          display = `${oper}${newInput}`;
          result = Math.log(newInput);
        } else if (this.state.displayResult !== undefined) {
          display = `${oper}${newInput}`;
          result = "";
        }
        this.setState({
          displayInput: display,
          sideOperators: oper,
        });
        this.calculate(result);
        break;
      case "e":
        display = newInput + oper;
        result = Math.E;

        this.setState({
          displayInput: display,
          displayResult: result,
          sideOperators: oper,
        });
        this.calculate(result);
        break;

      case "(":
        //console.log(oper, newInput, replace, result);
        this.setState({
          displayInput: newInput + oper,
          sideOperators: oper,
        });
        break;
      case ")":
        //console.log(oper, newInput, replace, result);
        this.setState({
          displayInput: newInput + oper,
          sideOperators: oper,
        });
        break;
      case "π":
        display = newInput + oper;
        result = Math.PI;
        this.setState({
          displayInput: display,
          sideOperators: oper,
        });
        this.calculate(result);
        break;
      case "^":
        let base = newInput.slice(0, newInput.indexOf("^"));
        let exponent = newInput.slice(newInput.indexOf("^") + 1);
        display = newInput + oper;
        result = Math.pow(base, exponent);

        this.setState({
          displayInput: display,
          sideOperators: oper,
        });
        this.calculate(result);
        break;
      case "10^":
        if (newInput) {
          display = `${oper}${newInput}`;
          result = Math.pow(10, newInput);
        } else {
          display = `${oper}${newInput}`;
          result = "";
        }

        this.setState({
          displayInput: display,
          sideOperators: oper,
        });
        this.calculate(result);
        break;
      case "²":
        if (newInput) {
          display = `${newInput}${oper}`;
          result = Math.pow(newInput, 2);
        } else {
          display = `${newInput}${oper}`;
          result = "";
        }

        this.setState({
          displayInput: display,

          sideOperators: oper,
        });
        this.calculate(result);
        break;
      case "√":
        if (newInput) {
          display = `${oper}${newInput}`;
          result = Math.sqrt(newInput);
        } else {
          display = `${oper}${newInput}`;
          result = "";
        }

        this.setState({
          displayInput: display,

          sideOperators: oper,
        });
        this.calculate(result);
        break;
      case "%":
        const currentValue = parseFloat(newInput);

        if (currentValue === 0 || newInput === "") return;

        // const fixedDigits = newInput.replace(/^-?\d*\.?/, "");
        const newValue = parseFloat(newInput) / 100;

        this.setState({
          displayInput: (newInput + oper).toString(),
          // displayResult: String(newValue.toFixed(fixedDigits.length + 2)),
          sideOperators: oper,
        });
        this.calculate(newValue);
        break;
      case "!":
        if (newInput) {
          let num = newInput.slice(0);
          display = newInput + oper;
          result = this.factorial(num);
        } else {
          display = newInput + oper;
        }
        this.setState({
          displayInput: display,

          sideOperators: oper,
        });
        this.calculate(result);
        break;

      default:
        this.setState({
          displayInput: newInput ? newInput + oper : oper,
          sideOperators: oper,
          displayResult: null,
        });
    }
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
