import React from 'react';

function HeaderProperties({ element, onUpdate }) {
  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    onUpdate(element.id, { [name]: value });
  };

  return (
    <>
      <div className="property-group">
        <label htmlFor="text">Text Content</label>
        <input
          id="text"
          name="text"
          type="text"
          value={element.text}
          onChange={handlePropertyChange}
        />
      </div>
      <div className="property-group">
        <label>Text Align</label>
        <div className="align-btn-group">
          <button
            onClick={() => onUpdate(element.id, { textAlign: 'left' })}
            className={element.textAlign === 'left' ? 'active-align-btn' : ''}
          >
            Left
          </button>
          <button
            onClick={() => onUpdate(element.id, { textAlign: 'center' })}
            className={element.textAlign === 'center' ? 'active-align-btn' : ''}
          >
            Center
          </button>
          <button
            onClick={() => onUpdate(element.id, { textAlign: 'right' })}
            className={element.textAlign === 'right' ? 'active-align-btn' : ''}
          >
            Right
          </button>
        </div>
      </div>
    </>
  );
}

export default HeaderProperties;