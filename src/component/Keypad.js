import PointTarget from "react-point";
import { Link } from "react-router-dom";
import "./Keypad.css";

const Keypad = (props) => {
  const { displayValue } = props;
  const clearDisplay = displayValue !== "0";
  const clearText = clearDisplay ? "C" : "AC";

  return (
    <div className="keypad">
      <div className="calculator-keypad">
        <div className="input-keys">
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
              <Link
                to="/scientific"
                style={{ textDecoration: "none", padding: "10px 20px" }}
              >
                «
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

export default Keypad;
