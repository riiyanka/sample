import React from 'react';

function StaticTextProperties({ element, onUpdate }) {
  const handlePropertyChange = (e) => {
    const { name, value, type, checked } = e.target;
    onUpdate(element.id, { [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <>
      <div className="property-group">
        <label htmlFor="text">Text Content</label>
        <textarea
          id="text"
          name="text"
          value={element.text}
          onChange={handlePropertyChange}
          rows="5"
        />
      </div>
      <div className="property-group">
        <label htmlFor="fontSize">Font Size</label>
        <select id="fontSize" name="fontSize" value={element.fontSize || 'medium'} onChange={handlePropertyChange}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div className="property-group-inline">
        <input
          id="styled"
          name="styled"
          type="checkbox"
          checked={element.styled || false}
          onChange={handlePropertyChange}
        />
        <label htmlFor="styled">Show with border & background</label>
      </div>
    </>
  );
}

export default StaticTextProperties;