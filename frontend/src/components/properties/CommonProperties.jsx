import React from 'react';

function CommonProperties({ element, onUpdate }) {
  const handlePropertyChange = (e) => {
    const { name, value, type, checked } = e.target;
    onUpdate(element.id, { [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <>
      <div className="property-group">
        <label htmlFor="label">Label</label>
        <input
          id="label"
          name="label"
          type="text"
          value={element.label}
          onChange={handlePropertyChange}
        />
      </div>
      <div className="property-group-inline">
        <input
          id="required"
          name="required"
          type="checkbox"
          checked={element.required || false}
          onChange={handlePropertyChange}
        />
        <label htmlFor="required">Required</label>
      </div>
    </>
  );
}

export default CommonProperties;