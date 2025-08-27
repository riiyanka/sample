
// import React, { useState, useRef } from 'react';
// import { DndContext, DragOverlay, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
// import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { nanoid } from 'nanoid';
// import Header from '../components/Header';
// import FormToolsPanel from '../components/FormToolsPanel';
// import Canvas from '../components/Canvas';
// import PropertiesPanel from '../components/PropertiesPanel';
// import ToolboxItem from '../components/ToolboxItem';
// import FormElementRenderer from '../components/FormElementRenderer';

// function FormBuilder() {
//   const [rows, setRows] = useState([]);
//   const [selectedElement, setSelectedElement] = useState(null);
//   const [activeDragElement, setActiveDragElement] = useState(null);
//   const [activeIndicator, setActiveIndicator] = useState(null);
//   const rowsRef = useRef(rows);
//   rowsRef.current = rows;

//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 10,
//       },
//     }),
//     useSensor(KeyboardSensor)
//   );
  
//   const createNewElement = (type) => ({
//     id: nanoid(),
//     type,
//     label: (type !== 'header' && type !== 'title' && type !== 'separator' && type !== 'static_text') ? `New ${type} field` : '',
//     required: false,
//     ...(type === 'text' && { 
//         placeholder: 'Placeholder text', 
//         minLength: '', 
//         maxLength: '',
//         validationFormat: 'none', 
//         characterType: 'any'
//     }),
//     ...(type === 'paragraph' && { 
//       placeholder: 'Longer placeholder text', 
//       minLength: '', 
//       maxLength: '', 
//       characterType: 'any' 
//     }),
//     ...((type === 'radio' || type === 'checkbox' || type === 'dropdown') && { options: ['Option 1', 'Option 2', 'Option 3'] }),
//     ...(type === 'checkbox' && { minSelections: '', maxSelections: '' }),
//     ...(type === 'number' && { placeholder: '0', min: '', max: '' }),
//     ...(type === 'file' && { acceptedTypes: '', maxSize: '' }),
//     ...(type === 'date' && { minDate: '', maxDate: '' }),
//     ...(type === 'time' && { minTime: '', maxTime: '' }),
//     ...(type === 'header' && { text: 'Main Header', textAlign: 'left' }),
//     ...(type === 'title' && { text: 'Section Title', textAlign: 'left' }),
//     ...(type === 'table' && {
//         label: 'New Table',
//         columns: [
//           { id: nanoid(), header: 'Column 1', type: 'text', width: 150 }
//         ],
//         initialColumns: '',
//         initialRows: '',
//         allowColumnActions: true,
//         allowRowActions: true
//     }),
//     ...(type === 'static_text' && {
//         text: 'This is some static text. You can edit this in the properties panel.',
//         fontSize: 'medium',
//         styled: false
//     })
//   });

//   const handleSave = () => {
//     console.log("Saving Form Data as JSON:");
//     const elementsToSave = rows.flatMap(row => row.elements);
//     console.log(JSON.stringify(elementsToSave, null, 2));
//     alert('Form data has been logged to the developer console! (Press F12)');
//   };

//   const handlePreview = () => {
//     localStorage.setItem('form_preview', JSON.stringify(rows));
//     window.open('/preview', '_blank');
//   };

//   const addElement = (type) => {
//     const newElement = createNewElement(type);
//     setRows((prevRows) => [...prevRows, { id: `row-${nanoid()}`, elements: [newElement] }]);
//   };

//   const findElementRecursive = (elementId) => {
//     for (const row of rowsRef.current) {
//       const element = row.elements.find(el => el.id === elementId);
//       if (element) return { row, element };
//     }
//     return { row: null, element: null };
//   };

//   const handleDragStart = (event) => {
//     const { active } = event;
//     if (active.id.startsWith('tool-')) {
//       const type = active.id.replace('tool-', '');
//       setActiveDragElement({ isTool: true, type: type, name: `${type.charAt(0).toUpperCase() + type.slice(1)} Input` });
//     } else {
//       const { element } = findElementRecursive(active.id);
//       if (element) {
//         setActiveDragElement(element);
//       }
//     }
//   };

