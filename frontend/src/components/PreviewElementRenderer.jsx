



import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { nanoid } from 'nanoid';

function PreviewElementRenderer({ element, value, error, onChange }) {
  const { type, label, placeholder, options, required, columns, text, textAlign } = element;
  const requiredSpan = required && <span className="required-asterisk">*</span>;

  const getOptionalProps = (props) => {
    const optionalProps = {};
    for (const key in props) {
      if (props[key]) {
        optionalProps[key] = props[key];
      }
    }
    return optionalProps;
  };

  const renderError = () => {
    return error && <span className="error-message">{error}</span>;
  };

  const isToday = (someDate) => {
    if (!someDate) return false;
    const today = new Date();
    return someDate.getFullYear() === today.getFullYear() &&
           someDate.getMonth() === today.getMonth() &&
           someDate.getDate() === today.getDate();
  };


  switch (type) {
    case 'text':
      return (
        <div className="preview-element">
          <label htmlFor={element.id}>{label} {requiredSpan}</label>
          <input
            id={element.id}
            type="text"
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => onChange(element.id, e.target.value)}
            {...getOptionalProps({ minLength: element.minLength, maxLength: element.maxLength })}
          />
          {renderError()}
        </div>
      );
    case 'paragraph':
      return (
        <div className="preview-element">
          <label htmlFor={element.id}>{label} {requiredSpan}</label>
          <textarea
            id={element.id}
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => onChange(element.id, e.target.value)}
            {...getOptionalProps({ minLength: element.minLength, maxLength: element.maxLength })}
          />
          {renderError()}
        </div>
      );
    case 'radio':
      return (
        <fieldset className="preview-element">
          <legend>{label} {requiredSpan}</legend>
          <div className="options-group">
            {options.map((option, index) => (
              <div key={index} className="option">
                <input 
                  type="radio" 
                  id={`${element.id}-${index}`} 
                  name={element.id} 
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(element.id, e.target.value)}
                />
                <label htmlFor={`${element.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
          {renderError()}
        </fieldset>
      );
    case 'checkbox':
        const handleCheckboxChange = (optionValue, isChecked) => {
            const currentValues = value || [];
            const newValues = isChecked 
                ? [...currentValues, optionValue]
                : currentValues.filter(v => v !== optionValue);
            onChange(element.id, newValues);
        };
      return (
        <fieldset className="preview-element">
          <legend>{label} {requiredSpan}</legend>
          <div className="options-group">
            {options.map((option, index) => (
              <div key={index} className="option">
                <input 
                  type="checkbox" 
                  id={`${element.id}-${index}`} 
                  name={element.id}
                  value={option}
                  checked={(value || []).includes(option)}
                  onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                />
                <label htmlFor={`${element.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
          {renderError()}
        </fieldset>
      );
    case 'number':
      return (
        <div className="preview-element">
          <label htmlFor={element.id}>{label} {requiredSpan}</label>
          <input
            id={element.id}
            type="number"
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => onChange(element.id, e.target.value)}
            {...getOptionalProps({ min: element.min, max: element.max })}
          />
          {renderError()}
        </div>
      );
    case 'dropdown':
      return (
        <div className="preview-element">
          <label htmlFor={element.id}>{label} {requiredSpan}</label>
          <select 
            id={element.id} 
            value={value || ''} 
            onChange={(e) => onChange(element.id, e.target.value)}
          >
            <option value="" disabled>Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          {renderError()}
        </div>
      );
    case 'file':
      return (
        <div className="preview-element">
          <label htmlFor={element.id}>{label} {requiredSpan}</label>
          <input
            id={element.id}
            type="file"
            onChange={(e) => onChange(element.id, e.target.files[0])}
            accept={element.acceptedTypes || ''}
          />
          {renderError()}
        </div>
      );
    case 'date': {
        const today = new Date();
        const minDateProp = element.minDate ? new Date(element.minDate) : null;
        return (
            <div className="preview-element">
                <label>{label} {requiredSpan}</label>
                <DatePicker
                    selected={value}
                    onChange={(date) => onChange(element.id, date)}
                    className="date-picker-input"
                    minDate={minDateProp}
                    maxDate={today}
                    showYearDropdown
                    dateFormat="yyyy/MM/dd"
                    onChangeRaw={(e) => e.preventDefault()}
                />
                {renderError()}
            </div>
        );
    }
    case 'time': {
        const now = new Date();
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        return (
            <div className="preview-element">
                <label>{label} {requiredSpan}</label>
                <DatePicker
                    selected={value}
                    onChange={(time) => onChange(element.id, time)}
                    className="date-picker-input"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    minTime={startOfDay}
                    maxTime={isToday(value) ? now : endOfDay}
                    onChangeRaw={(e) => e.preventDefault()}
                />
                {renderError()}
            </div>
        );
    }
    case 'datetime': {
        const today = new Date();
        const filterPassedTime = (time) => {
            const currentDate = new Date();
            const selectedDate = new Date(time);
            return currentDate.getTime() < selectedDate.getTime();
        };
        return (
            <div className="preview-element">
                <label>{label} {requiredSpan}</label>
                <DatePicker
                    selected={value}
                    onChange={(date) => onChange(element.id, date)}
                    className="date-picker-input"
                    showTimeSelect
                    maxDate={today}
                    filterTime={filterPassedTime}
                    dateFormat="yyyy/MM/dd h:mm aa"
                    onChangeRaw={(e) => e.preventDefault()}
                />
                {renderError()}
            </div>
        );
    }
    case 'separator':
      return <hr className="form-separator" />;
    case 'header':
      return <h2 className="form-header" style={{ textAlign: textAlign }}>{text}</h2>;
    case 'title':
      return <h3 className="form-title" style={{ textAlign: textAlign }}>{text}</h3>;
    case 'table': {
        const tableRows = value || [];

        const handleTableCellChange = (rowIndex, columnId, cellValue) => {
            const newTableRows = [...tableRows];
            newTableRows[rowIndex] = { ...newTableRows[rowIndex], [columnId]: cellValue };
            onChange(element.id, newTableRows);
        };

        const addTableRow = () => {
            const newTableRows = [...tableRows, { id: nanoid() }];
            onChange(element.id, newTableRows);
        };

        const removeTableRow = (rowIndex) => {
            const newTableRows = tableRows.filter((_, index) => index !== rowIndex);
            onChange(element.id, newTableRows);
        };

        return (
            <div className="preview-element preview-table-wrapper">
                <label>{label} {requiredSpan}</label>
                <div className="table-scroll-wrapper">
                    <table className="preview-table">
                        <thead>
                            <tr>
                                {columns.map(col => <th key={col.id} style={{ width: `${col.width || 150}px` }}>{col.header}</th>)}
                                {element.allowRowActions && <th className="action-column"></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.map((row, rowIndex) => (
                                <tr key={row.id}>
                                    {columns.map(col => (
                                        <td key={col.id}>
                                            {col.type === 'text' && (
                                                <input type="text" value={row[col.id] || ''} onChange={e => handleTableCellChange(rowIndex, col.id, e.target.value)} />
                                            )}
                                            {col.type === 'number' && (
                                                <input type="number" value={row[col.id] || ''} onChange={e => handleTableCellChange(rowIndex, col.id, e.target.value)} />
                                            )}
                                            {col.type === 'dropdown' && (
                                                <select value={row[col.id] || ''} onChange={e => handleTableCellChange(rowIndex, col.id, e.target.value)}>
                                                    <option value="" disabled>Select</option>
                                                    {(col.options || []).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                            )}
                                            {col.type === 'static_text' && (
                                                <span>{(col.staticTexts || [])[rowIndex] || ''}</span>
                                            )}
                                        </td>
                                    ))}
                                    {element.allowRowActions && (
                                        <td>
                                            {tableRows.length > 1 && 
                                                <button type="button" className="remove-row-btn" onClick={() => removeTableRow(rowIndex)}>&times;</button>
                                            }
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {element.allowRowActions && 
                    <button type="button" className="add-row-btn" onClick={addTableRow}>+ Add Row</button>
                }
                {renderError()}
            </div>
        );
    }


case 'static_text': {
        const classNames = `static-text-render font-size-${element.fontSize || 'medium'} ${element.styled ? 'styled' : ''}`;
        return (
            <div className="preview-element">
                <div className={classNames}>
                    {element.text}
                </div>
            </div>
        );
    }
    default:
      return null;
  }
}

export default PreviewElementRenderer;