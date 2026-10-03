import { useEffect, useState } from "react";

import "./Note.css";

function Note({ item, deleteItem, updateItem, canEdit }) {
  const [content, setContent] = useState(
    item.data.content
  );

  useEffect(() => {
    setContent(item.data.content);
  }, [item.data.content]);

  function handleChange(event) {
    setContent(event.target.value);
  }

  function handleSave() {
    updateItem(item.id, {
      content
    });
  }

  return (
    <article className="note">
      <h3 className="note__title">
        Nota
      </h3>

      <textarea
        className="note__textarea"
        value={content}
        onChange={handleChange}
        placeholder="Escribe tu nota..."
        readOnly={!canEdit}
      />

    {canEdit && (
      <div className="note__actions">
        <button onClick={handleSave}>
          Guardar
        </button>

        <button
          onClick={() =>
            deleteItem(item.id)
          }
        >
          Eliminar
        </button>
      </div>
    )}
    </article>
  );
}

export default Note;