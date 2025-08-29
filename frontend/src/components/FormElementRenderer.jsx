




// // import React from 'react';
// // import { useSortable } from '@dnd-kit/sortable';
// // import { CSS } from '@dnd-kit/utilities';
// // import DragHandle from './DragHandle';

// // function FormElementRenderer({ element, isSelected, onSelectElement, isPreview = false }) {
// //   const { type, label, placeholder, options, columns, initialRows } = element;

// //   const {
// //     attributes,
// //     listeners,
// //     setNodeRef,
// //     transform,
// //     transition,
// //     isDragging,
// //   } = useSortable({
// //     id: element.id,
// //     data: {
// //       type: 'element',
// //       element: element
// //     }
// //   });

// //   const style = {
// //     transform: CSS.Transform.toString(transform),
// //     transition,
// //   };

// //   const handleElementClick = (e) => {
// //     e.stopPropagation();
// //     onSelectElement(element);
// //   };

// //   const selectedClassName = isSelected ? 'selected' : '';
// //   const draggingClassName = isDragging ? 'dragging' : '';
// //   const requiredSpan = element.required && <span className="required-asterisk">*</span>;

// //   return (
// //     <div
// //       ref={setNodeRef}
// //       style={style}
// //       className={`form-element-wrapper ${selectedClassName} ${draggingClassName}`}
// //       onClick={isPreview ? undefined : handleElementClick}
// //       {...attributes}
// //       data-type={element.type}
// //     >
// //       {!isPreview && <DragHandle {...listeners} />}

// //       {(() => {
// //         switch (type) {
// //           case 'text':
// //             return (
// //               <div className="form-element-render">
// //                 <label>{label} {requiredSpan}</label>
// //                 <input type="text" placeholder={placeholder} readOnly={!isPreview} />
// //               </div>
// //             );

// //          case 'paragraph':
// //             return (
// //               <div className="form-element-render">
// //                 <label>{label} {requiredSpan}</label>
// //                 <textarea placeholder={placeholder} readOnly={!isPreview} />
// //               </div>
// //             );

// //           case 'radio':
// //             return (
// //               <div className="form-element-render">
// //                 <label>{label} {requiredSpan}</label>
// //                 <div className="options-group">
// //                   {(options || []).map((option, index) => (
// //                     <div key={index} className="option">
// //                       <input type="radio" name={element.id} disabled={!isPreview} />
// //                       <span>{option}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             );

// //           case 'checkbox':
// //             return (
// //               <div className="form-element-render">
// //                 <label>{label} {requiredSpan}</label>
// //                 <div className="options-group">
// //                   {(options || []).map((option, index) => (
// //                     <div key={index} className="option">
// //                       <input type="checkbox" disabled={!isPreview} />
// //                       <span>{option}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             );

// //           case 'number':
// //             return (
// //               <div className="form-element-render">
// //                 <label>{label} {requiredSpan}</label>
// //                 <input type="number" placeholder={placeholder} readOnly={!isPreview} />
// //               </div>
// //             );

// //           case 'dropdown':
// //             return (
// //               <div className="form-element-render">
// //                 <label>{label} {requiredSpan}</label>
// //                 <select disabled={!isPreview}>
// //                   {(options || []).map((option, index) => (
// //                     <option key={index}>{option}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             );

// //           case 'file':
// //             return (
// //               <div className="form-element-render">
// //                 <label>{label} {requiredSpan}</label>
// //                 <input type="file" disabled={!isPreview} />
// //               </div>
// //             );

// //           case 'date':
// //             return (
// //               <div className="form-element-render">
// //                 <label>{label} {requiredSpan}</label>
// //                 <input type="date" disabled={!isPreview} />
// //               </div>
// //             );

// //           case 'time':
// //             return (
// //               <div className="form-element-render">
// //                 <label>{label} {requiredSpan}</label>
// //                 <input type="time" disabled={!isPreview} />
// //               </div>
// //             );

// //           case 'separator':
// //             return (
// //               <div className="form-element-render">
// //                 <hr className="form-separator" />
// //               </div>
// //             );