//   const handleDragOver = (event) => {
//     const { active, over } = event;
//     if (!over) return;
  
//     const overId = over.id;
//     const isOverRow = over.data.current?.type === 'row';
//     const isOverCanvas = overId === 'canvas';
  
//     const isDraggingTool = active.id.startsWith('tool-');
//     const isDraggingElement = active.data.current?.type === 'element';
  
//     if ((isDraggingTool || isDraggingElement) && (isOverRow || isOverCanvas)) {
//       if (isOverRow) {
//         const overRowRect = over.rect;
//         const hoverMiddleY = overRowRect.top + overRowRect.height / 2;
//         const isHoveringTopHalf = event.clientY < hoverMiddleY;
//         setActiveIndicator({ rowId: overId, position: isHoveringTopHalf ? 'top' : 'bottom' });
//       } else if (isOverCanvas && rows.length > 0) {
//         setActiveIndicator({ rowId: rows[rows.length - 1].id, position: 'bottom' });
//       } else {
//         setActiveIndicator(null);
//       }
//     } else {
//       setActiveIndicator(null);
//     }
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     setActiveIndicator(null);
//     setActiveDragElement(null);

//     if (!over) return;

//     const activeId = active.id;
//     const overId = over.id;

//     if (activeId === overId && !activeIndicator) return;

//     const isTool = active.id.startsWith('tool-');
    
//     if (isTool) {
//         const type = active.id.replace('tool-', '');
//         const newElement = createNewElement(type);
//         const newRow = { id: `row-${nanoid()}`, elements: [newElement] };

//         if (activeIndicator) {
//             const overIndex = rows.findIndex(r => r.id === activeIndicator.rowId);
//             const insertIndex = activeIndicator.position === 'top' ? overIndex : overIndex + 1;
//             setRows(rows => [...rows.slice(0, insertIndex), newRow, ...rows.slice(insertIndex)]);
//         } else if (over.id === 'canvas') {
//             setRows(rows => [...rows, newRow]);
//         } else {
//             const overIsRow = over.data.current?.type === 'row';
//             if(overIsRow) {
//                 setRows(rows => rows.map(r => r.id === overId ? { ...r, elements: [...r.elements, newElement] } : r));
//             } else {
//                 const { row: overRow } = findElementRecursive(overId);
//                 if (overRow) {
//                     setRows(rows => rows.map(r => r.id === overRow.id ? { ...r, elements: [...r.elements, newElement] } : r));
//                 }
//             }
//         }
//         return;
//     }

//     const { row: activeRow, element: activeElement } = findElementRecursive(activeId);
//     if (!activeElement) return;

//     if (activeIndicator) {
//         setRows(rows => {
//             const newRows = rows.map(r => ({ ...r, elements: r.elements.filter(el => el.id !== activeId) }));
//             const overIndex = newRows.findIndex(r => r.id === activeIndicator.rowId);
//             const insertIndex = activeIndicator.position === 'top' ? overIndex : overIndex + 1;
//             const newRow = { id: `row-${nanoid()}`, elements: [activeElement] };
//             return [...newRows.slice(0, insertIndex), newRow, ...newRows.slice(insertIndex)].filter(r => r.elements.length > 0);
//         });
//         return;
//     }

//     const overIsRow = over.data.current?.type === 'row';
//     const overIsElement = over.data.current?.type === 'element';
    
//     if (overIsRow) {
//         setRows(rows => {
//             const newRows = rows.map(r => ({ ...r, elements: r.elements.filter(el => el.id !== activeId) }));
//             const overRowIndex = newRows.findIndex(r => r.id === overId);
//             newRows[overRowIndex].elements.push(activeElement);
//             return newRows.filter(r => r.elements.length > 0);
//         });
//     } else if (overIsElement) {
//         const { row: overRow } = findElementRecursive(overId);
//         if (activeRow.id === overRow.id) {
//             setRows(rows => rows.map(row => {
//               if (row.id === activeRow.id) {
//                 const oldIndex = row.elements.findIndex(el => el.id === activeId);
//                 const newIndex = row.elements.findIndex(el => el.id === overId);
//                 return { ...row, elements: arrayMove(row.elements, oldIndex, newIndex) };
//               }
//               return row;
//             }));
//         } else {
//             setRows(rows => {
//                 const newRows = rows.map(r => ({ ...r, elements: r.elements.filter(el => el.id !== activeId) }));
//                 const overRowIndex = newRows.findIndex(r => r.id === overRow.id);
//                 const overElementIndex = newRows[overRowIndex].elements.findIndex(el => el.id === overId);
//                 newRows[overRowIndex].elements.splice(overElementIndex, 0, activeElement);
//                 return newRows.filter(r => r.elements.length > 0);
//             });
//         }
//     }
//   };

