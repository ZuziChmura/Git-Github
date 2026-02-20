import { useNavigate } from "react-router-dom";
import "./HamburgerMenu.css";

const menuItems = [
  { icon: "🏠", label: "Home", path: "/" },
  { icon: "🐾", label: "All Products", path: "/listing" },
  { icon: "🐱", label: "Cat Supplements", path: "/listing" },
  { icon: "🐶", label: "Dog Supplements", path: "/listing" },
  { icon: "🛍️", label: "Promotions & Sales", path: "/" },
  { icon: "❤️", label: "My Favorites", path: "/favorites" },
  { icon: "📦", label: "My Orders", path: "/" },
  { icon: "👤", label: "My Account", path: "/" },
  { icon: "📞", label: "Contact & Support", path: "/" },
  { icon: "ℹ️", label: "About PawShop", path: "/" },
];

export default function HamburgerMenu({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <div
        className={`menu-overlay ${isOpen ? "menu-overlay--visible" : ""}`}
        onClick={onClose}
      />
      <aside className={`hamburger-menu ${isOpen ? "hamburger-menu--open" : ""}`}>
        <div className="hamburger-menu__header">
          <div className="hamburger-menu__avatar">🐾</div>
          <div className="hamburger-menu__user-info">
            <p className="hamburger-menu__greeting">Hello, Pet Lover!</p>
            <p className="hamburger-menu__tagline">Sign in to your account</p>
          </div>
          <button className="hamburger-menu__close" onClick={onClose}>✕</button>
        </div>

        <div className="hamburger-menu__promo">
          <span className="hamburger-menu__promo-badge">🎁 40% OFF Today</span>
          <p>Use code: <strong>PAWS40</strong></p>
        </div>

        <nav className="hamburger-menu__nav">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className="hamburger-menu__nav-item"
              onClick={() => handleNavigate(item.path)}
            >
              <span className="hamburger-menu__nav-icon">{item.icon}</span>
              <span className="hamburger-menu__nav-label">{item.label}</span>
              <span className="hamburger-menu__nav-arrow">›</span>
            </button>
          ))}
        </nav>

        <div className="hamburger-menu__footer">
          <p>PawShop Premium 🐾</p>
          <p className="hamburger-menu__version">v2.4.1</p>
        </div>
      </aside>
    </>
  );
}
