import React from "react";
import "./History.css";

const History = ({ history, onSelectCalculation, onClearHistory, isVisible, onToggleHistory }) => {
  if (!isVisible) return null;

  return (
    <div className="history-panel">
      <div className="history-header">
        <button 
          className="history-toggle-btn" 
          onClick={onToggleHistory}
          title="Close history"
        >
          📋
        </button>
        <h3>History</h3>
        <button 
          className="clear-history-btn" 
          onClick={onClearHistory}
          title="Clear all history"
        >
          🗑️
        </button>
      </div>
      
      <div className="history-content">
        {history.length === 0 ? (
          <div className="no-history">No calculations yet</div>
        ) : (
          <div className="history-list">
            {history.map((calc, index) => (
              <div 
                key={index} 
                className="history-item"
                onClick={() => onSelectCalculation(calc.result)}
                title="Click to use this result"
              >
                <div className="calculation">{calc.expression}</div>
                <div className="result">= {calc.result}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
