import { useLocation, useNavigate } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const showLogout = pathname !== "/"; // hide only on login

  return (
    <div className="layout-container">
      <header className="layout-header">
        <h3 className="header-title">Bayer Healthcare</h3>

        {/* Only show logout button when not on login page */}
        {showLogout && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>

      <main className="layout-main">{children}</main>

      <footer className="layout-footer">
        &copy; {new Date().getFullYear()} Bayer Healthcare. All rights reserved.
      </footer>
    </div>
  );
}
