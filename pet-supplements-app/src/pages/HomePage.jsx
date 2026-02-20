import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";
import BottomNav from "../components/BottomNav";
import { categories, breedCategories, promotions, banners } from "../data/products";
import "./HomePage.css";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate("/listing");
  };

  return (
    <div className="home-page">
      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ── TOP BAR ─────────────────────────────────── */}
      <header className="home-header">
        <button className="home-header__burger" onClick={() => setMenuOpen(true)}>
          <span /><span /><span />
        </button>

        <div className="home-header__logo">
          <span className="home-header__logo-icon">🐾</span>
          <span className="home-header__logo-text">PawShop</span>
        </div>

        <button className="home-header__cart" onClick={() => navigate("/bag")}>
          <span>🛍️</span>
          <span className="home-header__cart-badge">2</span>
        </button>
      </header>

      {/* ── HERO / SEARCH VIEWPORT ───────────────────── */}
      <section className="home-hero">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">🌿 Natural & Vet Approved</p>
          <h1 className="home-hero__title">
            The Best for<br />Your Pet's Health
          </h1>
          <p className="home-hero__sub">Premium supplements your pet will love</p>

          <form className="home-search" onSubmit={handleSearch}>
            <span className="home-search__icon">🔍</span>
            <input
              className="home-search__input"
              type="text"
              placeholder="Search supplements, breeds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="home-search__clear"
                onClick={() => setSearchQuery("")}
              >✕</button>
            )}
          </form>

          <div className="home-hero__quick-tags">
            {["Omega-3", "Probiotics", "Joint Health", "Vitamins"].map((tag) => (
              <button
                key={tag}
                className="home-hero__tag"
                onClick={() => navigate("/listing")}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="home-hero__pet">
          <div className="home-hero__pet-circle">
            <span className="home-hero__pet-emoji">😸</span>
          </div>
          <div className="home-hero__pet-bubble">⭐ 4.9 Rating</div>
        </div>
      </section>

      {/* ── CATEGORIES (horizontal scroll) ────────────── */}
      <section className="home-section">
        <div className="home-section__header">
          <h2 className="home-section__title">Shop by Pet</h2>
          <button className="home-section__see-all" onClick={() => navigate("/listing")}>
            See All
          </button>
        </div>
        <div className="home-scroll-row">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="category-card"
              style={{ background: cat.color, "--accent": cat.accent }}
              onClick={() => navigate("/listing")}
            >
              <span className="category-card__emoji">{cat.emoji}</span>
              <span className="category-card__name">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── SEARCH BY BREED ───────────────────────────── */}
      <section className="home-section">
        <div className="home-section__header">
          <h2 className="home-section__title">Search by Breed</h2>
          <button className="home-section__see-all" onClick={() => navigate("/listing")}>
            All breeds
          </button>
        </div>
        <div className="home-scroll-row">
          {breedCategories.map((breed) => (
            <button
              key={breed.id}
              className="breed-card"
              style={{ background: breed.color }}
              onClick={() => navigate("/listing")}
            >
              <span className="breed-card__emoji">{breed.emoji}</span>
              <span className="breed-card__name">{breed.name}</span>
              <span className="breed-card__desc">{breed.description}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── PROMOTIONS (single row) ───────────────────── */}
      <section className="home-section">
        <div className="home-section__header">
          <h2 className="home-section__title">🔥 Hot Deals</h2>
          <button className="home-section__see-all" onClick={() => navigate("/listing")}>
            View all
          </button>
        </div>
        <div className="home-scroll-row">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="promo-card"
              style={{ background: promo.gradient }}
              onClick={() => navigate("/listing")}
            >
              <span className="promo-card__emoji">{promo.emoji}</span>
              <div style={{ color: promo.textColor }}>
                <p className="promo-card__title">{promo.title}</p>
                <p className="promo-card__subtitle">{promo.subtitle}</p>
                <p className="promo-card__desc">{promo.description}</p>
              </div>
              <span className="promo-card__arrow" style={{ color: promo.textColor }}>→</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCT SHORTCUT ─────────────────── */}
      <section className="home-section">
        <div className="home-section__header">
          <h2 className="home-section__title">⭐ Top Picks</h2>
          <button className="home-section__see-all" onClick={() => navigate("/listing")}>
            See all
          </button>
        </div>
        <div className="home-scroll-row">
          {[
            { id: 1, name: "OmegaPure Paste", emoji: "🐟", price: "€24.99", tag: "Skin & Coat", color: "#E3F2FD", badge: "Best Seller" },
            { id: 2, name: "ProBiotic+", emoji: "🌿", price: "€19.99", tag: "Gut Health", color: "#E8F5E9", badge: "New" },
            { id: 3, name: "Joint Flex", emoji: "💪", price: "€29.99", tag: "Senior Cats", color: "#FFF3E0", badge: "Sale" },
            { id: 4, name: "CalmPaws", emoji: "🧘", price: "€32.99", tag: "Anxiety Relief", color: "#F0FFF4", badge: null },
          ].map((p) => (
            <button
              key={p.id}
              className="mini-product-card"
              style={{ background: p.color }}
              onClick={() => navigate("/product/1")}
            >
              {p.badge && <span className="mini-product-card__badge">{p.badge}</span>}
              <span className="mini-product-card__emoji">{p.emoji}</span>
              <span className="mini-product-card__name">{p.name}</span>
              <span className="mini-product-card__tag">{p.tag}</span>
              <span className="mini-product-card__price">{p.price}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── MARKETING BANNERS ─────────────────────────── */}
      <section className="home-section">
        <h2 className="home-section__title home-section__title--pad">Our Happy Pet Family</h2>
        <div className="banners-column">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="banner-card"
              style={{ background: banner.bg }}
            >
              <div className="banner-card__content">
                <span className="banner-card__emoji-badge">{banner.emoji}</span>
                <h3 className="banner-card__headline">{banner.headline}</h3>
                <p className="banner-card__sub">{banner.sub}</p>
                <button
                  className="banner-card__cta"
                  onClick={() => navigate("/listing")}
                >
                  Shop Now →
                </button>
              </div>
              <div className="banner-card__illustration">
                <span className="banner-card__big-emoji">{banner.imgEmoji}</span>
                <div className="banner-card__ring" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUST BADGES ─────────────────────────────── */}
      <section className="home-trust">
        {[
          { icon: "🚚", label: "Free Delivery", sub: "Over €35" },
          { icon: "🔬", label: "Vet Approved", sub: "All products" },
          { icon: "↩️", label: "Easy Returns", sub: "30 days" },
          { icon: "🔒", label: "Secure Pay", sub: "SSL encrypted" },
        ].map((badge) => (
          <div key={badge.label} className="trust-badge">
            <span className="trust-badge__icon">{badge.icon}</span>
            <span className="trust-badge__label">{badge.label}</span>
            <span className="trust-badge__sub">{badge.sub}</span>
          </div>
        ))}
      </section>

      <div className="home-bottom-spacer" />
      <BottomNav />
    </div>
  );
}
