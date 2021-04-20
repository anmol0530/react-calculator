import PointTarget from "react-point";
import { Link } from "react-router-dom";
import "./ScientificKeypad.css";

const ScientificKeypad = (props) => {
  const { displayValue } = props;
  const clearDisplay = displayValue !== "0";
  const clearText = clearDisplay ? "C" : "AC";

  return (
    <div className="scientific-keypad">
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="operator-keys">
            <CalculatorKey
              className="key-deg"
              onPress={() => props.performOperation("deg")}
            >
              deg
            </CalculatorKey>
            <CalculatorKey
              className="key-sin"
              onPress={() => props.performOperation("sin")}
            >
              sin
            </CalculatorKey>
            <CalculatorKey
              className="key-cos"
              onPress={() => props.performOperation("cos")}
            >
              cos
            </CalculatorKey>
            <CalculatorKey
              className="key-lg"
              onPress={() => props.performOperation("lg")}
            >
              lg
            </CalculatorKey>
            <CalculatorKey
              className="key-ln"
              onPress={() => props.performOperation("ln")}
            >
              ln
            </CalculatorKey>
            <CalculatorKey
              className="key-opening"
              onPress={() => props.performOperation("(")}
            >
              (
            </CalculatorKey>
          </div>
          <div className="function-keys">
            <CalculatorKey
              className="key-clear"
              onPress={() =>
                clearDisplay ? props.clearDisplay() : props.clearAll()
              }
            >
              {clearText}
            </CalculatorKey>
            <CalculatorKey
              className="key-sign"
              onPress={() => props.toggleSign()}
            >
              ±
            </CalculatorKey>
            <CalculatorKey
              className="key-percent"
              onPress={() => props.inputPercent()}
            >
              %
            </CalculatorKey>
          </div>
          <div className="digit-keys">
            <CalculatorKey className="key-switch">
              <Link to="/" style={{ textDecoration: "none" }}>
                »
              </Link>
            </CalculatorKey>
            <CalculatorKey
              className="key-0"
              onPress={() => props.inputDigit(0)}
            >
              0
            </CalculatorKey>
            <CalculatorKey className="key-dot" onPress={() => props.inputDot()}>
              ●
            </CalculatorKey>
            <CalculatorKey
              className="key-1"
              onPress={() => props.inputDigit(1)}
            >
              1
            </CalculatorKey>
            <CalculatorKey
              className="key-2"
              onPress={() => props.inputDigit(2)}
            >
              2
            </CalculatorKey>
            <CalculatorKey
              className="key-3"
              onPress={() => props.inputDigit(3)}
            >
              3
            </CalculatorKey>
            <CalculatorKey
              className="key-4"
              onPress={() => props.inputDigit(4)}
            >
              4
            </CalculatorKey>
            <CalculatorKey
              className="key-5"
              onPress={() => props.inputDigit(5)}
            >
              5
            </CalculatorKey>
            <CalculatorKey
              className="key-6"
              onPress={() => props.inputDigit(6)}
            >
              6
            </CalculatorKey>
            <CalculatorKey
              className="key-7"
              onPress={() => props.inputDigit(7)}
            >
              7
            </CalculatorKey>
            <CalculatorKey
              className="key-8"
              onPress={() => props.inputDigit(8)}
            >
              8
            </CalculatorKey>
            <CalculatorKey
              className="key-9"
              onPress={() => props.inputDigit(9)}
            >
              9
            </CalculatorKey>
          </div>
        </div>
        <div className="operator-keys">
          <CalculatorKey
            className="key-tan"
            onPress={() => props.performOperation("tan")}
          >
            tan
          </CalculatorKey>
          <CalculatorKey
            className="key-closing"
            onPress={() => props.performOperation(")")}
          >
            )
          </CalculatorKey>
          <CalculatorKey
            className="key-divide"
            onPress={() => props.performOperation("/")}
          >
            ÷
          </CalculatorKey>
          <CalculatorKey
            className="key-multiply"
            onPress={() => props.performOperation("*")}
          >
            ×
          </CalculatorKey>
          <CalculatorKey
            className="key-subtract"
            onPress={() => props.performOperation("-")}
          >
            −
          </CalculatorKey>
          <CalculatorKey
            className="key-add"
            onPress={() => props.performOperation("+")}
          >
            +
          </CalculatorKey>
          <CalculatorKey
            className="key-equals"
            onPress={() => props.performOperation("=")}
          >
            =
          </CalculatorKey>
        </div>
        <div className="operator-keys">
          <CalculatorKey
            className="key-second"
            onPress={() => props.performOperation("2nd")}
          >
            2nd
          </CalculatorKey>
          <CalculatorKey
            className="key-power"
            onPress={() => props.performOperation("**")}
          >
            xʸ
          </CalculatorKey>
          <CalculatorKey
            className="key-root"
            onPress={() => props.performOperation("√")}
          >
            √x
          </CalculatorKey>
          <CalculatorKey
            className="key-factorial"
            onPress={() => props.performOperation("!")}
          >
            x!
          </CalculatorKey>
          <CalculatorKey
            className="key-reciprocal"
            onPress={() => props.performOperation("1/x")}
          >
            1/x
          </CalculatorKey>
          <CalculatorKey
            className="key-pie"
            onPress={() => props.performOperation("π")}
          >
            π
          </CalculatorKey>
          <CalculatorKey
            className="key-exponential"
            onPress={() => props.performOperation("e")}
          >
            e
          </CalculatorKey>
        </div>
      </div>
    </div>
  );
};

const CalculatorKey = (props) => {
  const { onPress, className, ...propss } = props;
  return (
    <PointTarget onPoint={onPress}>
      <button className={`calculator-key ${className}`} {...propss} />
    </PointTarget>
  );
};

export default ScientificKeypad;
