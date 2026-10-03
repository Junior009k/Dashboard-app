import { useState } from "react";

import { useAuth } from "./AuthContext";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      await login(
        email,
        password
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="login">
      <form
        className="login__form"
        onSubmit={handleSubmit}
      >
        <h1 className="login__title">
          Iniciar sesión
        </h1>

        <label className="login__label">
          Correo electrónico

          <input
            className="login__input"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="correo@ejemplo.com"
            required
          />
        </label>

        <label className="login__label">
          Contraseña

          <input
            className="login__input"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="••••••••"
            required
          />
        </label>

        <button
          className="login__button"
          type="submit"
        >
          Iniciar sesión
        </button>
      </form>
    </main>
  );
}

export default Login;