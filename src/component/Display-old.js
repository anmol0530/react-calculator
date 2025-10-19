import React from "react";
import "./Display.css";

class AutoScalingText extends React.Component {
  state = {
    scale: 1,
  };

  componentDidUpdate() {
    const { scale } = this.state;

    const node = this.node;
    const parentNode = node.parentNode;

    const availableWidth = parentNode.offsetWidth;
    const actualWidth = node.offsetWidth;
    const actualScale = availableWidth / actualWidth;

    if (scale === actualScale) return;

    if (actualScale < 1) {
      this.setState({ scale: actualScale });
    } else if (scale < 1) {
      this.setState({ scale: 1 });
    }
  }

  render() {
    const { scale } = this.state;

    return (
      <div
        className="auto-scaling-text"
        style={{ transform: `scale(${scale},${scale})` }}
        ref={(node) => (this.node = node)}
      >
        {this.props.children}
      </div>
    );
  }
}

class Display extends React.Component {
  render() {
    const { value, ...props } = this.props;

    let formattedValue;
    
    // Handle error cases
    if (value === "NaN" || value === "Infinity" || value === "-Infinity" || isNaN(parseFloat(value))) {
      formattedValue = "Error";
    } else {
      const numValue = parseFloat(value);
      
      // Handle very large numbers with scientific notation
      if (Math.abs(numValue) >= 1e15 || (Math.abs(numValue) < 1e-6 && numValue !== 0)) {
        formattedValue = numValue.toExponential(6);
      } else {
        const language = "en-US" || navigator.language;
        formattedValue = numValue.toLocaleString(language, {
          useGrouping: true,
          maximumFractionDigits: 8,
          minimumFractionDigits: 0
        });

        // Add back missing .0 in e.g. 12.0
        const match = value.match(/\.\d*?(0*)$/);
        if (match) formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];
      }
    }

    return (
      <div {...props} className="calculator-display">
        <AutoScalingText>{formattedValue}</AutoScalingText>
      </div>
    );
  }
}

export default Display;
