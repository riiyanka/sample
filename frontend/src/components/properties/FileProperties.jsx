import React from 'react';
import CommonProperties from './CommonProperties';

function FileProperties({ element, onUpdate }) {
  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    onUpdate(element.id, { [name]: value });
  };

  return (
    <>
      <CommonProperties element={element} onUpdate={onUpdate} />
      <div className="property-group">
        <label htmlFor="acceptedTypes">Accepted File Types</label>
        <input id="acceptedTypes" name="acceptedTypes" type="text" placeholder=".pdf, .jpg, .png" value={element.acceptedTypes || ''} onChange={handlePropertyChange} />
      </div>
      <div className="property-group">
        <label htmlFor="maxSize">Max File Size (MB)</label>
        <input id="maxSize" name="maxSize" type="number" value={element.maxSize || ''} onChange={handlePropertyChange} />
      </div>
    </>
  );
}

export default FileProperties;