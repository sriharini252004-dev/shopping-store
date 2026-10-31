import React, { useState } from "react";


function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("White");
  const [activeTab, setActiveTab] = useState("Description");

  const product = {
    name: "Premium Wireless Headphones",
    price: 2499,
    oldPrice: 3999,
    rating: 4.8,
    reviews: 125,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",
  };

  const addToCart = () => {
    alert(`${product.name} added to cart! Quantity: ${quantity}`);
  };

  const buyNow = () => {
    alert("Proceeding to checkout!");
  };

  return (
    <div className="product-details-page">

      {/* Product Section */}
      <div className="product-container">

        {/* Product Image */}
        <div className="product-image-section">
          <img
            src={product.image}
            alt={product.name}
            className="main-product-image"
          />
        </div>

        {/* Product Information */}
        <div className="product-info">

          <p className="breadcrumb">
            Home / Products / Electronics
          </p>

          <h1>{product.name}</h1>

          <div className="product-rating">
            <span className="stars">★★★★★</span>
            <span>{product.rating}</span>
            <span>({product.reviews} reviews)</span>
          </div>

          <div className="product-price">
            <span className="current-price">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            <span className="old-price">
              ₹{product.oldPrice.toLocaleString("en-IN")}
            </span>

            <span className="discount">38% OFF</span>
          </div>

          <p className="product-description">
            Experience crystal clear sound, all-day comfort
            and long battery life with our premium wireless
            headphones. Perfect for music, calls and more
            wherever you go.
          </p>

          {/* Color Selection */}
          <div className="color-section">
            <h3>Color</h3>

            <div className="color-options">
              <button
                className={`color-btn black ${
                  color === "Black" ? "selected" : ""
                }`}
                onClick={() => setColor("Black")}
                aria-label="Black"
              />

              <span>Black</span>

              <button
                className={`color-btn white ${
                  color === "White" ? "selected" : ""
                }`}
                onClick={() => setColor("White")}
                aria-label="White"
              />

              <span>White</span>
            </div>
            <p className="selected-color">
              Selected: {color}
            </p>
          </div>

          {/* Quantity */}
          <div className="quantity-section">
            <h3>Quantity</h3>

            <div className="quantity-box">
              <button
                onClick={() =>
                  setQuantity(Math.max(1, quantity - 1))
                }
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <span className="stock-status">
              ● In Stock
            </span>
          </div>

          {/* Buttons */}
          <div className="product-buttons">
            <button className="add-cart" onClick={addToCart}>
              🛒 Add to Cart
            </button>

            <button className="buy-now" onClick={buyNow}>
              Buy Now
            </button>
          </div>

        </div>
      </div>

      {/* Product Tabs */}
      <div className="product-tabs">

        <div className="tab-buttons">
          {["Description", "Specifications", "Reviews"].map(
            (tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active-tab" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>

        <div className="tab-content">

          {activeTab === "Description" && (
            <div>
              <h2>Product Description</h2>
              <p>
                The Premium Wireless Headphones deliver an
                immersive audio experience with deep bass,
                crisp highs and balanced sound. Designed for
                comfort, they feature soft ear cushions and
                an adjustable headband. With up to 30 hours
                of battery life, enjoy your favorite music
                and calls all day long.
              </p>
            </div>
          )}

          {activeTab === "Specifications" && (
            <div>
              <h2>Product Specifications</h2>
              <ul>
                <li>Brand: ShopEase</li>
                <li>Type: Wireless Headphones</li>
                <li>Connectivity: Bluetooth 5.3</li>
                <li>Battery Life: Up to 30 Hours</li>
                <li>Color: {color}</li>
                <li>Warranty: 1 Year</li>
              </ul>
            </div>
          )}

          {activeTab === "Reviews" && (
            <div>
              <h2>Customer Reviews</h2>
              <h3>★★★★★ 4.8 / 5</h3>
              <p>Excellent sound quality and comfortable design!</p>
              <p>Very good battery backup. Worth the price.</p>
            </div>
          )}

          <div className="product-features">
            <div>
              <span>🎵</span>
              <h4>High-Quality Sound</h4>
              <p>Clear audio with deep bass</p>
            </div>

            <div>
              <span>🎧</span>
              <h4>All-Day Comfort</h4>
              <p>Soft ear cushions</p>
            </div>

            <div>
              <span>🔋</span>
              <h4>Long Battery Life</h4>
              <p>Up to 30 hours of playback</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default ProductDetails;