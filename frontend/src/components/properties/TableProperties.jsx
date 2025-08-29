


// import React from 'react';
// import { nanoid } from 'nanoid';
// import CommonProperties from './CommonProperties';

// function TableProperties({ element, onUpdate }) {
//   const handleColumnChange = (colIndex, prop, value) => {
//     const newColumns = [...element.columns];
//     newColumns[colIndex][prop] = value;
//     onUpdate(element.id, { columns: newColumns });
//   };

//   const handleStaticTextChange = (colIndex, rowIndex, value) => {
//     const newColumns = [...element.columns];
//     const staticTexts = newColumns[colIndex].staticTexts || [];
//     staticTexts[rowIndex] = value;
//     newColumns[colIndex].staticTexts = staticTexts;
//     onUpdate(element.id, { columns: newColumns });
//   };

//   const addColumn = () => {
//     const newColumns = [...element.columns, { id: nanoid(), header: `Column ${element.columns.length + 1}`, type: 'text', width: 150 }];
//     onUpdate(element.id, { columns: newColumns });
//   };

//   const removeColumn = (colIndex) => {
//     const newColumns = element.columns.filter((_, index) => index !== colIndex);
//     onUpdate(element.id, { columns: newColumns });
//   };

//   const handlePropertyChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     onUpdate(element.id, { [name]: type === 'checkbox' ? checked : value });
//   };

//   const initialRowCount = parseInt(element.initialRows, 10) || 1;

//   return (
//     <>
//       <CommonProperties element={element} onUpdate={onUpdate} />
//       <div className="property-group">
//         <label htmlFor="initialRows">Initial Number of Rows</label>
//         <input 
//             id="initialRows" 
//             name="initialRows" 
//             type="number" 
//             min="1"
//             value={initialRowCount} 
//             onChange={handlePropertyChange} 
//         />
//       </div>
//       <div className="property-group-inline">
//         <input
//           id="allowRowActions"
//           name="allowRowActions"
//           type="checkbox"
//           checked={element.allowRowActions}
//           onChange={handlePropertyChange}
//         />
//         <label htmlFor="allowRowActions">Allow users to add/delete rows</label>
//       </div>

//       <div className="property-group validation-section">
//         <label>Columns Configuration</label>
//         {element.columns.map((col, index) => (
//           <div key={col.id} className="column-config">
//             <div className="property-group">
//               <label>Header Text</label>
//               <input type="text" value={col.header} onChange={(e) => handleColumnChange(index, 'header', e.target.value)} />
//             </div>
//             <div className="property-group">
//               <label>Width (px)</label>
//               <input type="number" min="50" value={col.width || 150} onChange={(e) => handleColumnChange(index, 'width', parseInt(e.target.value, 10))} />
//             </div>
//             <div className="property-group">
//               <label>Input Type</label>
//               <select value={col.type} onChange={(e) => handleColumnChange(index, 'type', e.target.value)}>
//                 <option value="text">Number</option>
//                 <option value="number">String</option>
//                 <option value="dropdown">Dropdown</option>
//                 <option value="static_text">Static Text (Read-only)</option>
//               </select>
//             </div>
//             {col.type === 'dropdown' && (
//               <div className="property-group">
//                 <label>Dropdown Options (one per line)</label>
//                 <textarea 
//                   value={(col.options || []).join('\n')}
//                   onChange={(e) => handleColumnChange(index, 'options', e.target.value.split('\n'))}
//                 />
//               </div>
//             )}
//             {col.type === 'static_text' && (
//               <div className="property-group">
//                 <label>Static Text for each row</label>
//                 {[...Array(initialRowCount)].map((_, rowIndex) => (
//                   <input
//                     key={rowIndex}
//                     type="text"
//                     placeholder={`Row ${rowIndex + 1} text`}
//                     value={(col.staticTexts || [])[rowIndex] || ''}
//                     onChange={(e) => handleStaticTextChange(index, rowIndex, e.target.value)}
//                     className="static-text-input"
//                   />
//                 ))}
//               </div>
//             )}
//             <button className="remove-column-btn" onClick={() => removeColumn(index)}>Remove Column</button>
//           </div>
//         ))}
//         <button onClick={addColumn} className="add-btn">Add Column</button>
//       </div>
//     </>
//   );
// }

