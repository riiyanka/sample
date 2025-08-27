


import React from 'react';
import ToolboxItem from './ToolboxItem';

const AVAILABLE_TOOLS = [
  { id: 'tool-checkbox', name: 'Checkboxes' },
  { id: 'tool-date', name: 'Date Picker' },
  { id: 'tool-dropdown', name: 'Dropdown Select' },
  { id: 'tool-file', name: 'File Upload' },
  { id: 'tool-header', name: 'Header' },
  { id: 'tool-number', name: 'Number Input' },
  { id: 'tool-paragraph', name: 'Paragraph' },
  { id: 'tool-radio', name: 'Radio Buttons' },
  { id: 'tool-separator', name: 'Separator' },
  { id: 'tool-static_text', name: 'Static Text' },
  { id: 'tool-table', name: 'Table' },
  { id: 'tool-text', name: 'Text Input' },
  { id: 'tool-time', name: 'Time Picker' },
  { id: 'tool-title', name: 'Title' },
];
function FormToolsPanel({ onAddElement }) {
  return (
    <div className="panel toolbox">
      <h2>Tools</h2>
      <p>Click or drag to add</p>
      {AVAILABLE_TOOLS.map((tool) => (
        <ToolboxItem
          key={tool.id}
          id={tool.id}
          name={tool.name}
          onAddElement={() => onAddElement(tool.id.replace('tool-', ''))}
        />
      ))}
    </div>
  );
}

export default FormToolsPanel;