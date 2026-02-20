import { useNavigate, useLocation } from "react-router-dom";
import "./BottomNav.css";

const navItems = [
  { path: "/", icon: "🏠", label: "Home" },
  { path: "/listing", icon: "🔍", label: "Search" },
  { path: "/favorites", icon: "❤️", label: "Favorites" },
  { path: "/bag", icon: "🛍️", label: "Bag", badge: 2 },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            className={`bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <span className="bottom-nav__icon-wrap">
              <span className="bottom-nav__icon">{item.icon}</span>
              {item.badge && <span className="bottom-nav__badge">{item.badge}</span>}
            </span>
            <span className="bottom-nav__label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
