import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { featuredProduct, catSupplements } from "../data/products";
import "./ProductPage.css";

export default function ProductPage() {
  const navigate = useNavigate();
  const product = featuredProduct;
  const [selectedSize, setSelectedSize] = useState("100g");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const similarProducts = catSupplements.filter((p) => p.id !== 1);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="product-page">
      {/* ── HERO VIEWPORT ────────────────────────────── */}
      <section className="product-hero">
        {/* Top bar */}
        <div className="product-hero__topbar">
          <button className="product-hero__back" onClick={() => navigate(-1)}>
            ‹
          </button>
          <div className="product-hero__topbar-actions">
            <button
              className={`product-hero__fav ${isFavorite ? "product-hero__fav--active" : ""}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
            <button className="product-hero__share">🔗</button>
            <button className="product-hero__cart" onClick={() => navigate("/bag")}>
              🛍️
              <span className="product-hero__cart-badge">2</span>
            </button>
          </div>
        </div>

        {/* Product image area */}
        <div className="product-hero__image-area" style={{ background: product.color }}>
          <div className="product-hero__image-glow" />
          <span className="product-hero__main-emoji">{product.emoji}</span>
          {product.badge && (
            <span
              className="product-hero__badge"
              style={{ background: product.badgeColor }}
            >
              {product.badge}
            </span>
          )}
          <div className="product-hero__brand-chip">{product.brand}</div>
        </div>

        {/* Product info card */}
        <div className="product-info-card">
          <div className="product-info-card__header">
            <div>
              <p className="product-info-card__category">Cat Supplement · Paste</p>
              <h1 className="product-info-card__name">{product.name}</h1>
              <p className="product-info-card__subtitle">{product.subtitle}</p>
            </div>
          </div>

          {/* Rating row */}
          <div className="product-info-card__rating">
            <div className="product-info-card__stars">
              {"★".repeat(Math.floor(product.rating))}
              <span style={{ opacity: 0.3 }}>{"★".repeat(5 - Math.floor(product.rating))}</span>
            </div>
            <span className="product-info-card__rating-num">{product.rating}</span>
            <span className="product-info-card__reviews">({product.reviews} reviews)</span>
            <a href="#reviews" className="product-info-card__reviews-link">See all</a>
          </div>

          {/* Tags */}
          <div className="product-info-card__tags">
            {product.tags.map((tag) => (
              <span key={tag} className="product-info-card__tag">{tag}</span>
            ))}
          </div>

          {/* Size selector */}
          <div className="product-info-card__sizes">
            <p className="product-info-card__label">Size</p>
            <div className="product-info-card__size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "size-btn--active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Price */}
          <div className="product-info-card__purchase">
            <div className="product-info-card__quantity">
              <button
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >−</button>
              <span className="qty-value">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >+</button>
            </div>
            <div className="product-info-card__price-area">
              {product.originalPrice && (
                <span className="product-info-card__original">
                  €{(product.originalPrice * quantity).toFixed(2)}
                </span>
              )}
              <span className="product-info-card__price">
                €{(product.price * quantity).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Add to basket button */}
          <button
            className={`add-to-basket-btn ${addedToCart ? "add-to-basket-btn--added" : ""}`}
            onClick={handleAddToCart}
          >
            {addedToCart ? (
              <>✓ Added to Basket!</>
            ) : (
              <>🛍️ Add to Basket · €{(product.price * quantity).toFixed(2)}</>
            )}
          </button>

          {/* Delivery info */}
          <div className="product-info-card__delivery">
            <span>🚚 Free delivery over €35</span>
            <span>↩️ 30-day returns</span>
          </div>
        </div>
      </section>

      {/* ── PRODUCT DETAILS TABS ──────────────────────── */}
      <section className="product-details-section">
        <div className="product-tabs">
          {["details", "ingredients", "howto", "reviews"].map((tab) => (
            <button
              key={tab}
              className={`product-tab ${activeTab === tab ? "product-tab--active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {{
                details: "Details",
                ingredients: "Ingredients",
                howto: "How to Use",
                reviews: "Reviews",
              }[tab]}
            </button>
          ))}
        </div>

        <div className="product-tab-content">
          {activeTab === "details" && (
            <div>
              <p className="product-tab-content__text">{product.description}</p>

              <h4 className="product-tab-content__heading">Key Benefits</h4>
              <div className="product-benefits">
                {product.keyBenefits.map((b, i) => (
                  <div key={i} className="benefit-item">
                    <span className="benefit-item__emoji">{b.emoji}</span>
                    <span className="benefit-item__text">{b.text}</span>
                  </div>
                ))}
              </div>

              <h4 className="product-tab-content__heading">Suitable For</h4>
              <div className="suitable-for-tags">
                {product.suitableFor.map((s) => (
                  <span key={s} className="suitable-tag">🐾 {s}</span>
                ))}
              </div>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div>
              <h4 className="product-tab-content__heading">Ingredients</h4>
              <p className="product-tab-content__text">{product.ingredients}</p>
              <div className="ingredient-quality">
                {[
                  { icon: "🌿", label: "Natural" },
                  { icon: "🔬", label: "Lab Tested" },
                  { icon: "🚫", label: "No Additives" },
                  { icon: "✅", label: "Vet Approved" },
                ].map((q) => (
                  <div key={q.label} className="quality-badge">
                    <span>{q.icon}</span>
                    <span>{q.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "howto" && (
            <div>
              <h4 className="product-tab-content__heading">How to Use</h4>
              <p className="product-tab-content__text">{product.howToUse}</p>
              <div className="howto-steps">
                {[
                  { step: "1", text: "Open the tube and remove cap" },
                  { step: "2", text: "Squeeze 1–2cm onto food or paw" },
                  { step: "3", text: "Let your cat lick it off" },
                  { step: "4", text: "Use daily for best results" },
                ].map((s) => (
                  <div key={s.step} className="howto-step">
                    <span className="howto-step__num">{s.step}</span>
                    <span className="howto-step__text">{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="reviews-summary">
                <div className="reviews-summary__score">
                  <span className="reviews-summary__big-num">{product.rating}</span>
                  <div className="reviews-summary__stars">
                    {"★".repeat(Math.floor(product.rating))}
                  </div>
                  <span className="reviews-summary__count">{product.reviews} reviews</span>
                </div>
              </div>
              {[
                { name: "Sarah M.", stars: 5, text: "My Persian loves this! Her coat is so shiny now. 100% recommend!", date: "2 days ago" },
                { name: "James K.", stars: 5, text: "Our Maine Coon was shedding a lot. After 2 weeks on this paste, massive improvement.", date: "1 week ago" },
                { name: "Lena T.", stars: 4, text: "Great product, just takes a while for cats to get used to the taste.", date: "2 weeks ago" },
              ].map((r, i) => (
                <div key={i} className="review-item">
                  <div className="review-item__header">
                    <div className="review-item__avatar">{r.name[0]}</div>
                    <div>
                      <p className="review-item__name">{r.name}</p>
                      <p className="review-item__stars">{"★".repeat(r.stars)}</p>
                    </div>
                    <span className="review-item__date">{r.date}</span>
                  </div>
                  <p className="review-item__text">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SIMILAR PRODUCTS (horizontal scroll) ─────── */}
      <section className="similar-section">
        <div className="similar-section__header">
          <h2 className="similar-section__title">Similar Products</h2>
          <button
            className="similar-section__see-all"
            onClick={() => navigate("/listing")}
          >
            See all
          </button>
        </div>

        <div className="similar-scroll">
          {similarProducts.map((p) => (
            <div
              key={p.id}
              className="similar-card"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <div className="similar-card__image" style={{ background: p.color }}>
                {p.badge && (
                  <span
                    className="similar-card__badge"
                    style={{ background: p.badgeColor }}
                  >
                    {p.badge}
                  </span>
                )}
                <span className="similar-card__emoji">{p.emoji}</span>
              </div>
              <div className="similar-card__info">
                <p className="similar-card__brand">{p.brand}</p>
                <p className="similar-card__name">{p.name}</p>
                <div className="similar-card__rating">
                  <span>⭐</span>
                  <span>{p.rating}</span>
                </div>
                <div className="similar-card__price-row">
                  <span className="similar-card__price">€{p.price.toFixed(2)}</span>
                  <button
                    className="similar-card__add"
                    onClick={(e) => e.stopPropagation()}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="product-bottom-spacer" />
      <BottomNav />
    </div>
  );
}
