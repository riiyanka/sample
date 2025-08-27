import React from 'react';
import CommonProperties from './CommonProperties';

function NumberProperties({ element, onUpdate }) {
  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    onUpdate(element.id, { [name]: value });
  };

  return (
    <>
      <CommonProperties element={element} onUpdate={onUpdate} />
      <div className="property-group">
        <label htmlFor="min">Minimum Value</label>
        <input id="min" name="min" type="number" value={element.min || ''} onChange={handlePropertyChange} />
      </div>
      <div className="property-group">
        <label htmlFor="max">Maximum Value</label>
        <input id="max" name="max" type="number" value={element.max || ''} onChange={handlePropertyChange} />
      </div>
    </>
  );
}

export default NumberProperties;