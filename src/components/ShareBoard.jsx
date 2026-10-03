import { useState } from "react";

import useBoardPermissions
  from "../hooks/useBoardPermissions";

import {
  addBoardPermission
} from "../services/boardPermissionService";

import "./ShareBoard.css";

function ShareBoard({ boardId, token}) {
  const {  permissions} = useBoardPermissions(boardId,token);
   const [email, setEmail] = useState("");

  const [role, setRole] =
    useState("Viewer");

  const [error, setError] =
    useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError(
        "Debes introducir un correo"
      );

      return;
    }

    try {
      await addBoardPermission(
        boardId,
        {
          email,
          role
        },
        token
      );

      setEmail("");
    } catch (error) {
      console.error(error);

      setError(
        "No se pudo compartir el tablero."
      );
    }
  }

  return (
    <section className="share-board">
      <h3 className="share-board__title">
        Compartir tablero
      </h3>

      <form
        className="share-board__form"
        onSubmit={handleSubmit}
      >
        <label>
        Correo electrónico

        <input
            type="email"
            value={email}
            onChange={(event) =>
            setEmail(event.target.value)
            }
            placeholder="usuario@ejemplo.com"
        />
        </label>

        <label>
          Rol

          <select
            value={role}
            onChange={(event) =>
              setRole(event.target.value)
            }
          >
            <option value="Viewer">
              Viewer
            </option>

            <option value="Editor">
              Editor
            </option>
          </select>
        </label>

        <button type="submit">
          Compartir
        </button>
      </form>

      {error && (
        <p className="share-board__error">
          {error}
        </p>
      )}

      <h3 className="share-board__title">
        Personas con acceso
      </h3>

      {permissions.length === 0 ? (
        <p>
          Nadie más tiene acceso a este tablero.
        </p>
      ) : (
        <ul className="share-board__list">
          {permissions.map((permission) => (
            <li
              key={permission.id}
              className="share-board__item"
            >
              <span>
                {permission.email}
              </span>

              <span>
                {permission.role}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ShareBoard;