//   const handleSelectElement = (element) => {
//     setSelectedElement(element);
//   };

//   const updateElementProperties = (elementId, newProperties) => {
//     setRows((prevRows) =>
//       prevRows.map((row) => ({
//         ...row,
//         elements: row.elements.map((element) =>
//           element.id === elementId ? { ...element, ...newProperties } : element
//         ),
//       }))
//     );
//     setSelectedElement((prevSelected) =>
//       prevSelected?.id === elementId ? { ...prevSelected, ...newProperties } : prevSelected
//     );
//   };

//   const deleteElement = (elementId) => {
//     setRows((prevRows) =>
//       prevRows
//         .map((row) => ({
//           ...row,
//           elements: row.elements.filter((element) => element.id !== elementId),
//         }))
//         .filter((row) => row.elements.length > 0)
//     );
//     setSelectedElement(null);
//   };
  
//   return (
//     <div className="form-builder-layout">
//       <Header onSave={handleSave} onPreview={handlePreview} />
//       <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} collisionDetection={closestCenter} sensors={sensors}>
//         <div className="app-container">
//           <FormToolsPanel onAddElement={addElement} />
//           <Canvas
//             rows={rows}
//             onSelectElement={handleSelectElement}
//             selectedElement={selectedElement}
//             activeIndicator={activeIndicator}
//           />
//           <PropertiesPanel
//             element={selectedElement}
//             onUpdate={updateElementProperties}
//             onDelete={deleteElement}
//           />
//         </div>
//         <DragOverlay>
//           {activeDragElement ? (
//             activeDragElement.isTool ? (
//               <ToolboxItem id={activeDragElement.type} name={activeDragElement.name} />
//             ) : (
//               <FormElementRenderer element={activeDragElement} />
//             )
//           ) : null}
//         </DragOverlay>
//       </DndContext>
//     </div>
//   );
// }

