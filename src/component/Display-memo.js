import React, { memo, useMemo } from "react";
import "./Display.css";

const AutoScalingText = memo(({ children }) => {
  return (
    <div className="auto-scaling-text">
      {children}
    </div>
  );
});

const Display = memo(({ value, ...props }) => {
  const formattedValue = useMemo(() => {
    let formatted;
    
    // Handle error cases
    if (value === "NaN" || value === "Infinity" || value === "-Infinity" || isNaN(parseFloat(value))) {
      formatted = "Error";
    } else {
      const numValue = parseFloat(value);
      
      // Handle very large numbers with scientific notation
      if (Math.abs(numValue) >= 1e15 || (Math.abs(numValue) < 1e-6 && numValue !== 0)) {
        formatted = numValue.toExponential(6);
      } else {
        const language = "en-US" || navigator.language;
        formatted = numValue.toLocaleString(language, {
          useGrouping: true,
          maximumFractionDigits: 8,
          minimumFractionDigits: 0
        });

        // Add back missing .0 in e.g. 12.0
        const match = value.match(/\.\d*?(0*)$/);
        if (match) formatted += /[1-9]/.test(match[0]) ? match[1] : match[0];
      }
    }
    
    return formatted;
  }, [value]);

  return (
    <div {...props} className="calculator-display">
      <AutoScalingText>{formattedValue}</AutoScalingText>
    </div>
  );
});

Display.displayName = 'Display';
AutoScalingText.displayName = 'AutoScalingText';

export default Display;
