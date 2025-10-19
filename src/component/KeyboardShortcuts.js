import React, { useState } from "react";
import "./KeyboardShortcuts.css";

const KeyboardShortcuts = () => {
  const [isVisible, setIsVisible] = useState(false);

  const shortcuts = [
    { key: "0-9", description: "Number input" },
    { key: "+ - * /", description: "Basic operations" },
    { key: "Enter", description: "Equals (=)" },
    { key: "Backspace", description: "Delete last digit" },
    { key: "Escape", description: "Clear display" },
    { key: ".", description: "Decimal point" },
    { key: "%", description: "Percentage" },
    { key: "H", description: "Toggle history" }
  ];

  return (
    <>
      <button
        className="keyboard-shortcuts-btn"
        onClick={() => setIsVisible(!isVisible)}
        title="Show keyboard shortcuts"
      >
        ⌨️
      </button>
      
      {isVisible && (
        <>
          <div className="keyboard-shortcuts-overlay" onClick={() => setIsVisible(false)} />
          <div className="keyboard-shortcuts-panel">
            <div className="shortcuts-header">
              <h3>⌨️ Keyboard Shortcuts</h3>
              <button 
                className="close-btn"
                onClick={() => setIsVisible(false)}
              >
                ✕
              </button>
            </div>
            <div className="shortcuts-content">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="shortcut-item">
                  <kbd className="shortcut-key">{shortcut.key}</kbd>
                  <span className="shortcut-desc">{shortcut.description}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default KeyboardShortcuts;
