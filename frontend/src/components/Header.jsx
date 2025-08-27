import React from 'react';

function Header({ onSave, onPreview, onClear }) {
  return (
    <header className="app-header">
      <h1 className="header-title">Form Builder</h1>
      <div className="header-actions">
        <button onClick={onPreview} className="action-btn preview-btn">
          Preview
        </button>
        <button onClick={onSave} className="action-btn save-btn">
          Save as PDF
        </button>
        <button 
          onClick={onClear} 
          className="action-btn"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Form
        </button>
      </div>
    </header>
  );
}

export default Header;