// //           case 'header':
// //             return (
// //               <div className="form-element-render">
// //                 <h2 className="form-header" style={{ textAlign: element.textAlign }}>{element.text}</h2>
// //               </div>
// //             );

// //           case 'title':
// //             return (
// //               <div className="form-element-render">
// //                 <h3 className="form-title" style={{ textAlign: element.textAlign }}>{element.text}</h3>
// //               </div>
// //             );

// //           case 'table':
// //             // Show a max of 5 rows in builder preview to avoid UI clutter
// //             const previewRowCount = Math.min(parseInt(initialRows, 10) || 1, 5);
// //             return (
// //               <div className="form-element-render">
// //                 <label>{label} {requiredSpan}</label>
// //                 <table className="builder-table-preview">
// //                   <thead>
// //                     <tr>
// //                       {(columns || []).map(col => <th key={col.id}>{col.header}</th>)}
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {[...Array(previewRowCount)].map((_, rowIndex) => (
// //                       <tr key={rowIndex}>
// //                         {(columns || []).map(col => <td key={col.id}>...</td>)}
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             );

// //           default:
// //             return <div>Unsupported element type</div>;
// //         }
// //       })()}
// //     </div>
// //   );
// // }

// // export default FormElementRenderer;









// import React from 'react';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import DragHandle from './DragHandle';

// function FormElementRenderer({ element, isSelected, onSelectElement, isPreview = false }) {
//   const { type, label, placeholder, options, columns, initialRows } = element;

//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({
//     id: element.id,
//     data: {
//       type: 'element',
//       element: element
//     }
//   });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const handleElementClick = (e) => {
//     e.stopPropagation();
//     onSelectElement(element);
//   };

//   const selectedClassName = isSelected ? 'selected' : '';
//   const draggingClassName = isDragging ? 'dragging' : '';
//   const requiredSpan = element.required && <span className="required-asterisk">*</span>;

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className={`form-element-wrapper ${selectedClassName} ${draggingClassName}`}
//       onClick={isPreview ? undefined : handleElementClick}
//       {...attributes}
//       data-type={element.type}
//     >
//       {!isPreview && <DragHandle {...listeners} />}

//       {(() => {
//         switch (type) {
//           case 'text':
//             return (
//               <div className="form-element-render">
//                 <label>{label} {requiredSpan}</label>
//                 <input type="text" placeholder={placeholder} readOnly={!isPreview} />
//               </div>
//             );

//          case 'paragraph':
//             return (
//               <div className="form-element-render">
//                 <label>{label} {requiredSpan}</label>
//                 <textarea placeholder={placeholder} readOnly={!isPreview} />
//               </div>
//             );

//           case 'radio':
//             return (
//               <div className="form-element-render">
//                 <label>{label} {requiredSpan}</label>
//                 <div className="options-group">
//                   {(options || []).map((option, index) => (
//                     <div key={index} className="option">
//                       <input type="radio" name={element.id} disabled={!isPreview} />
//                       <span>{option}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );

//           case 'checkbox':
//             return (
//               <div className="form-element-render">
//                 <label>{label} {requiredSpan}</label>
//                 <div className="options-group">
//                   {(options || []).map((option, index) => (
//                     <div key={index} className="option">
//                       <input type="checkbox" disabled={!isPreview} />
//                       <span>{option}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );

//           case 'number':
//             return (
//               <div className="form-element-render">
//                 <label>{label} {requiredSpan}</label>
//                 <input type="number" placeholder={placeholder} readOnly={!isPreview} />
//               </div>
//             );

//           case 'dropdown':
//             return (
//               <div className="form-element-render">
//                 <label>{label} {requiredSpan}</label>
//                 <select disabled={!isPreview}>
//                   {(options || []).map((option, index) => (
//                     <option key={index}>{option}</option>
//                   ))}
//                 </select>
//               </div>
//             );

//           case 'file':
//             return (
//               <div className="form-element-render">
//                 <label>{label} {requiredSpan}</label>
//                 <input type="file" disabled={!isPreview} />
//               </div>
//             );

//           case 'date':
//             return (
//               <div className="form-element-render">
//                 <label>{label} {requiredSpan}</label>
//                 <input type="date" disabled={!isPreview} />
//               </div>
//             );

//           case 'time':
//             return (
//               <div className="form-element-render">
//                 <label>{label} {requiredSpan}</label>
//                 <input type="time" disabled={!isPreview} />
//               </div>
//             );

//           case 'separator':
//             return (
//               <div className="form-element-render">
//                 <hr className="form-separator" />
//               </div>
//             );

//           case 'header':
//             return (
//               <div className="form-element-render">
//                 <h2 className="form-header" style={{ textAlign: element.textAlign }}>{element.text}</h2>
//               </div>
//             );

//           case 'title':
//             return (
//               <div className="form-element-render">
//                 <h3 className="form-title" style={{ textAlign: element.textAlign }}>{element.text}</h3>
//               </div>
//             );

//            case 'table':
//             const previewRowCount = Math.min(parseInt(initialRows, 10) || 1, 5); 
//             return (
//               <div className="form-element-render">
//                 <label>{label} {requiredSpan}</label>
//                 <div className="table-scroll-wrapper">
//                   <table className="builder-table-preview">
//                     <thead>
//                       <tr>
//                         {(columns || []).map(col => <th key={col.id} style={{ width: `${col.width || 150}px` }}>{col.header}</th>)}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {[...Array(previewRowCount)].map((_, rowIndex) => (
//                         <tr key={rowIndex}>
//                           {(columns || []).map(col => (
//                             <td key={col.id}>
//                               {col.type === 'static_text' ? ((col.staticTexts || [])[rowIndex] || '...') : '...'}
//                             </td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             );

//         case 'static_text': {
//         const classNames = `static-text-render font-size-${element.fontSize || 'medium'} ${element.styled ? 'styled' : ''}`;
//         return (
//             <div className={classNames}>
//                 {element.text}
//             </div>
//         );
//     }

//           default:
//             return <div>Unsupported element type</div>;
//         }
//       })()}
//     </div>
//   );
// }

// export default FormElementRenderer;
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragHandle from './DragHandle';

function FormElementRenderer({ element, isSelected, onSelectElement, isPreview = false, onUpdate }) {
  const { type, label, placeholder, options, columns, initialRows } = element;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: element.id,
    data: {
      type: 'element',
      element: element
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleElementClick = (e) => {
    e.stopPropagation();
    onSelectElement(element);
  };

  const selectedClassName = isSelected ? 'selected' : '';
  const draggingClassName = isDragging ? 'dragging' : '';
  const requiredSpan = element.required && <span className="required-asterisk">*</span>;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`form-element-wrapper ${selectedClassName} ${draggingClassName}`}
      onClick={isPreview ? undefined : handleElementClick}
      {...attributes}
      data-type={element.type}
    >
      {!isPreview && <DragHandle {...listeners} />}

      {(() => {
        switch (type) {
          case 'text':
            return (
              <div className="form-element-render">
                <label>{label} {requiredSpan}</label>
                <input type="text" placeholder={placeholder} readOnly={!isPreview} style={{ color: 'black' }} />
              </div>
            );

         case 'paragraph':
            return (
              <div className="form-element-render">
                <label>{label} {requiredSpan}</label>
                <textarea placeholder={placeholder} readOnly={!isPreview} style={{ color: 'black' }} />
              </div>
            );

          case 'radio':
            return (
              <div className="form-element-render">
                <label>{label} {requiredSpan}</label>
                <div className="options-group">
                  {(options || []).map((option, index) => (
                    <div key={index} className="option">
                      <input type="radio" name={element.id} disabled={!isPreview} />
                      <span style={{ color: 'black' }}>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'checkbox':
            return (
              <div className="form-element-render">
                <label>{label} {requiredSpan}</label>
                <div className="options-group">
                  {(options || []).map((option, index) => (
                    <div key={index} className="option">
                      <input type="checkbox" disabled={!isPreview} />
                      <span style={{ color: 'black' }}>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'number':
            return (
              <div className="form-element-render">
                <label>{label} {requiredSpan}</label>
                <input 
                  type="number" 
                  placeholder={placeholder} 
                  readOnly={!isPreview}
                  min={element.min}
                  max={element.max}
                  style={{ color: 'black' }} 
                />
              </div>
            );

          case 'dropdown':
            return (
              <div className="form-element-render">
                <label>{label} {requiredSpan}</label>
                <select disabled={!isPreview} style={{ color: 'black' }}>
                  <option>Select an option...</option>
                  {(options || []).map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </select>
              </div>
            );

          case 'file':
            return (
              <div className="form-element-render">
                <label>{label} {requiredSpan}</label>
                <input type="file" disabled={!isPreview} />
              </div>
            );

          case 'date':
            return (
              <div className="form-element-render">
                <label>{label} {requiredSpan}</label>
                {/* Show date constraints below the label */}
                <div style={{ 
                  marginTop: '8px', 
                  fontSize: '12px', 
                  color: '#666',
                  lineHeight: '1.4'
                }}>
                  {element.minDate && (
                    <div>📅 Min Date: <span style={{ fontWeight: 'bold', color: 'black' }}>{element.minDate}</span></div>
                  )}
                  {element.maxDate && (
                    <div>📅 Max Date: <span style={{ fontWeight: 'bold', color: 'black' }}>{element.maxDate}</span></div>
                  )}
                  {!element.minDate && !element.maxDate && (
                    <div style={{ color: '#999' }}>Configure date constraints in properties panel</div>
                  )}
                </div>
              </div>
            );

          case 'time':
            return (
              <div className="form-element-render">
                <label>{label} {requiredSpan}</label>
                <input 
                  type="time" 
                  disabled={!isPreview}
                  min={element.minTime}
                  max={element.maxTime}
                  style={{ color: 'black' }}
                />
              </div>
            );

          case 'separator':
            return (
              <div className="form-element-render">
                <hr className="form-separator" />
              </div>
            );

          case 'header':
            return (
              <div className="form-element-render">
                <h2 className="form-header" style={{ textAlign: element.textAlign, color: 'black' }}>{element.text}</h2>
              </div>
            );

          case 'title':
            return (
              <div className="form-element-render">
                <h3 className="form-title" style={{ textAlign: element.textAlign, color: 'black' }}>{element.text}</h3>
              </div>
            );

          case 'table':
            const initialRowCount = parseInt(element.initialRows, 10) || 0;
            const isTransposed = element.transposed || false;
            const tableData = element.tableData || [];

            const handleCellValueChange = (rowIndex, colIndex, value) => {
              if (onUpdate) {
                const newTableData = [...tableData];
                if (!newTableData[rowIndex]) {
                  newTableData[rowIndex] = [];
                }
                newTableData[rowIndex][colIndex] = value;
                onUpdate(element.id, { tableData: newTableData });
              }
            };

            const renderTableCell = (rowIndex, colIndex, col) => {
              const cellValue = (tableData[rowIndex] && tableData[rowIndex][colIndex]) || '';
              
              if (col.type === 'dropdown') {
                return (
                  <select
                    value={cellValue}
                    onChange={(e) => handleCellValueChange(rowIndex, colIndex, e.target.value)}
                    style={{ width: '100%', border: 'none', padding: '4px', backgroundColor: 'transparent', color: 'black' }}
                    disabled={!isPreview}
                  >
                    <option value="">Select...</option>
                    {(col.options || []).map((option, optIndex) => (
                      <option key={optIndex} value={option}>{option}</option>
                    ))}
                  </select>
                );
              } else if (col.type === 'static_text') {
                return (
                  <span style={{ padding: '4px', display: 'block', color: 'black' }}>
                    {(col.staticTexts && col.staticTexts[rowIndex]) || '...'}
                  </span>
                );
              } else {
                return (
                  <input
                    type={col.type === 'number' ? 'number' : 'text'}
                    value={cellValue}
                    onChange={(e) => handleCellValueChange(rowIndex, colIndex, e.target.value)}
                    style={{ 
                      width: '100%', 
                      border: 'none', 
                      padding: '4px', 
                      backgroundColor: 'transparent',
                      outline: 'none',
                      color: 'black'
                    }}
                    placeholder="..."
                    readOnly={!isPreview}
                  />
                );
              }
            };

            if (!columns || columns.length === 0 || initialRowCount === 0) {
              return (
                <div className="form-element-render">
                  <label>{label} {requiredSpan}</label>
                  <div style={{ 
                    padding: '20px', 
                    textAlign: 'center', 
                    border: '2px dashed #ccc', 
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9'
                  }}>
                    <p style={{ margin: '0 0 8px 0', color: '#666' }}>Table Preview</p>
                    <p style={{ color: '#999', fontSize: '12px', margin: '0' }}>
                      Configure columns and rows in properties panel
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div className="form-element-render">
                <label>{label} {requiredSpan}</label>
                <div className="table-scroll-wrapper" style={{ overflowX: 'auto' }}>
                  <table className="builder-table-preview" style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    border: '1px solid #ddd',
                    backgroundColor: 'white'
                  }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        {isTransposed ? (
                          <>
                            <th style={{ 
                              border: '1px solid #dee2e6', 
                              padding: '8px', 
                              textAlign: 'left',
                              fontWeight: '600',
                              minWidth: '120px'
                            }}>
                              Field
                            </th>
                            {[...Array(initialRowCount)].map((_, rowIndex) => (
                              <th key={rowIndex} style={{ 
                                border: '1px solid #dee2e6', 
                                padding: '8px', 
                                textAlign: 'center',
                                fontWeight: '600',
                                minWidth: '120px'
                              }}>
                                Entry {rowIndex + 1}
                              </th>
                            ))}
                          </>
                        ) : (
                          columns.map((col, colIndex) => (
                            <th key={col.id} style={{ 
                              border: '1px solid #dee2e6', 
                              padding: '8px', 
                              textAlign: 'left',
                              fontWeight: '600',
                              width: `${col.width || 150}px`
                            }}>
                              {col.header}
                            </th>
                          ))
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {isTransposed ? (
                        columns.map((col, colIndex) => (
                          <tr key={col.id} style={{ 
                            backgroundColor: colIndex % 2 === 0 ? 'white' : '#f8f9fa' 
                          }}>
                            <td style={{ 
                              border: '1px solid #dee2e6', 
                              padding: '8px', 
                              fontWeight: '600',
                              backgroundColor: '#f8f9fa'
                            }}>
                              {col.header}
                            </td>
                            {[...Array(initialRowCount)].map((_, rowIndex) => (
                              <td key={rowIndex} style={{ 
                                border: '1px solid #dee2e6', 
                                padding: '2px',
                                backgroundColor: 'white'
                              }}>
                                {renderTableCell(rowIndex, colIndex, col)}
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : (
                        [...Array(initialRowCount)].map((_, rowIndex) => (
                          <tr key={rowIndex} style={{ 
                            backgroundColor: rowIndex % 2 === 0 ? 'white' : '#f8f9fa' 
                          }}>
                            {columns.map((col, colIndex) => (
                              <td key={col.id} style={{ 
                                border: '1px solid #dee2e6', 
                                padding: '2px'
                              }}>
                                {renderTableCell(rowIndex, colIndex, col)}
                              </td>
                            ))}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );

        case 'static_text': {
        const classNames = `static-text-render font-size-${element.fontSize || 'medium'} ${element.styled ? 'styled' : ''}`;
        return (
            <div className={classNames} style={{ color: 'black' }}>
                {element.text}
            </div>
        );
    }

          default:
            return <div>Unsupported element type</div>;
        }
      })()}
    </div>
  );
}

export default FormElementRenderer;
