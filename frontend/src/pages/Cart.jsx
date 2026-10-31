
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  } = useCart();

  const subtotal = cartTotal;
  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 49;
  const total = subtotal + delivery;

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛍️</div>
          <span className="cart-eyebrow">YOUR SHOPPING BAG</span>
          <h1>Your cart is waiting!</h1>
          <p>
            Looks like you haven't added anything yet.
            Discover something special for yourself.
          </p>

          <Link to="/products" className="continue-shopping">
            Explore Products →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        {/* Page heading */}
        <div className="cart-heading">
          <div>
            <span className="cart-eyebrow">YOUR SHOPPING BAG</span>
            <h1>Shopping Cart</h1>
            <p>
              {cartItems.length} different product
              {cartItems.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          <Link to="/products" className="back-to-shop">
            ← Continue Shopping
          </Link>
        </div>

        <div className="cart-layout">
          {/* Cart products */}
          <section className="cart-products">
            <div className="cart-section-title">
              <h2>Your Items</h2>
              <span>
                {cartItems.reduce(
                  (sum, item) => sum + (item.quantity || 1),
                  0
                )}{" "}
                items
              </span>
            </div>

            {cartItems.map((item) => {
              const id = item._id || item.id;
              const name = item.name || item.title || "Product";
              const image =
                item.image ||
                item.imageUrl ||
                item.images?.[0] ||
                "https://placehold.co/200x200?text=ShopEase";

              const quantity = item.quantity || 1;
              const price = Number(item.price || 0);

              return (
                <article className="cart-item" key={id}>
                  <Link
                    to={id ? `/products/${id}` : "/products"}
                    className="cart-item-image-wrap"
                  >
                    <img
                      src={image}
                      alt={name}
                      className="cart-item-image"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src =
                          "https://placehold.co/200x200?text=ShopEase";
                      }}
                    />
                  </Link>

                  <div className="cart-item-details">
                    <span className="cart-item-category">
                      {item.category || "ShopEase Collection"}
                    </span>

                    <h3>{name}</h3>

                    <p className="cart-item-price">
                      ₹{price.toLocaleString("en-IN")}
                    </p>

                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${name}`}
                          onClick={() => decreaseQuantity(id)}
                        >
                          −
                        </button>

                        <span>{quantity}</span>

                        <button
                          type="button"
                          aria-label={`Increase quantity of ${name}`}
                          onClick={() => increaseQuantity(id)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => removeFromCart(id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-total">
                    ₹{(price * quantity).toLocaleString("en-IN")}
                  </div>
                </article>
              );
            })}

            <Link to="/products" className="cart-continue-link">
              ← Add more products
            </Link>
          </section>

          {/* Order summary */}
          <aside className="cart-summary">
            <div className="summary-heading">
              <h2>Order Summary</h2>
              <span>💜</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <strong className={delivery === 0 ? "free-delivery" : ""}>
                {delivery === 0
                  ? "FREE"
                  : `₹${delivery.toLocaleString("en-IN")}`}
              </strong>
            </div>

            <div className="free-delivery-note">
              {subtotal >= 999
                ? "✓ You've unlocked free delivery!"
                : `Add ₹${(999 - subtotal).toLocaleString(
                    "en-IN"
                  )} more for free delivery.`}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>

            <button
              type="button"
              className="checkout-button"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout <span>→</span>
            </button>

            <div className="cart-security">
              <span>🔒</span>
              <div>
                <strong>Safe & Secure Checkout</strong>
                <p>Your shopping experience matters to us.</p>
              </div>
            </div>

            <div className="cart-payment-note">
              <span>✓</span> Quality products
              <span>✓</span> Easy ordering
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;
