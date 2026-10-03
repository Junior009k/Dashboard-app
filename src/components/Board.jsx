import { useRef } from "react";
import { useAuth } from "../auth/AuthContext";
import useBoard from "../hooks/useBoard";
import { BOARD_ITEM_TYPES } from "../util/boardItemTypes";

import Toolbar from "./Toolbar";
import Note from "./Note";
import ImageCard from "./ImageCard";
import BoardItem from "./BoardItem";
import useBoardPermissions from "../hooks/useBoardPermissions";
import ShareBoard from "./ShareBoard";
import "./Board.css";

function Board({ board,token }) {
  const boardRef = useRef(null);
  const { user } = useAuth();

  
  const { permissions } = useBoardPermissions(board?.id,token  );
  console.log( "Permisos:", permissions);
  const {
    items,
    selectedItemId,
    addNote,
    addImage,
    deleteItem,
    updateItem,
    updatePosition,
    updateSize,
    selectItem,
    persistItem
  } = useBoard(board?.id,token);

  if (!board) {
    return null;
  }

  
  const isOwner = board.ownerId === user?.id;
  const canEdit = board.role === "Owner" || board.role === "Editor";
  function handleBoardClick(event) {
    if (event.target === event.currentTarget) {
      selectItem(null);
    }
  }

  function renderItem(item) {
    switch (item.type) {
      case BOARD_ITEM_TYPES.NOTE:
        return (
          <Note
            item={item}
            deleteItem={deleteItem}
            updateItem={updateItem}
            canEdit={canEdit}
          />
        );

      case BOARD_ITEM_TYPES.IMAGE:
        return (
          <ImageCard
            item={item}
            deleteItem={deleteItem}
            updateItem={updateItem}
            canEdit={canEdit}
          />
        );

      default:
        return null;
    }
  }

  return (
    <section className="board">
      {canEdit && ( <Toolbar addNote={addNote} addImage={addImage}/>)}

      <h2>{board.name}</h2>

      {isOwner && ( <ShareBoard  boardId={board.id} token={token} /> )}
      <div
        ref={boardRef}
        onClick={handleBoardClick}
        className="board__canvas"
      >
        {items.map((item) => (
          <BoardItem
            key={item.id}
            item={item}
            updatePosition={updatePosition}
            updateSize={updateSize}
            persistItem={persistItem}
            selected={item.id === selectedItemId}
            selectItem={selectItem}
            boardRef={boardRef}
            canEdit={canEdit}
          >
            {renderItem(item)}
          </BoardItem>
        ))}
      </div>
    </section>
  );
}

export default Board;