// export default TableProperties;
import React from 'react';
import { nanoid } from 'nanoid';
import CommonProperties from './CommonProperties';

function TableProperties({ element, onUpdate }) {
  const handleColumnChange = (colIndex, prop, value) => {
    const newColumns = [...element.columns];
    newColumns[colIndex][prop] = value;
    onUpdate(element.id, { columns: newColumns });
  };

  const handleStaticTextChange = (colIndex, rowIndex, value) => {
    const newColumns = [...element.columns];
    const staticTexts = newColumns[colIndex].staticTexts || [];
    staticTexts[rowIndex] = value;
    newColumns[colIndex].staticTexts = staticTexts;
    onUpdate(element.id, { columns: newColumns });
  };

  // Handle cell value changes for data entry
  const handleCellValueChange = (rowIndex, colIndex, value) => {
    const newTableData = [...(element.tableData || [])];
    if (!newTableData[rowIndex]) {
      newTableData[rowIndex] = [];
    }
    newTableData[rowIndex][colIndex] = value;
    onUpdate(element.id, { tableData: newTableData });
  };

  const addColumn = () => {
    const newColumns = [...element.columns, { 
      id: nanoid(), 
      header: `Column ${element.columns.length + 1}`, 
      type: 'text', 
      width: 150 
    }];
    onUpdate(element.id, { columns: newColumns });
  };

  const removeColumn = (colIndex) => {
    const newColumns = element.columns.filter((_, index) => index !== colIndex);
    onUpdate(element.id, { columns: newColumns });
  };

  const addRow = () => {
    const currentRows = parseInt(element.initialRows, 10) || 0;
    const newRowCount = currentRows + 1;
    onUpdate(element.id, { initialRows: newRowCount.toString() });
  };

  const removeRow = (rowIndex) => {
    const currentRows = parseInt(element.initialRows, 10) || 0;
    if (currentRows > rowIndex) {
      const newRowCount = currentRows - 1;
      onUpdate(element.id, { initialRows: newRowCount.toString() });
      
      // Also remove the corresponding row's static text data from all columns
      const newColumns = element.columns.map(col => {
        if (col.staticTexts && col.staticTexts.length > newRowCount) {
          return { ...col, staticTexts: col.staticTexts.slice(0, newRowCount) };
        }
        return col;
      });
      onUpdate(element.id, { columns: newColumns });

      // Remove the row data from tableData
      const newTableData = [...(element.tableData || [])];
      newTableData.splice(rowIndex, 1);
      onUpdate(element.id, { tableData: newTableData });
    }
  };

  const handlePropertyChange = (e) => {
    const { name, value, type, checked } = e.target;
    onUpdate(element.id, { [name]: type === 'checkbox' ? checked : value });
  };

  const handleInitialColumnsChange = (e) => {
    const value = e.target.value;
    const newColumnCount = parseInt(value, 10);
    
    if (value === '' || isNaN(newColumnCount)) {
      onUpdate(element.id, { initialColumns: value });
      return;
    }

    const currentColumnCount = element.columns.length;
    
    if (newColumnCount > currentColumnCount) {
      // Add columns
      const newColumns = [...element.columns];
      for (let i = currentColumnCount; i < newColumnCount; i++) {
        newColumns.push({
          id: nanoid(),
          header: `Column ${i + 1}`,
          type: 'text',
          width: 150
        });
      }
      onUpdate(element.id, { columns: newColumns, initialColumns: value });
    } else if (newColumnCount < currentColumnCount) {
      // Remove columns
      const newColumns = element.columns.slice(0, newColumnCount);
      onUpdate(element.id, { columns: newColumns, initialColumns: value });
    } else {
      onUpdate(element.id, { initialColumns: value });
    }
  };

  const initialRowCount = parseInt(element.initialRows, 10) || 0;
  const initialColumnCount = element.initialColumns === '' ? '' : (parseInt(element.initialColumns, 10) || element.columns.length);
  const tableData = element.tableData || [];
  const isTransposed = element.transposed || false;

  // Render cell input for data entry with BLACK text color
  const renderCellInput = (rowIndex, colIndex, col) => {
    const cellValue = (tableData[rowIndex] && tableData[rowIndex][colIndex]) || '';
    
    if (col.type === 'dropdown') {
      return (
        <select
          value={cellValue}
          onChange={(e) => handleCellValueChange(rowIndex, colIndex, e.target.value)}
          style={{ width: '100%', padding: '4px', color: 'black' }}
        >
          <option value="">Select...</option>
          {(col.options || []).map((option, optIndex) => (
            <option key={optIndex} value={option}>{option}</option>
          ))}
        </select>
      );
    } else if (col.type === 'static_text') {
      return (
        <span style={{ padding: '4px', color: 'black' }}>
          {(col.staticTexts && col.staticTexts[rowIndex]) || '...'}
        </span>
      );
    } else {
      return (
        <input
          type={col.type === 'number' ? 'number' : 'text'}
          value={cellValue}
          onChange={(e) => handleCellValueChange(rowIndex, colIndex, e.target.value)}
          style={{ width: '100%', padding: '4px', color: 'black' }}
          placeholder="Enter value..."
        />
      );
    }
  };

  return (
    <>
      <CommonProperties element={element} onUpdate={onUpdate} />
      
      <div className="property-group">
        <label htmlFor="initialColumns">Initial Number of Columns</label>
        <input 
          id="initialColumns" 
          name="initialColumns" 
          type="number" 
          min="0"
          value={initialColumnCount} 
          onChange={handleInitialColumnsChange}
          placeholder="Enter number of columns"
        />
      </div>

      <div className="property-group">
        <label htmlFor="initialRows">Initial Number of Rows</label>
        <input 
          id="initialRows" 
          name="initialRows" 
          type="number" 
          min="0"
          value={element.initialRows} 
          onChange={handlePropertyChange}
          placeholder="Enter number of rows"
        />
      </div>

      <div className="property-group-inline">
        <input
          id="allowColumnActions"
          name="allowColumnActions"
          type="checkbox"
          checked={element.allowColumnActions}
          onChange={handlePropertyChange}
        />
        <label htmlFor="allowColumnActions">Allow users to add/delete columns</label>
      </div>

      <div className="property-group-inline">
        <input
          id="allowRowActions"
          name="allowRowActions"
          type="checkbox"
          checked={element.allowRowActions}
          onChange={handlePropertyChange}
        />
        <label htmlFor="allowRowActions">Allow users to add/delete rows</label>
      </div>

      <div className="property-group-inline">
        <input
          id="transposed"
          name="transposed"
          type="checkbox"
          checked={element.transposed || false}
          onChange={handlePropertyChange}
        />
        <label htmlFor="transposed">Transpose table (rows become columns)</label>
      </div>

      {/* DATA ENTRY SECTION */}
      {initialRowCount > 0 && element.columns.length > 0 && (
        <div className="property-group validation-section">
          <label>📝 Enter Table Data</label>
          <div style={{ 
            maxHeight: '300px', 
            overflowY: 'auto', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            backgroundColor: 'white'
          }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', position: 'sticky', top: 0 }}>
                  {isTransposed ? (
                    <>
                      <th style={{ border: '1px solid #ddd', padding: '8px', minWidth: '100px' }}>Field</th>
                      {[...Array(initialRowCount)].map((_, rowIndex) => (
                        <th key={rowIndex} style={{ border: '1px solid #ddd', padding: '8px', minWidth: '120px' }}>
                          Entry {rowIndex + 1}
                        </th>
                      ))}
                    </>
                  ) : (
                    element.columns.map((col, colIndex) => (
                      <th key={col.id} style={{ 
                        border: '1px solid #ddd', 
                        padding: '8px', 
                        minWidth: `${Math.max(col.width || 150, 120)}px`
                      }}>
                        {col.header}
                      </th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody>
                {isTransposed ? (
                  // Transposed: Each column becomes a row
                  element.columns.map((col, colIndex) => (
                    <tr key={col.id}>
                      <td style={{ 
                        border: '1px solid #ddd', 
                        padding: '8px', 
                        fontWeight: 'bold',
                        backgroundColor: '#f9f9f9'
                      }}>
                        {col.header}
                      </td>
                      {[...Array(initialRowCount)].map((_, rowIndex) => (
                        <td key={rowIndex} style={{ border: '1px solid #ddd', padding: '4px' }}>
                          {renderCellInput(rowIndex, colIndex, col)}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  // Normal: Each row is a row
                  [...Array(initialRowCount)].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {element.columns.map((col, colIndex) => (
                        <td key={col.id} style={{ border: '1px solid #ddd', padding: '4px' }}>
                          {renderCellInput(rowIndex, colIndex, col)}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0' }}>
            
          </p>
        </div>
      )}

      <div className="property-group validation-section">
        <label>Columns Configuration</label>
        {element.columns.length > 0 ? (
          element.columns.map((col, index) => (
            <div key={col.id} className="column-config">
              <div className="property-group">
                <label>Header Text</label>
                <input 
                  type="text" 
                  value={col.header} 
                  onChange={(e) => handleColumnChange(index, 'header', e.target.value)} 
                />
              </div>
              <div className="property-group">
                <label>Width (px)</label>
                <input 
                  type="number" 
                  min="50" 
                  value={col.width || 150} 
                  onChange={(e) => handleColumnChange(index, 'width', parseInt(e.target.value, 10))} 
                />
              </div>
              <div className="property-group">
                <label>Input Type</label>
                <select value={col.type} onChange={(e) => handleColumnChange(index, 'type', e.target.value)}>
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="static_text">Static Text (Read-only)</option>
                </select>
              </div>
              {col.type === 'dropdown' && (
                <div className="property-group">
                  <label>Dropdown Options (one per line)</label>
                  <textarea 
                    value={(col.options || []).join('\n')}
                    onChange={(e) => handleColumnChange(index, 'options', e.target.value.split('\n'))}
                  />
                </div>
              )}
              {col.type === 'static_text' && initialRowCount > 0 && (
                <div className="property-group">
                  <label>Static Text for each row</label>
                  {[...Array(initialRowCount)].map((_, rowIndex) => (
                    <input
                      key={rowIndex}
                      type="text"
                      placeholder={`Row ${rowIndex + 1} text`}
                      value={(col.staticTexts || [])[rowIndex] || ''}
                      onChange={(e) => handleStaticTextChange(index, rowIndex, e.target.value)}
                      className="static-text-input"
                    />
                  ))}
                </div>
              )}
              <button className="remove-column-btn" onClick={() => removeColumn(index)}>
                Remove Column
              </button>
            </div>
          ))
        ) : (
          <p>Set the initial number of columns above to configure them.</p>
        )}
        <button onClick={addColumn} className="add-btn">Add Column</button>
      </div>

      <div className="property-group validation-section">
        <label>Rows Configuration</label>
        {initialRowCount > 0 ? (
          [...Array(initialRowCount)].map((_, index) => (
            <div key={index} className="column-config">
              <div className="property-group">
                <label>Row {index + 1}</label>
                <input 
                  type="text" 
                  value={`Row ${index + 1}`}
                  disabled
                  style={{ backgroundColor: 'rgb(51, 51, 51)', color: '#fdfafaff' }}
                />
              </div>
              <button className="remove-column-btn" onClick={() => removeRow(index)}>
                Remove Row
              </button>
            </div>
          ))
        ) : (
          <p>Set the initial number of rows above to configure them.</p>
        )}
        <button onClick={addRow} className="add-btn">Add Row</button>
      </div>
    </>
  );
}

export default TableProperties;