// export default FormBuilder;
import React, { useState, useRef } from 'react';
import { DndContext, DragOverlay, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import Header from '../components/Header';
import FormToolsPanel from '../components/FormToolsPanel';
import Canvas from '../components/Canvas';
import PropertiesPanel from '../components/PropertiesPanel';
import ToolboxItem from '../components/ToolboxItem';
import FormElementRenderer from '../components/FormElementRenderer';
import { saveAsPDF, clearForm } from '../utils/pdfUtils';

function FormBuilder() {
  const [rows, setRows] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeDragElement, setActiveDragElement] = useState(null);
  const [activeIndicator, setActiveIndicator] = useState(null);
  const rowsRef = useRef(rows);
  rowsRef.current = rows;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor)
  );
  
  const createNewElement = (type) => ({
    id: nanoid(),
    type,
    label: (type !== 'header' && type !== 'title' && type !== 'separator' && type !== 'static_text') ? `New ${type} field` : '',
    required: false,
    ...(type === 'text' && { 
        placeholder: 'Placeholder text', 
        minLength: '', 
        maxLength: '',
        validationFormat: 'none', 
        characterType: 'any'
    }),
    ...(type === 'paragraph' && { 
      placeholder: 'Longer placeholder text', 
      minLength: '', 
      maxLength: '', 
      characterType: 'any' 
    }),
    ...((type === 'radio' || type === 'checkbox' || type === 'dropdown') && { options: ['Option 1', 'Option 2', 'Option 3'] }),
    ...(type === 'checkbox' && { minSelections: '', maxSelections: '' }),
    ...(type === 'number' && { placeholder: '0', min: '', max: '' }),
    ...(type === 'file' && { acceptedTypes: '', maxSize: '' }),
    ...(type === 'date' && { minDate: '', maxDate: '' }),
    ...(type === 'time' && { minTime: '', maxTime: '' }),
    ...(type === 'header' && { text: 'Main Header', textAlign: 'left' }),
    ...(type === 'title' && { text: 'Section Title', textAlign: 'left' }),
    ...(type === 'table' && {
        label: 'New Table',
        columns: [],
        initialColumns: '',
        initialRows: '',
        allowColumnActions: true,
        allowRowActions: true,
        transposed: false,
        tableData: []
    }),
    ...(type === 'static_text' && {
        text: 'This is some static text. You can edit this in the properties panel.',
        fontSize: 'medium',
        styled: false
    })
  });

  const handleSave = () => {
    if (rows.length === 0) {
      alert('No form elements to save! Please add some elements first.');
      return;
    }
    
    console.log("Saving Form Data as JSON:");
    const elementsToSave = rows.flatMap(row => row.elements);
    console.log(JSON.stringify(elementsToSave, null, 2));
    
    saveAsPDF();
  };

  const handleClear = () => {
    clearForm();
  };

  const handlePreview = () => {
    localStorage.setItem('form_preview', JSON.stringify(rows));
    window.open('/preview', '_blank');
  };

  const addElement = (type) => {
    const newElement = createNewElement(type);
    setRows((prevRows) => [...prevRows, { id: `row-${nanoid()}`, elements: [newElement] }]);
  };

  const findElementRecursive = (elementId) => {
    for (const row of rowsRef.current) {
      const element = row.elements.find(el => el.id === elementId);
      if (element) return { row, element };
    }
    return { row: null, element: null };
  };

  const handleDragStart = (event) => {
    const { active } = event;
    if (active.id.startsWith('tool-')) {
      const type = active.id.replace('tool-', '');
      setActiveDragElement({ isTool: true, type: type, name: `${type.charAt(0).toUpperCase() + type.slice(1)} Input` });
    } else {
      const { element } = findElementRecursive(active.id);
      if (element) {
        setActiveDragElement(element);
      }
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;
  
    const overId = over.id;
    const isOverRow = over.data.current?.type === 'row';
    const isOverCanvas = overId === 'canvas';
  
    const isDraggingTool = active.id.startsWith('tool-');
    const isDraggingElement = active.data.current?.type === 'element';
  
    if ((isDraggingTool || isDraggingElement) && (isOverRow || isOverCanvas)) {
      if (isOverRow) {
        const overRowRect = over.rect;
        const hoverMiddleY = overRowRect.top + overRowRect.height / 2;
        const isHoveringTopHalf = event.clientY < hoverMiddleY;
        setActiveIndicator({ rowId: overId, position: isHoveringTopHalf ? 'top' : 'bottom' });
      } else if (isOverCanvas && rows.length > 0) {
        setActiveIndicator({ rowId: rows[rows.length - 1].id, position: 'bottom' });
      } else {
        setActiveIndicator(null);
      }
    } else {
      setActiveIndicator(null);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveIndicator(null);
    setActiveDragElement(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId && !activeIndicator) return;

    const isTool = active.id.startsWith('tool-');
    
    if (isTool) {
        const type = active.id.replace('tool-', '');
        const newElement = createNewElement(type);
        const newRow = { id: `row-${nanoid()}`, elements: [newElement] };

        if (activeIndicator) {
            const overIndex = rows.findIndex(r => r.id === activeIndicator.rowId);
            const insertIndex = activeIndicator.position === 'top' ? overIndex : overIndex + 1;
            setRows(rows => [...rows.slice(0, insertIndex), newRow, ...rows.slice(insertIndex)]);
        } else if (over.id === 'canvas') {
            setRows(rows => [...rows, newRow]);
        } else {
            const overIsRow = over.data.current?.type === 'row';
            if(overIsRow) {
                setRows(rows => rows.map(r => r.id === overId ? { ...r, elements: [...r.elements, newElement] } : r));
            } else {
                const { row: overRow } = findElementRecursive(overId);
                if (overRow) {
                    setRows(rows => rows.map(r => r.id === overRow.id ? { ...r, elements: [...r.elements, newElement] } : r));
                }
            }
        }
        return;
    }

    const { row: activeRow, element: activeElement } = findElementRecursive(activeId);
    if (!activeElement) return;

    if (activeIndicator) {
        setRows(rows => {
            const newRows = rows.map(r => ({ ...r, elements: r.elements.filter(el => el.id !== activeId) }));
            const overIndex = newRows.findIndex(r => r.id === activeIndicator.rowId);
            const insertIndex = activeIndicator.position === 'top' ? overIndex : overIndex + 1;
            const newRow = { id: `row-${nanoid()}`, elements: [activeElement] };
            return [...newRows.slice(0, insertIndex), newRow, ...newRows.slice(insertIndex)].filter(r => r.elements.length > 0);
        });
        return;
    }

    const overIsRow = over.data.current?.type === 'row';
    const overIsElement = over.data.current?.type === 'element';
    
    if (overIsRow) {
        setRows(rows => {
            const newRows = rows.map(r => ({ ...r, elements: r.elements.filter(el => el.id !== activeId) }));
            const overRowIndex = newRows.findIndex(r => r.id === overId);
            newRows[overRowIndex].elements.push(activeElement);
            return newRows.filter(r => r.elements.length > 0);
        });
    } else if (overIsElement) {
        const { row: overRow } = findElementRecursive(overId);
        if (activeRow.id === overRow.id) {
            setRows(rows => rows.map(row => {
              if (row.id === activeRow.id) {
                const oldIndex = row.elements.findIndex(el => el.id === activeId);
                const newIndex = row.elements.findIndex(el => el.id === overId);
                return { ...row, elements: arrayMove(row.elements, oldIndex, newIndex) };
              }
              return row;
            }));
        } else {
            setRows(rows => {
                const newRows = rows.map(r => ({ ...r, elements: r.elements.filter(el => el.id !== activeId) }));
                const overRowIndex = newRows.findIndex(r => r.id === overRow.id);
                const overElementIndex = newRows[overRowIndex].elements.findIndex(el => el.id === overId);
                newRows[overRowIndex].elements.splice(overElementIndex, 0, activeElement);
                return newRows.filter(r => r.elements.length > 0);
            });
        }
    }
  };

  const handleSelectElement = (element) => {
    setSelectedElement(element);
  };

  const updateElementProperties = (elementId, newProperties) => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        elements: row.elements.map((element) =>
          element.id === elementId ? { ...element, ...newProperties } : element
        ),
      }))
    );
    setSelectedElement((prevSelected) =>
      prevSelected?.id === elementId ? { ...prevSelected, ...newProperties } : prevSelected
    );
  };

  const deleteElement = (elementId) => {
    setRows((prevRows) =>
      prevRows
        .map((row) => ({
          ...row,
          elements: row.elements.filter((element) => element.id !== elementId),
        }))
        .filter((row) => row.elements.length > 0)
    );
    setSelectedElement(null);
  };
  
  return (
    <div className="form-builder-layout">
      <Header onSave={handleSave} onPreview={handlePreview} onClear={handleClear} />
      <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} collisionDetection={closestCenter} sensors={sensors}>
        <div className="app-container">
          <FormToolsPanel onAddElement={addElement} />
          <Canvas
            rows={rows}
            onSelectElement={handleSelectElement}
            selectedElement={selectedElement}
            activeIndicator={activeIndicator}
            onUpdate={updateElementProperties}
          />
          <PropertiesPanel
            element={selectedElement}
            onUpdate={updateElementProperties}
            onDelete={deleteElement}
          />
        </div>
        <DragOverlay>
          {activeDragElement ? (
            activeDragElement.isTool ? (
              <ToolboxItem id={activeDragElement.type} name={activeDragElement.name} />
            ) : (
              <FormElementRenderer element={activeDragElement} />
            )
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default FormBuilder;
