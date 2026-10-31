
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    description: "Phones, laptops and gadgets",
    icon: "💻",
    color: "category-blue",
  },
  {
    name: "Fashion",
    description: "Clothing, shoes and bags",
    icon: "👟",
    color: "category-pink",
  },
  {
    name: "Home & Living",
    description: "Furniture and home decor",
    icon: "🛋️",
    color: "category-orange",
  },
  {
    name: "Accessories",
    description: "Watches, wallets and more",
    icon: "⌚",
    color: "category-green",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    icon: "🎧",
    rating: "4.8",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2999,
    icon: "⌚",
    rating: "4.7",
  },
  {
    id: 3,
    name: "Casual Sneakers",
    price: 2499,
    icon: "👟",
    rating: "4.6",
  },
  {
    id: 4,
    name: "Travel Backpack",
    price: 1499,
    icon: "🎒",
    rating: "4.5",
  },
];

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">
            SHOP SMART · LIVE BETTER
          </span>

          <h1>
            Everything You Love,
            <br />
            <span>All in One Place</span>
          </h1>

          <p>
            Discover amazing products at prices you'll love.
            Your next favorite find is just a click away!
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="home-primary-btn">
              🛒 Shop Now
            </Link>

            <a href="#categories" className="home-secondary-btn">
              Explore Categories →
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle"></div>
          <span className="hero-emoji hero-emoji-one">🎧</span>
          <span className="hero-emoji hero-emoji-two">⌚</span>
          <span className="hero-emoji hero-emoji-three">🎒</span>
          <span className="hero-emoji hero-emoji-four">👟</span>
          <div className="hero-shopping-bag">
            <span>🛍️</span>
            <strong>ShopEase</strong>
            <small>Happy Shopping!</small>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <div className="benefit-item">
          <span className="benefit-icon">🚚</span>
          <div>
            <h3>Fast Delivery</h3>
            <p>Quick delivery to your doorstep</p>
          </div>
        </div>

        <div className="benefit-item">
          <span className="benefit-icon">🔒</span>
          <div>
            <h3>Secure Shopping</h3>
            <p>Your shopping experience matters</p>
          </div>
        </div>

        <div className="benefit-item">
          <span className="benefit-icon">↩️</span>
          <div>
            <h3>Easy Returns</h3>
            <p>Simple and hassle-free support</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="home-section" id="categories">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">FIND YOUR FAVORITES</span>
            <h2>Shop by Category</h2>
          </div>

          <Link to="/products" className="view-all-link">
            View All →
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to="/products"
              className={`category-card ${category.color}`}
              key={category.name}
            >
              <span className="category-icon">{category.icon}</span>

              <div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>

              <span className="category-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">HANDPICKED FOR YOU</span>
            <h2>Featured Products</h2>
          </div>

          <Link to="/products" className="view-all-link">
            View All Products →
          </Link>
        </div>

        <div className="featured-grid">
          {featuredProducts.map((product) => (
            <article className="featured-card" key={product.id}>
              <Link
                to={`/products/${product.id}`}
                className="featured-image"
                aria-label={`View ${product.name}`}
              >
                <span>{product.icon}</span>
              </Link>

              <div className="featured-info">
                <h3>{product.name}</h3>

                <p className="product-rating">
                  ⭐ {product.rating}
                  <span> Customer rating</span>
                </p>

                <p className="featured-price">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>

                <Link
                  to="/products"
                  className="featured-button"
                >
                  🛒 Shop Product
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="promo-icon">🛍️</div>

        <div className="promo-content">
          <h2>Big savings. Better shopping.</h2>
          <p>
            Discover your favorites and find something special today.
          </p>
        </div>

        <Link to="/products" className="promo-button">
          Shop Now →
        </Link>
      </section>
    </div>
  );
}

export default Home;
