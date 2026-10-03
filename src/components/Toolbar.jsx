import "./Toolbar.css";

function Toolbar({ addNote, addImage }) {
  return (
    <nav className="toolbar">
      <button
        className="toolbar__button"
        onClick={addNote}
      >
        + Nota
      </button>

      <button
        className="toolbar__button"
        onClick={addImage}
      >
        + Imagen
      </button>
    </nav>
  );
}

export default Toolbar;