import { useEffect, useState } from "react";

import "./ImageCard.css";

function ImageCard({
  item,
  deleteItem,
  updateItem,
  canEdit
}) {
  const [url, setUrl] = useState(item.data.url);

  useEffect(() => {
    setUrl(item.data.url);
  }, [item.data.url]);

  function handleSave() {
    updateItem(item.id, {
      url
    });
  }

  return (
    <article className="image-card">
      <h3 className="image-card__title">
        Imagen
      </h3>

      <div className="image-card__preview">
        <img
          src={item.data.url}
          alt="Imagen del tablero"
          className="image-card__image"
        />
      </div>

      <input
        className="image-card__url"
        value={url}
        onChange={(event) =>
          setUrl(event.target.value)
        }
        placeholder="URL de la imagen"
        readOnly={!canEdit}
      />

      {canEdit && (
        <div className="image-card__actions">
          <button onClick={handleSave}>
            Actualizar
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

export default ImageCard;