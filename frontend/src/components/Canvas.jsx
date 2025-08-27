import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import FormElementRenderer from './FormElementRenderer';
import { CSS } from '@dnd-kit/utilities';

function DropIndicator() {
    return <div className="drop-indicator">Drop here to create a new row</div>;
}

function Row({ row, onSelectElement, selectedElement, showTopIndicator, showBottomIndicator, onUpdate }) {
    const { setNodeRef: droppableNodeRef } = useDroppable({ 
        id: row.id,
        data: {
            type: 'row',
            row: row
        }
    });
    const {
        attributes,
        listeners,
        setNodeRef: sortableNodeRef,
        transform,
        transition,
    } = useSortable({ 
        id: row.id,
        data: {
            type: 'row',
            row: row
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <>
            {showTopIndicator && <DropIndicator />}
            <div ref={sortableNodeRef} style={style} {...attributes} {...listeners} className="form-row-wrapper">
                <div ref={droppableNodeRef} className="form-row">
                    <SortableContext items={row.elements.map(el => el.id)} strategy={horizontalListSortingStrategy}>
                        {row.elements.map(element => (
                            <FormElementRenderer
                                key={element.id}
                                element={element}
                                onSelectElement={onSelectElement}
                                isSelected={selectedElement?.id === element.id}
                                onUpdate={onUpdate}
                            />
                        ))}
                    </SortableContext>
                </div>
            </div>
            {showBottomIndicator && <DropIndicator />}
        </>
    );
}

function Canvas({ rows, onSelectElement, selectedElement, activeIndicator, onUpdate }) {
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  return (
    <div ref={setNodeRef} className="panel canvas" onClick={() => onSelectElement(null)}>
      {rows.length === 0 ? (
        <div className="canvas-placeholder-wrapper">
            <p className="canvas-placeholder">Drop elements here to build your form.</p>
        </div>
      ) : (
        <SortableContext items={rows.map(r => r.id)} strategy={verticalListSortingStrategy}>
          {rows.map((row) => (
            <Row
              key={row.id}
              row={row}
              onSelectElement={onSelectElement}
              selectedElement={selectedElement}
              showTopIndicator={activeIndicator?.rowId === row.id && activeIndicator?.position === 'top'}
              showBottomIndicator={activeIndicator?.rowId === row.id && activeIndicator?.position === 'bottom'}
              onUpdate={onUpdate}
            />
          ))}
        </SortableContext>
      )}
    </div>
  );
}

export default Canvas;
