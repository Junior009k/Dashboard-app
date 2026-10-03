import "./BoardCard.css";

function BoardCard({ board, onSelect, selected }) {
  return (
    <div
      className={`board-card ${
        selected ? "board-card--selected" : ""
      }`}
      onClick={() => onSelect(board.id)}
    >
      <p className="board-card__name">
        {board.name}
      </p>
    </div>
  );
}

export default BoardCard;