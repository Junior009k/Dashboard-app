import { useAuth } from "../auth/AuthContext";

import "./Header.css";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <h1 className="header__title">
        Mi Dashboard
      </h1>

      <div className="header__user">
        <span className="header__email">
          {user?.email}
        </span>

        <button
          className="header__logout"
          onClick={logout}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Header;