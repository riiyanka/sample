// import React from 'react';
// import CommonProperties from './CommonProperties';

// function DateProperties({ element, onUpdate }) {
//   const handlePropertyChange = (e) => {
//     const { name, value } = e.target;
//     onUpdate(element.id, { [name]: value });
//   };

//   return (
//     <>
//       <CommonProperties element={element} onUpdate={onUpdate} />
//       <div className="property-group">
//         <label htmlFor="minDate">Minimum Allowed Date</label>
//         <input
//           id="minDate"
//           name="minDate"
//           type="date"
//           value={element.minDate || ''}
//           onChange={handlePropertyChange}
//         />
//       </div>
//     </>
//   );
// }

// export default DateProperties;

import React, { useState } from 'react';
import CommonProperties from './CommonProperties';

function DateProperties({ element, onUpdate }) {
  const [inputType, setInputType] = useState('date');

  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    onUpdate(element.id, { [name]: value });
  };

  const toggleInputType = () => {
    setInputType(prevType => prevType === 'date' ? 'text' : 'date');
  };

  return (
    <>
      <CommonProperties element={element} onUpdate={onUpdate} />
      <div className="property-group">
        <label htmlFor="minDate">Minimum Allowed Date</label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            id="minDate"
            name="minDate"
            type={inputType}
            value={element.minDate || ''}
            onChange={handlePropertyChange}
            placeholder={inputType === 'text' ? 'YYYY-MM-DD' : ''}
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={toggleInputType}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📝
          </button>
        </div>
        <small style={{ color: '#666', fontSize: '12px' }}>
          Click 📝 to type manually
        </small>
      </div>

      <div className="property-group">
        <label htmlFor="maxDate">Maximum Allowed Date</label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            id="maxDate"
            name="maxDate"
            type={inputType}
            value={element.maxDate || ''}
            onChange={handlePropertyChange}
            placeholder={inputType === 'text' ? 'YYYY-MM-DD' : ''}
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={toggleInputType}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📝
          </button>
        </div>
      </div>
    </>
  );
}

export default DateProperties;
