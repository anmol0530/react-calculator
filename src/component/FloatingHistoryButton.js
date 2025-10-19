import React from "react";
import "./FloatingHistoryButton.css";

const FloatingHistoryButton = ({ onClick, showHistory }) => {
  return (
    <button 
      className={`floating-history-btn ${showHistory ? 'active' : ''}`}
      onClick={onClick}
      title="Toggle calculation history (Press H)"
    >
      📋
    </button>
  );
};

export default FloatingHistoryButton;
