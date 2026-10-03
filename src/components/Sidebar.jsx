import BoardCard from "./BoardCard";
import "./Sidebar.css";

function Sidebar({
  boards,
  onSelectBoard,
  selectedBoardId,
  onCreateBoard
}) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">
        Mis tableros
      </h2>

      {boards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          onSelect={onSelectBoard}
          selected={board.id === selectedBoardId}
        />
      ))}
      <button
        className="sidebar__add-button"
        onClick={onCreateBoard}
      >
        + Nuevo tablero
      </button>
    </aside>
  );
}

export default Sidebar;

/*
	
Response body
Download
{
{
  "email": "bufalo@example.com",
  "password": "123456"
}
  "id": "15b49785-0160-401c-e81e-08df1ceafe89",
  "email": "bufalo@example.com"
}


*/