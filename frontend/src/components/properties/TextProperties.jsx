


// import React from 'react';
// import CommonProperties from './CommonProperties';

// function TextProperties({ element, onUpdate }) {
//   const handlePropertyChange = (e) => {
//     const { name, value } = e.target;
//     onUpdate(element.id, { [name]: value });
//   };

//   const handleValidationFormatChange = (e) => {
//     const { value } = e.target;
//     const newProps = { validationFormat: value };
//     if (value !== 'none') {
//         newProps.characterType = 'any';
//     }
//     if (value === 'phone') {
//         newProps.phoneType = 'mobile';
//     } else {
//         delete element.phoneType; 
//     }
//     onUpdate(element.id, newProps);
//   };

//   // Determine if the element should have validation options
//   const hasStandardValidation = element.type === 'text';
//   const validationFormat = hasStandardValidation ? (element.validationFormat || 'none') : 'none';

//   return (
//     <>
//       <CommonProperties element={element} onUpdate={onUpdate} />
//       <div className="property-group">
//         <label htmlFor="placeholder">Placeholder</label>
//         <input
//           id="placeholder"
//           name="placeholder"
//           type="text"
//           value={element.placeholder}
//           onChange={handlePropertyChange}
//         />
//       </div>
//       <div className="property-group">
//         <label htmlFor="minLength">Min Length</label>
//         <input id="minLength" name="minLength" type="number" value={element.minLength || ''} onChange={handlePropertyChange} />
//       </div>
//       <div className="property-group">
//         <label htmlFor="maxLength">Max Length</label>
//         <input id="maxLength" name="maxLength" type="number" value={element.maxLength || ''} onChange={handlePropertyChange} />
//       </div>
      
//       {element.type === 'paragraph' && (
//         <div className="property-group">
//           <label htmlFor="rows">Rows</label>
//           <input id="rows" name="rows" type="number" value={element.rows || ''} onChange={handlePropertyChange} />
//         </div>
//       )}

//       <div className="property-group validation-section">
//         {hasStandardValidation && (
//             <>
//                 <label>Validation Format</label>
//                 <select name="validationFormat" value={validationFormat} onChange={handleValidationFormatChange}>
//                     <option value="none">None</option>
//                     <option value="email">Email</option>
//                     <option value="url">URL</option>
//                     <option value="credit_card">Credit Card</option>
//                     <option value="phone">Indian Phone Number</option>
//                 </select>

//                 {validationFormat === 'phone' && (
//                     <div className="property-group">
//                         <label htmlFor="phoneType">Phone Type</label>
//                         <select id="phoneType" name="phoneType" value={element.phoneType || 'mobile'} onChange={handlePropertyChange}>
//                             <option value="mobile">Mobile (+91)</option>
//                             <option value="telephone">Telephone (022)</option>
//                         </select>
//                     </div>
//                 )}
//             </>
//         )}
          
//         <div className="character-type-group">
//             <label>Allowed Character Types</label>
//             <div className="radio-group">
//                 <input type="radio" id="any" name="characterType" value="any" checked={element.characterType === 'any'} onChange={handlePropertyChange} disabled={validationFormat !== 'none'} />
//                 <label htmlFor="any">Any</label>
//             </div>
//             <div className="radio-group">
//                 <input type="radio" id="alpha" name="characterType" value="alpha" checked={element.characterType === 'alpha'} onChange={handlePropertyChange} disabled={validationFormat !== 'none'} />
//                 <label htmlFor="alpha">Alphabetic Only</label>
//             </div>
//             <div className="radio-group">
//                 <input type="radio" id="alphanumeric" name="characterType" value="alphanumeric" checked={element.characterType === 'alphanumeric'} onChange={handlePropertyChange} disabled={validationFormat !== 'none'} />
//                 <label htmlFor="alphanumeric">Alphanumeric Only</label>
//             </div>
//             <div className="radio-group">
//                 <input type="radio" id="numeric" name="characterType" value="numeric" checked={element.characterType === 'numeric'} onChange={handlePropertyChange} disabled={validationFormat !== 'none'} />
//                 <label htmlFor="numeric">Numeric Only</label>
//             </div>
//             <div className="radio-group">
//                 <input type="radio" id="no-special" name="characterType" value="no_special" checked={element.characterType === 'no_special'} onChange={handlePropertyChange} disabled={validationFormat !== 'none'} />
//                 <label htmlFor="no-special">No Special Characters</label>
//             </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default TextProperties;




