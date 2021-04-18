import { Component } from "react";
import Display from "./Display";
import Keypad from "./Keypad";

export default class Calculator extends Component {
  state = {
    value: null,
    displayValue: "0",
    operator: null,
    waitingForOperand: false,
  };

  clearAll() {
    this.setState({
      value: null,
      displayValue: "0",
      operator: null,
      waitingForOperand: false,
    });
  }

  clearDisplay() {
    this.setState({
      displayValue: "0",
    });
  }

  render() {
    const { displayValue } = this.state;
    return (
      <div className="calculator">
        <Display />
        <Keypad
          displayValue={displayValue}
          clearDisplay={this.state.clearDisplay}
        />
      </div>
    );
  }
}
