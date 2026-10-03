import { useRef, useState } from "react";

import "./BoardItem.css";

function BoardItem({
  item,
  updatePosition,
  updateSize,
  selected,
  selectItem,
  boardRef,
  children,
  persistItem,
  canEdit
}) {
  const [isDragging, setIsDragging] = useState(false);
  const latestItemRef = useRef(item);
  function handleMouseDown(event) {
    if (!canEdit) {
      selectItem(item.id);
      return;
    }
    const element = event.target;
    latestItemRef.current = item;
    if (
      element.tagName === "TEXTAREA" ||
      element.tagName === "INPUT" ||
      element.tagName === "BUTTON"
    ) {
      return;
    }

    selectItem(item.id);

    setIsDragging(true);

    const startMouseX = event.clientX;
    const startMouseY = event.clientY;

    const startItemX = item.position.x;
    const startItemY = item.position.y;

    function handleMouseMove(moveEvent) {
      const deltaX =
        moveEvent.clientX - startMouseX;

      const deltaY =
        moveEvent.clientY - startMouseY;

      const board = boardRef.current;

      if (!board) {
        return;
      }

      const maxX = Math.max(
        0,
        board.clientWidth - item.size.width
      );

      const maxY = Math.max(
        0,
        board.clientHeight - item.size.height
      );

      const newX = Math.max(
        0,
        Math.min(startItemX + deltaX, maxX)
      );

      const newY = Math.max(
        0,
        Math.min(startItemY + deltaY, maxY)
      );

      const updatedItem = updatePosition(
        item.id,
        {
          x: newX,
          y: newY
        }
      );
      
      if (updatedItem) {
        latestItemRef.current = updatedItem;
      }
    }

    function handleMouseUp() {
      setIsDragging(false);
    
      persistItem(latestItemRef.current);
    
      document.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    
      document.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    }

    document.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "mouseup",
      handleMouseUp
    );
  }

  function handleResizeMouseDown(event) {
    latestItemRef.current = item;
    event.stopPropagation();

    const startMouseX = event.clientX;
    const startMouseY = event.clientY;

    const startWidth = item.size.width;
    const startHeight = item.size.height;

    function handleMouseMove(moveEvent) {
      const deltaX =
        moveEvent.clientX - startMouseX;

      const deltaY =
        moveEvent.clientY - startMouseY;

      const board = boardRef.current;

      if (!board) {
        return;
      }

      const maxWidth = Math.max(
        150,
        board.clientWidth - item.position.x
      );

      const maxHeight = Math.max(
        100,
        board.clientHeight - item.position.y
      );

      const newWidth = Math.min(
        maxWidth,
        Math.max(150, startWidth + deltaX)
      );

      const newHeight = Math.min(
        maxHeight,
        Math.max(100, startHeight + deltaY)
      );

      const updatedItem = updateSize(
        item.id,
        {
          width: newWidth,
          height: newHeight
        }
      );
      
      if (updatedItem) {
        latestItemRef.current = updatedItem;
      }
    }

    function handleMouseUp() {
      persistItem(latestItemRef.current);
    
      document.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    
      document.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    }

    document.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "mouseup",
      handleMouseUp
    );
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      className={`board-item ${
        selected ? "board-item--selected" : ""
      }`}
      style={{
        left: `${item.position.x}px`,
        top: `${item.position.y}px`,
        width: `${item.size.width}px`,
        height: `${item.size.height}px`,
        cursor: isDragging ? "grabbing" : "grab"
      }}
    >
      {children}

      {selected && canEdit && (
        <div
          onMouseDown={handleResizeMouseDown}
          className="board-item__resize-handle"
        />
      )}
    </div>
  );
}

export default BoardItem;