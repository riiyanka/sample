




import React from 'react';
import { useDraggable } from '@dnd-kit/core';

function ToolboxItem({ id, name, onAddElement }) { // Receive handler
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
  });

  return (
    <div 
      className="toolbox-item" 
      ref={setNodeRef} 
      {...listeners} 
      {...attributes}
      onClick={onAddElement} // Add the onClick handler here
    >
      {name}
    </div>
  );
}

export default ToolboxItem;