import React, { useState } from "react";


const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 1499,
    oldPrice: 1899,
    rating: 4.5,
    reviews: 120,
    discount: 20,
    description: "High quality sound with noise cancellation. Perfect for music lovers.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 2499,
    oldPrice: 2999,
    rating: 4.3,
    reviews: 86,
    discount: 15,
    description: "Track your fitness, heart rate and more with style.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
  },
  {
    id: 3,
    name: "Casual Shoes",
    category: "Fashion",
    price: 1299,
    oldPrice: 1449,
    rating: 4.6,
    reviews: 142,
    discount: 10,
    description: "Comfortable, stylish and perfect for everyday wear.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
  },
  {
    id: 4,
    name: "Women's Handbag",
    category: "Fashion",
    price: 999,
    oldPrice: 1149,
    rating: 4.6,
    reviews: 88,
    discount: 12,
    description: "Trendy handbag with spacious storage and elegant design.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"
  },
  {
    id: 5,
    name: "Smartphone",
    category: "Electronics",
    price: 14999,
    oldPrice: 18499,
    rating: 4.7,
    reviews: 210,
    discount: 18,
    description: "Powerful performance with stunning display and camera.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
  },
  {
    id: 6,
    name: "Hoodie Sweatshirt",
    category: "Fashion",
    price: 1099,
    oldPrice: 1299,
    rating: 4.2,
    reviews: 64,
    discount: 10,
    description: "Soft, warm and perfect for casual days and offered.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600"
  },
  {
    id: 7,
    name: "Indoor Plant",
    category: "Home",
    price: 699,
    oldPrice: 829,
    rating: 4.5,
    reviews: 76,
    discount: 15,
    description: "Adds freshness and positivity to your space.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600"
  },
  {
    id: 8,
    name: "Makeup Set",
    category: "Beauty",
    price: 1799,
    oldPrice: 2299,
    rating: 4.3,
    reviews: 54,
    discount: 22,
    description: "Complete makeup set for your daily beauty routine.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600"
  }
];

function Product() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Beauty"
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCartCount((count) => count + 1);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="shop-page">

      {/* Navbar */}
      <nav className="shop-navbar">
        <h2>ShopEase</h2>

        <div className="shop-nav-links">
          <a href="/">Home</a>
          <a href="/products" className="active">Products</a>
          <a href="/cart">Cart ({cartCount})</a>
          <a href="/register">Register</a>
          <a href="/checkout">Checkout</a>
          <a href="/productdetails">ProductDetails</a>
          <a href="/login">Login</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="shop-hero">
        <p className="hero-label">THE SHOPEASE COLLECTION</p>

        <h1>
          Find Your <span>Next Favourite.</span>
        </h1>

        <p className="hero-description">
          Discover products you'll love, with quality you can trust.
        </p>

        <div className="product-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">

        <div className="products-heading">
          <div>
            <p className="section-label">MADE FOR YOU</p>
            <h2>Explore Products</h2>
          </div>

          <span className="product-count">
            {filteredProducts.length} products
          </span>
        </div>

        {/* Categories */}
        <div className="category-buttons">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "selected" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>

              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <span className="discount">
                  -{product.discount}%
                </span>
              </div>

              <div className="product-info">

                <div className="rating">
                  <span>★★★★★</span>
                  <small>
                    {product.rating} ({product.reviews})
                  </small>
                </div>

                <h3>{product.name}</h3>

                <div className="price">
                  <strong>
                    ₹{product.price.toLocaleString("en-IN")}
                  </strong>
                  <del>
                    ₹{product.oldPrice.toLocaleString("en-IN")}
                  </del>
                </div>

                <p className="product-description">
                  {product.description}
                </p>

                <button
                  className="add-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  🛒 Add to Cart
                </button>

              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <h3>No products found!</h3>
            <p>Try searching for another product.</p>
          </div>
        )}

      </section>
    </div>
  );
}

export default Product;