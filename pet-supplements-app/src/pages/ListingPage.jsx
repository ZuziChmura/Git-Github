import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { catSupplements } from "../data/products";
import "./ListingPage.css";

const breedFilters = ["All Breeds", "Persian", "Maine Coon", "Siamese", "British Shorthair", "Ragdoll", "Bengal", "Mixed"];
const weightFilters = ["Any Weight", "< 2 kg", "2–4 kg", "4–6 kg", "6–8 kg", "> 8 kg"];
const sortOptions = ["Popular", "Price: Low–High", "Price: High–Low", "Top Rated", "Newest"];
const tagFilters = ["All", "Omega-3", "Probiotics", "Joint Health", "Vitamins", "Calming", "Immunity", "Skin & Coat"];

export default function ListingPage() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState("All Breeds");
  const [selectedWeight, setSelectedWeight] = useState("Any Weight");
  const [selectedSort, setSelectedSort] = useState("Popular");
  const [selectedTag, setSelectedTag] = useState("All");
  const [favorites, setFavorites] = useState(
    catSupplements.reduce((acc, p) => ({ ...acc, [p.id]: p.isFavorite }), {})
  );
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = catSupplements.filter((p) => {
    const matchesTag = selectedTag === "All" || p.tags.some((t) => t.includes(selectedTag));
    const matchesSearch = searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === "Price: Low–High") return a.price - b.price;
    if (selectedSort === "Price: High–Low") return b.price - a.price;
    if (selectedSort === "Top Rated") return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  return (
    <div className="listing-page">
      {/* ── HEADER ─────────────────────────────────── */}
      <header className="listing-header">
        <button className="listing-header__back" onClick={() => navigate("/")}>
          ‹
        </button>
        <div className="listing-header__title-wrap">
          <h1 className="listing-header__title">Cat Supplements</h1>
          <p className="listing-header__count">{sortedProducts.length} products</p>
        </div>
        <button
          className={`listing-header__filter-btn ${showFilters ? "listing-header__filter-btn--active" : ""}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>⚙️</span>
          {showFilters ? "Hide" : "Filter"}
        </button>
      </header>

      {/* ── SEARCH BAR ─────────────────────────────── */}
      <div className="listing-search-wrap">
        <span className="listing-search__icon">🔍</span>
        <input
          className="listing-search__input"
          type="text"
          placeholder="Search cat supplements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="listing-search__clear" onClick={() => setSearchQuery("")}>✕</button>
        )}
      </div>

      {/* ── TAG SCROLL (quick filter) ───────────────── */}
      <div className="listing-tags-row">
        {tagFilters.map((tag) => (
          <button
            key={tag}
            className={`listing-tag ${selectedTag === tag ? "listing-tag--active" : ""}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* ── FILTER PANEL ───────────────────────────── */}
      {showFilters && (
        <div className="filter-panel">
          <div className="filter-panel__section">
            <h3 className="filter-panel__section-title">
              <span>🐱</span> Filter by Breed
            </h3>
            <div className="filter-panel__chips">
              {breedFilters.map((b) => (
                <button
                  key={b}
                  className={`filter-chip ${selectedBreed === b ? "filter-chip--active" : ""}`}
                  onClick={() => setSelectedBreed(b)}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-panel__section">
            <h3 className="filter-panel__section-title">
              <span>⚖️</span> Filter by Pet Weight
            </h3>
            <div className="filter-panel__chips">
              {weightFilters.map((w) => (
                <button
                  key={w}
                  className={`filter-chip ${selectedWeight === w ? "filter-chip--active" : ""}`}
                  onClick={() => setSelectedWeight(w)}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-panel__section">
            <h3 className="filter-panel__section-title">
              <span>↕️</span> Sort by
            </h3>
            <div className="filter-panel__chips">
              {sortOptions.map((s) => (
                <button
                  key={s}
                  className={`filter-chip ${selectedSort === s ? "filter-chip--active" : ""}`}
                  onClick={() => setSelectedSort(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-panel__actions">
            <button
              className="filter-panel__reset"
              onClick={() => {
                setSelectedBreed("All Breeds");
                setSelectedWeight("Any Weight");
                setSelectedSort("Popular");
                setSelectedTag("All");
              }}
            >
              Reset All
            </button>
            <button
              className="filter-panel__apply"
              onClick={() => setShowFilters(false)}
            >
              Show {sortedProducts.length} Results
            </button>
          </div>
        </div>
      )}

      {/* ── ACTIVE FILTERS SUMMARY ─────────────────── */}
      {(selectedBreed !== "All Breeds" || selectedWeight !== "Any Weight") && (
        <div className="listing-active-filters">
          <span className="listing-active-filters__label">Active:</span>
          {selectedBreed !== "All Breeds" && (
            <span className="listing-active-filter-tag">
              {selectedBreed}
              <button onClick={() => setSelectedBreed("All Breeds")}>✕</button>
            </span>
          )}
          {selectedWeight !== "Any Weight" && (
            <span className="listing-active-filter-tag">
              {selectedWeight}
              <button onClick={() => setSelectedWeight("Any Weight")}>✕</button>
            </span>
          )}
        </div>
      )}

      {/* ── SORT BAR ───────────────────────────────── */}
      <div className="listing-sort-bar">
        <span className="listing-sort-bar__label">Sorted by:</span>
        <div className="listing-sort-bar__options">
          {sortOptions.slice(0, 3).map((s) => (
            <button
              key={s}
              className={`listing-sort-btn ${selectedSort === s ? "listing-sort-btn--active" : ""}`}
              onClick={() => setSelectedSort(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── PRODUCT GRID ───────────────────────────── */}
      <div className="product-grid">
        {sortedProducts.length === 0 ? (
          <div className="product-grid__empty">
            <span>🔍</span>
            <p>No products found</p>
            <button onClick={() => { setSearchQuery(""); setSelectedTag("All"); }}>
              Clear filters
            </button>
          </div>
        ) : (
          sortedProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="product-card__image" style={{ background: product.color }}>
                {product.badge && (
                  <span
                    className="product-card__badge"
                    style={{ background: product.badgeColor }}
                  >
                    {product.badge}
                  </span>
                )}
                <span className="product-card__emoji">{product.emoji}</span>
                <button
                  className={`product-card__fav ${favorites[product.id] ? "product-card__fav--active" : ""}`}
                  onClick={(e) => toggleFavorite(product.id, e)}
                >
                  {favorites[product.id] ? "❤️" : "🤍"}
                </button>
              </div>

              <div className="product-card__info">
                <p className="product-card__brand">{product.brand}</p>
                <h3 className="product-card__name">{product.name}</h3>

                <div className="product-card__tags">
                  {product.tags.map((tag) => (
                    <span key={tag} className="product-card__tag">{tag}</span>
                  ))}
                </div>

                <div className="product-card__rating">
                  <span className="product-card__stars">⭐</span>
                  <span className="product-card__rating-num">{product.rating}</span>
                  <span className="product-card__reviews">({product.reviews})</span>
                  <span className="product-card__weight">· {product.weight}</span>
                </div>

                <div className="product-card__price-row">
                  <div className="product-card__prices">
                    <span className="product-card__price">€{product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="product-card__original-price">
                        €{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button
                    className="product-card__add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="listing-bottom-spacer" />
      <BottomNav />
    </div>
  );
}
