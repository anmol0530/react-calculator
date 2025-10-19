import { useState, useEffect, useCallback } from "react";
import Display from "./Display";
import History from "./History";
import FloatingHistoryButton from "./FloatingHistoryButton";
import KeyboardShortcuts from "./KeyboardShortcuts";
import Keypad from "./Keypad";
import ScientificKeypad from "./ScientificKeypad";

const Calculator = () => {
  // State management with hooks
  const [state, setState] = useState({
    value: null,
    displayValue: "0",
    operator: null,
    waitingForOperand: false,
    deg: true,
    history: [],
    showHistory: false,
    currentExpression: "",
    isScientificMode: false,
  });

  // Destructure state for easier access
  const {
    value,
    displayValue,
    operator,
    waitingForOperand,
    deg,
    history,
    showHistory,
    currentExpression,
    isScientificMode
  } = state;

  // Helper function to update state
  const updateState = useCallback((updates) => {
    setState(prevState => ({ ...prevState, ...updates }));
  }, []);

  // Clear functions
  const clearAll = useCallback(() => {
    updateState({
      value: null,
      displayValue: "0",
      operator: null,
      waitingForOperand: false,
      currentExpression: "",
    });
  }, [updateState]);

  const clearDisplay = useCallback(() => {
    updateState({ displayValue: "0" });
  }, [updateState]);

  const clearLastChar = useCallback(() => {
    updateState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || "0"
    });
  }, [displayValue, updateState]);

  // Toggle functions
  const toggleDeg = useCallback(() => {
    updateState({ deg: !deg });
  }, [deg, updateState]);

  const toggleSign = useCallback(() => {
    const newValue = parseFloat(displayValue) * -1;
    updateState({ displayValue: String(newValue) });
  }, [displayValue, updateState]);

  const toggleHistory = useCallback(() => {
    updateState({ showHistory: !showHistory });
  }, [showHistory, updateState]);

  const toggleCalculatorMode = useCallback(() => {
    updateState({ isScientificMode: !isScientificMode });
  }, [isScientificMode, updateState]);

  // Input functions
  const inputPercent = useCallback(() => {
    const currentValue = parseFloat(displayValue);
    if (currentValue === 0) return;

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
    const newValue = parseFloat(displayValue) / 100;

    updateState({
      displayValue: String(newValue.toFixed(fixedDigits.length + 2))
    });
  }, [displayValue, updateState]);

  const inputDot = useCallback(() => {
    if (!/\./.test(displayValue)) {
      updateState({
        displayValue: displayValue + ".",
        waitingForOperand: false,
      });
    }
  }, [displayValue, waitingForOperand, updateState]);

  const inputDigit = useCallback((digit) => {
    if (waitingForOperand) {
      updateState({
        displayValue: String(digit),
        waitingForOperand: false,
        currentExpression: currentExpression + String(digit)
      });
    } else {
      updateState({
        displayValue: displayValue === "0" ? String(digit) : displayValue + digit,
        currentExpression: 
          currentExpression === "" || currentExpression === "0" 
            ? String(digit) 
            : currentExpression + String(digit)
      });
    }
  }, [displayValue, waitingForOperand, currentExpression, updateState]);

  // History management
  const loadHistoryFromStorage = useCallback(() => {
    try {
      const savedHistory = localStorage.getItem('calculator-history');
      if (savedHistory) {
        updateState({ history: JSON.parse(savedHistory) });
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  }, [updateState]);

  const saveHistoryToStorage = useCallback((historyData) => {
    try {
      localStorage.setItem('calculator-history', JSON.stringify(historyData));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  }, []);

  const addToHistory = useCallback((expression, result) => {
    const newHistoryItem = {
      expression,
      result,
      timestamp: new Date().toLocaleTimeString()
    };

    const newHistory = [newHistoryItem, ...history].slice(0, 50);
    saveHistoryToStorage(newHistory);
    updateState({ history: newHistory });
  }, [history, saveHistoryToStorage, updateState]);

  const clearHistory = useCallback(() => {
    updateState({ history: [] });
    localStorage.removeItem('calculator-history');
  }, [updateState]);

  const selectFromHistory = useCallback((result) => {
    updateState({
      displayValue: String(result),
      value: result,
      operator: null,
      waitingForOperand: false,
      currentExpression: String(result)
    });
  }, [updateState]);

  // Mathematical operations
  const factorial = useCallback((n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let f = 1;
    for (let i = 2; i <= n; i++) {
      f = f * i;
    }
    return f;
  }, []);

  const calculatorOperations = {
    "/": (prevValue, nextValue) => prevValue / nextValue,
    "*": (prevValue, nextValue) => prevValue * nextValue,
    "+": (prevValue, nextValue) => prevValue + nextValue,
    "-": (prevValue, nextValue) => prevValue - nextValue,
    "**": (prevValue, nextValue) => prevValue ** nextValue,
    sin: (prevValue, nextValue) =>
      deg
        ? Math.sin((nextValue * Math.PI) / 180)
        : Math.sin(nextValue),
    "sin⁻¹": (prevValue, nextvalue) =>
      deg
        ? (Math.asin(nextvalue) * 180) / Math.PI
        : Math.asin(nextvalue),
    cos: (prevValue, nextValue) =>
      deg
        ? Math.cos((nextValue * Math.PI) / 180)
        : Math.cos(nextValue),
    "cos⁻¹": (prevValue, nextvalue) =>
      deg
        ? (Math.acos(nextvalue) * 180) / Math.PI
        : Math.acos(nextvalue),
    tan: (prevValue, nextValue) =>
      deg
        ? Math.tan((nextValue * Math.PI) / 180)
        : Math.tan(nextValue),
    "tan⁻¹": (prevValue, nextvalue) =>
      deg
        ? (Math.atan(nextvalue) * 180) / Math.PI
        : Math.atan(nextvalue),
    lg: (prevValue, nextValue) => Math.log10(nextValue),
    ln: (prevValue, nextValue) => Math.log(nextValue),
    "10ˣ": (prevValue, nextValue) => Math.pow(10, nextValue),
    eˣ: (prevValue, nextValue) => Math.exp(nextValue),
    "√": (prevValue, nextValue) => Math.sqrt(nextValue),
    "!": (prevValue, nextValue) => factorial(nextValue),
    "1/x": (prevValue, nextValue) => 1 / nextValue,
    π: () => Math.PI,
    e: () => Math.E,
    "=": (prevValue, nextValue) => nextValue,
  };

  const getOperatorSymbol = useCallback((op) => {
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
    return symbols[op] || ` ${op} `;
  }, []);

  const performOperation = useCallback((nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (value == null) {
      updateState({
        value: inputValue,
        currentExpression: currentExpression + getOperatorSymbol(nextOperator)
      });
    } else if (operator) {
      const currentValue = value || 0;
      let newValue;
      try {
        newValue = calculatorOperations[operator](currentValue, inputValue);
        
        if (isNaN(newValue) || !isFinite(newValue)) {
          newValue = "Error";
        }
      } catch (error) {
        newValue = "Error";
      }

      if (nextOperator === "=") {
        const expression = currentExpression;
        if (newValue !== "Error") {
          addToHistory(expression, newValue);
        }
        updateState({
          value: newValue === "Error" ? null : newValue,
          displayValue: String(newValue),
          currentExpression: newValue === "Error" ? "" : String(newValue)
        });
      } else {
        if (newValue === "Error") {
          updateState({
            value: null,
            displayValue: "Error",
            currentExpression: "",
            waitingForOperand: true,
            operator: null
          });
          return;
        }
        updateState({
          value: newValue,
          displayValue: String(newValue),
          currentExpression: currentExpression + getOperatorSymbol(nextOperator)
        });
      }
    }

    updateState({
      waitingForOperand: true,
      operator: nextOperator,
    });
  }, [
    displayValue, value, operator, currentExpression, calculatorOperations,
    getOperatorSymbol, addToHistory, updateState
  ]);

  // Keyboard handler
  const handleKeyDown = useCallback((event) => {
    let { key } = event;

    if (key === "Enter") key = "=";

    if (/\d/.test(key)) {
      event.preventDefault();
      inputDigit(parseInt(key, 10));
    } else if (key in calculatorOperations) {
      event.preventDefault();
      performOperation(key);
    } else if (key === ".") {
      event.preventDefault();
      inputDot();
    } else if (key === "%") {
      event.preventDefault();
      inputPercent();
    } else if (key === "Backspace") {
      event.preventDefault();
      clearLastChar();
    } else if (key === "Clear" || key === "Escape") {
      event.preventDefault();
      if (displayValue !== "0") {
        clearDisplay();
      } else {
        clearAll();
      }
    } else if (key === "c" || key === "C") {
      event.preventDefault();
      clearDisplay();
    } else if (key === "h" || key === "H") {
      event.preventDefault();
      toggleHistory();
    } else if (key === "s" || key === "S") {
      event.preventDefault();
      toggleCalculatorMode();
    }
  }, [
    calculatorOperations, inputDigit, performOperation, inputDot, inputPercent,
    clearLastChar, displayValue, clearDisplay, clearAll, toggleHistory,
    toggleCalculatorMode
  ]);

  // Effects
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    loadHistoryFromStorage();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, loadHistoryFromStorage]);

  // Render
  return (
    <div className="calculator">
      <Display value={displayValue} />
      {isScientificMode ? (
        <ScientificKeypad
          displayValue={displayValue}
          deg={deg}
          clearDisplay={clearDisplay}
          toggleSign={toggleSign}
          toggleDeg={toggleDeg}
          clearAll={clearAll}
          inputPercent={inputPercent}
          inputDigit={inputDigit}
          inputDot={inputDot}
          performOperation={performOperation}
          toggleCalculatorMode={toggleCalculatorMode}
          isScientificMode={isScientificMode}
        />
      ) : (
        <Keypad
          displayValue={displayValue}
          clearDisplay={clearDisplay}
          toggleSign={toggleSign}
          clearAll={clearAll}
          inputPercent={inputPercent}
          inputDigit={inputDigit}
          inputDot={inputDot}
          performOperation={performOperation}
          toggleCalculatorMode={toggleCalculatorMode}
          isScientificMode={isScientificMode}
        />
      )}
      <History
        history={history}
        isVisible={showHistory}
        onSelectCalculation={selectFromHistory}
        onClearHistory={clearHistory}
        onToggleHistory={toggleHistory}
      />
      <FloatingHistoryButton 
        onClick={toggleHistory}
        showHistory={showHistory}
      />
      <KeyboardShortcuts />
    </div>
  );
};

export default Calculator;
