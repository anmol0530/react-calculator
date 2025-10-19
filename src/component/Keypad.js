import PointTarget from "react-point";
import Tooltip from "./Tooltip";
import "./Keypad.css";

const Keypad = (props) => {
  const { displayValue, toggleCalculatorMode } = props;
  const clearDisplay = displayValue !== "0";
  const clearText = clearDisplay ? "C" : "AC";

  return (
    <div className="keypad">
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <Tooltip text={clearDisplay ? "Clear display" : "Clear all"}>
              <CalculatorKey
                className="key-clear"
                onPress={() =>
                  clearDisplay ? props.clearDisplay() : props.clearAll()
                }
              >
                {clearText}
              </CalculatorKey>
            </Tooltip>
            <Tooltip text="Toggle positive/negative">
              <CalculatorKey
                className="key-sign"
                onPress={() => props.toggleSign()}
              >
                ±
              </CalculatorKey>
            </Tooltip>
            <Tooltip text="Convert to percentage">
              <CalculatorKey
                className="key-percent"
                onPress={() => props.inputPercent()}
              >
                %
              </CalculatorKey>
            </Tooltip>
          </div>
          <div className="digit-keys">
            <Tooltip text="Switch to scientific calculator (Press S)">
              <CalculatorKey 
                className="key-switch"
                onPress={toggleCalculatorMode}
              >
                «
              </CalculatorKey>
            </Tooltip>
            <Tooltip text="Enter zero">
              <CalculatorKey
                className="key-0"
                onPress={() => props.inputDigit(0)}
              >
                0
              </CalculatorKey>
            </Tooltip>
            <Tooltip text="Decimal point">
              <CalculatorKey className="key-dot" onPress={() => props.inputDot()}>
                ●
              </CalculatorKey>
            </Tooltip>
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
          <Tooltip text="Division (/)">
            <CalculatorKey
              className="key-divide"
              onPress={() => props.performOperation("/")}
            >
              ÷
            </CalculatorKey>
          </Tooltip>
          <Tooltip text="Multiplication (*)">
            <CalculatorKey
              className="key-multiply"
              onPress={() => props.performOperation("*")}
            >
              ×
            </CalculatorKey>
          </Tooltip>
          <Tooltip text="Subtraction (-)">
            <CalculatorKey
              className="key-subtract"
              onPress={() => props.performOperation("-")}
            >
              −
            </CalculatorKey>
          </Tooltip>
          <Tooltip text="Addition (+)">
            <CalculatorKey
              className="key-add"
              onPress={() => props.performOperation("+")}
            >
              +
            </CalculatorKey>
          </Tooltip>
          <Tooltip text="Calculate result (Enter)">
            <CalculatorKey
              className="key-equals"
              onPress={() => props.performOperation("=")}
            >
              =
            </CalculatorKey>
          </Tooltip>
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