import React from 'react';
import CommonProperties from './CommonProperties';

function TextProperties({ element, onUpdate }) {
  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    onUpdate(element.id, { [name]: value });
  };

  const handleValidationFormatChange = (e) => {
    const { value } = e.target;
    const newProps = { validationFormat: value };
    if (value !== 'none') {
        newProps.characterType = 'any';
    }
    if (value === 'phone') {
        newProps.phoneType = 'mobile';
    } else {
        delete element.phoneType; 
    }
    onUpdate(element.id, newProps);
  };

  const hasStandardValidation = element.type === 'text';
  const validationFormat = hasStandardValidation ? (element.validationFormat || 'none') : 'none';

  return (
    <>
      <CommonProperties element={element} onUpdate={onUpdate} />
      <div className="property-group">
        <label htmlFor="placeholder">Placeholder</label>
        <input
          id="placeholder"
          name="placeholder"
          type="text"
          value={element.placeholder}
          onChange={handlePropertyChange}
        />
      </div>
      <div className="property-group">
        <label htmlFor="minLength">Min Length</label>
        <input id="minLength" name="minLength" type="number" value={element.minLength || ''} onChange={handlePropertyChange} />
      </div>
      <div className="property-group">
        <label htmlFor="maxLength">Max Length</label>
        <input id="maxLength" name="maxLength" type="number" value={element.maxLength || ''} onChange={handlePropertyChange} />
      </div>
      
      <div className="property-group validation-section">
        {hasStandardValidation && (
            <>
                <label>Validation Format</label>
                <select name="validationFormat" value={validationFormat} onChange={handleValidationFormatChange}>
                    <option value="none">None</option>
                    <option value="email">Email</option>
                    <option value="url">URL</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="phone"> Phone Number</option>
                </select>

                
            </>
        )}
          
        <div className="character-type-group">
            <label>Allowed Character Types</label>
            <div className="radio-group">
                <input type="radio" id="any" name="characterType" value="any" checked={element.characterType === 'any'} onChange={handlePropertyChange} disabled={validationFormat !== 'none'} />
                <label htmlFor="any">Any</label>
            </div>
            <div className="radio-group">
                <input type="radio" id="alpha" name="characterType" value="alpha" checked={element.characterType === 'alpha'} onChange={handlePropertyChange} disabled={validationFormat !== 'none'} />
                <label htmlFor="alpha">Alphabetic Only</label>
            </div>
            <div className="radio-group">
                <input type="radio" id="alphanumeric" name="characterType" value="alphanumeric" checked={element.characterType === 'alphanumeric'} onChange={handlePropertyChange} disabled={validationFormat !== 'none'} />
                <label htmlFor="alphanumeric">Alphanumeric Only</label>
            </div>
            <div className="radio-group">
                <input type="radio" id="numeric" name="characterType" value="numeric" checked={element.characterType === 'numeric'} onChange={handlePropertyChange} disabled={validationFormat !== 'none'} />
                <label htmlFor="numeric">Numeric Only</label>
            </div>
            <div className="radio-group">
                <input type="radio" id="no-special" name="characterType" value="no_special" checked={element.characterType === 'no_special'} onChange={handlePropertyChange} disabled={validationFormat !== 'none'} />
                <label htmlFor="no-special">No Special Characters</label>
            </div>
        </div>
      </div>
    </>
  );
}

export default TextProperties;