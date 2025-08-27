import React from 'react';
import CommonProperties from './CommonProperties';

function OptionsProperties({ element, onUpdate }) {
    const handlePropertyChange = (e) => {
        const { name, value } = e.target;
        onUpdate(element.id, { [name]: value });
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...element.options];
        newOptions[index] = value;
        onUpdate(element.id, { options: newOptions });
    };

    const addOption = () => {
        const newOptions = [...element.options, `Option ${element.options.length + 1}`];
        onUpdate(element.id, { options: newOptions });
    };

    const removeOption = (index) => {
        const newOptions = element.options.filter((_, i) => i !== index);
        onUpdate(element.id, { options: newOptions });
    };

  return (
    <>
        <CommonProperties element={element} onUpdate={onUpdate} />
        <div className="property-group">
            <label>Options</label>
            {element.options.map((option, index) => (
                <div key={index} className="option-editor">
                <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <button onClick={() => removeOption(index)} className="remove-btn">
                    &times;
                </button>
                </div>
            ))}
            <button onClick={addOption} className="add-btn">Add Option</button>
            {element.type === 'checkbox' && (
                <div className="option-settings">
                <div className="property-group-inline">
                    <label htmlFor="minSelections">Min</label>
                    <input id="minSelections" name="minSelections" type="number" value={element.minSelections || ''} onChange={handlePropertyChange} />
                </div>
                <div className="property-group-inline">
                    <label htmlFor="maxSelections">Max</label>
                    <input id="maxSelections" name="maxSelections" type="number" value={element.maxSelections || ''} onChange={handlePropertyChange} />
                </div>
                </div>
            )}
        </div>
    </>
  );
}

export default OptionsProperties;