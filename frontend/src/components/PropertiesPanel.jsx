




import React from 'react';
import TextProperties from './properties/TextProperties';
import NumberProperties from './properties/NumberProperties';
import FileProperties from './properties/FileProperties';
import OptionsProperties from './properties/OptionsProperties';
import HeaderProperties from './properties/HeaderProperties';
import DateProperties from './properties/DateProperties';
import TableProperties from './properties/TableProperties';
import StaticTextProperties from './properties/StaticTextProperties'; // New import

function PropertiesPanel({ element, onUpdate, onDelete }) {
  if (!element) {
    return (
      <div className="panel properties-panel">
        <h2>Properties</h2>
        <p>Select an element to see its properties.</p>
      </div>
    );
  }

  const renderProperties = () => {
    switch (element.type) {
      case 'text':
      case 'paragraph':
        return <TextProperties element={element} onUpdate={onUpdate} />;
      case 'number':
        return <NumberProperties element={element} onUpdate={onUpdate} />;
      case 'file':
        return <FileProperties element={element} onUpdate={onUpdate} />;
      case 'radio':
      case 'checkbox':
      case 'dropdown':
        return <OptionsProperties element={element} onUpdate={onUpdate} />;
      case 'header':
      case 'title':
        return <HeaderProperties element={element} onUpdate={onUpdate} />;
      case 'date':
        return <DateProperties element={element} onUpdate={onUpdate} />;
      case 'table':
        return <TableProperties element={element} onUpdate={onUpdate} />;  
      case 'static_text':
        return <StaticTextProperties element={element} onUpdate={onUpdate} />;  
      default:
        return <p>This element has no properties.</p>;
    }
  };

  return (
    <div className="panel properties-panel">
      <h2>Properties for {element.type}</h2>
      {renderProperties()}
      <div className="delete-section">
        <button onClick={() => onDelete(element.id)} className="delete-btn">
          Delete Element
        </button>
      </div>
    </div>
  );
}

export default PropertiesPanel;