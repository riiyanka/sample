




import React, { useState, useEffect } from 'react';
import PreviewElementRenderer from '../components/PreviewElementRenderer';
import { nanoid } from 'nanoid';

function PreviewPage() {
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedForm = localStorage.getItem('form_preview');
    if (savedForm) {
      const parsedRows = JSON.parse(savedForm);
      setRows(parsedRows);

      const initialFormData = {};
      const allElements = parsedRows.flatMap(row => row.elements);
      allElements.forEach(el => {
        if (el.type === 'table') {
          // FIX: Ensure initialRows is parsed as a number
          const initialTableRows = parseInt(el.initialRows, 10) || 1;
          initialFormData[el.id] = [...Array(initialTableRows)].map(() => ({ id: nanoid() }));
        }
      });
      setFormData(initialFormData);
    }
  }, []);

  const handleChange = (id, value) => {
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    const allElements = rows.flatMap(row => row.elements);

    const validationRegex = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      credit_card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
      phone_mobile: /^\+91[6-9][0-9]{9}$/,
      phone_telephone: /^022[0-9]{8}$/,
      alpha: /^[a-zA-Z\s]+$/,
      alphanumeric: /^[a-zA-Z0-9\s]+$/,
      numeric: /^[0-9]+$/,
      no_special: /^[a-zA-Z0-9\s]*$/
    };

    allElements.forEach(element => {
      const value = formData[element.id];

      if (element.required) {
        if (element.type === 'file' && !value) {
          newErrors[element.id] = `${element.label || 'File'} is required.`;
        } else if (element.type === 'checkbox' && (!value || value.length === 0)) {
            newErrors[element.id] = `${element.label || 'Checkbox selections'} are required.`;
        } else if (element.type === 'table' && (!value || value.length === 0)) {
            newErrors[element.id] = `${element.label || 'Table'} must have at least one row.`;
        }
        else if (typeof value === 'string' && !value.trim()) {
          newErrors[element.id] = `${element.label || element.type} is required.`;
        } else if (!value && typeof value !== 'string') { 
            newErrors[element.id] = `${element.label || element.type} is required.`;
        }
      }

      if ((element.type === 'text' || element.type === 'paragraph') && element.minLength && value && value.length < element.minLength) {
        newErrors[element.id] = `Must be at least ${element.minLength} characters.`;
      }
      
      if ((element.type === 'text' || element.type === 'paragraph') && element.maxLength && value && value.length > element.maxLength) {
        newErrors[element.id] = `Cannot exceed ${element.maxLength} characters.`;
      }

      if (element.type === 'checkbox' && value) {
        if (element.minSelections && value.length < element.minSelections) {
          newErrors[element.id] = `Please select at least ${element.minSelections} options.`;
        }
        if (element.maxSelections && value.length > element.maxSelections) {
          newErrors[element.id] = `You can select at most ${element.maxSelections} options.`;
        }
      }

      if (element.type === 'number' && value) {
          const numValue = parseFloat(value);
          if (element.min && numValue < parseFloat(element.min)) {
              newErrors[element.id] = `Value cannot be less than ${element.min}.`;
          }
          if (element.max && numValue > parseFloat(element.max)) {
              newErrors[element.id] = `Value cannot be greater than ${element.max}.`;
          }
      }
      
      if (element.type === 'file' && value) {
        if (element.acceptedTypes) {
            const accepted = element.acceptedTypes.split(',').map(t => t.trim().toLowerCase());
            const fileType = value.type.toLowerCase();
            const fileExtension = `.${value.name.split('.').pop().toLowerCase()}`;
            if (!accepted.includes(fileType) && !accepted.includes(fileExtension)) {
            newErrors[element.id] = `Invalid file type. Accepted types are: ${element.acceptedTypes}`;
            }
        }
        if (element.maxSize) {
            const maxSizeInBytes = parseFloat(element.maxSize) * 1024 * 1024;
            if (value.size > maxSizeInBytes) {
                newErrors[element.id] = `File is too large. Max size is ${element.maxSize} MB.`;
            }
        }
      }

      if ((element.type === 'text' || element.type === 'paragraph') && value) {
        if (element.type === 'text' && element.validationFormat && element.validationFormat !== 'none') {
            let regex;
            let message;
            if (element.validationFormat === 'phone') {
                if (element.phoneType === 'mobile') {
                    regex = validationRegex.phone_mobile;
                    message = "Please enter a valid  mobile number .";
                } else {
                    regex = validationRegex.phone_telephone;
                    message = "Please enter a valid  telephone number.";
                }
            } else {
                regex = validationRegex[element.validationFormat];
                message = `Please enter a valid ${element.validationFormat.replace('_', ' ')}.`;
            }

            if (regex && !regex.test(value)) {
                newErrors[element.id] = message;
            }
        } else if (element.characterType && element.characterType !== 'any') {
            const regex = validationRegex[element.characterType];
            if (regex && !regex.test(value)) {
                newErrors[element.id] = `Please enter only ${element.characterType.replace('_', ' ')} characters.`;
            }
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted Successfully:", formData);
      alert("Form data has been logged to the console! (Press F12)");
    } else {
      console.log("Validation Errors:", newErrors);
    }
  };

  return (
    <div className="preview-page-wrapper">
      <div className="preview-container">
        <h1 className="preview-title">Form Preview</h1>
        <form className="preview-form" onSubmit={handleSubmit} noValidate>
          {rows.length > 0 ? (
            rows.map((row) => (
              <div key={row.id} className="preview-row">
                {row.elements.map((element) => (
                  <PreviewElementRenderer
                    key={element.id}
                    element={element}
                    value={formData[element.id]}
                    error={errors[element.id]}
                    onChange={handleChange}
                  />
                ))}
              </div>
            ))
          ) : (
            <p>No form data found for preview.</p>
          )}
          <button type="submit" className="preview-submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default PreviewPage;