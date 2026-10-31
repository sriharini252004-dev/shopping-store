
import { Link } from "react-router-dom";
import { useState } from "react";

function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const productId = product._id || product.id;

  const image =
    product.image ||
    product.imageUrl ||
    "https://placehold.co/400x300/eaf2ff/2563eb?text=ShopEase";

  function handleAddToCart() {
    onAddToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <article className="shop-product-card">
      <Link
        to={`/products/${productId}`}
        className="shop-product-image"
      >
        <img
          src={image}
          alt={product.name || "ShopEase product"}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src =
              "https://placehold.co/400x300/eaf2ff/2563eb?text=ShopEase";
          }}
        />

        <span className="shop-product-badge">Featured</span>
      </Link>

      <div className="shop-product-info">
        <span className="shop-product-category">
          {product.category || "General"}
        </span>

        <Link
          to={`/products/${productId}`}
          className="shop-product-title"
        >
          {product.name || "Product"}
        </Link>

        <p className="shop-product-description">
          {product.description || "Discover quality with ShopEase."}
        </p>

        <div className="shop-product-rating">
          <span>⭐</span>
          <strong>{product.rating || "4.5"}</strong>
          <span className="rating-text">Customer rating</span>
        </div>

        <div className="shop-product-bottom">
          <strong className="shop-product-price">
            ₹{Number(product.price || 0).toLocaleString("en-IN")}
          </strong>

          {product.stock !== undefined && (
            <span
              className={
                product.stock > 0
                  ? "shop-stock-available"
                  : "shop-stock-empty"
              }
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          )}
        </div>

        <button
          type="button"
          className="shop-add-cart-button"
          onClick={handleAddToCart}
          disabled={product.stock !== undefined && product.stock <= 0}
        >
          {product.stock !== undefined && product.stock <= 0
            ? "Out of Stock"
            : added
              ? "✓ Added to Cart"
              : "🛒 Add to Cart"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
