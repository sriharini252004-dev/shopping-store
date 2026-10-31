import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext.jsx";

const API = "http://localhost:5000/api";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, cartTotal, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = Number(cartTotal || 0);
  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 49;
  const total = subtotal + delivery;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty. Please add products first.");
      return;
    }

    const token = localStorage.getItem("shopease-token");

    if (!token) {
      setError("Please log in before placing your order.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      return;
    }

    if (!/^[0-9]{10}$/.test(form.phone.trim())) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^[0-9]{6}$/.test(form.postalCode.trim())) {
      setError("Please enter a valid 6-digit PIN code.");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        items: cartItems.map((item) => ({
          product: item._id || item.id,
          quantity: Number(item.quantity || 1),
        })),
        shippingAddress: {
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          postalCode: form.postalCode.trim(),
        },
        paymentMethod,
      };

      const response = await axios.post(
        `${API}/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Order successful
      clearCart();

      const order = response.data.order || response.data;

      // Save order details for confirmation page
      sessionStorage.setItem(
        "shopease-last-order",
        JSON.stringify({
          orderId: order._id || order.id || "",
          total:
            Number(order.totalPrice ?? order.totalAmount ?? total),
          customerName: form.fullName.trim(),
        })
      );

      navigate("/order-success");
    } catch (err) {
      console.error(
        "Checkout error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          "Order place panna mudiyala. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <div className="checkout-empty-icon">🛍️</div>

          <h1>Your cart is empty</h1>

          <p>
            Add your favourite products before proceeding to checkout.
          </p>

          <Link to="/products" className="checkout-primary-button">
            Explore Products →
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        {/* Header */}
        <header className="checkout-header">
          <span className="checkout-eyebrow">
            ALMOST YOURS
          </span>

          <h1>Complete Your Order<span>.</span></h1>

          <p>
            Just a few details, and your favourites are on their way.
          </p>

          <div className="checkout-steps">
            <div className="checkout-step completed">
              <span>✓</span>
              <p>Shopping Cart</p>
            </div>

            <div className="checkout-step active">
              <span>2</span>
              <p>Checkout</p>
            </div>

            <div className="checkout-step">
              <span>3</span>
              <p>Confirmation</p>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="checkout-layout">
            {/* LEFT SIDE */}
            <div className="checkout-form-column">
              {/* Shipping information */}
              <section className="checkout-card">
                <div className="checkout-card-heading">
                  <div className="checkout-heading-icon">
                    📦
                  </div>

                  <div>
                    <h2>Delivery Information</h2>
                    <p>Where should we deliver your order?</p>
                  </div>
                </div>

                <div className="checkout-fields">
                  <div className="checkout-field full-width">
                    <label htmlFor="fullName">Full Name *</label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={form.fullName}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                      maxLength={100}
                    />
                  </div>

                  <div className="checkout-field full-width">
                    <label htmlFor="phone">Phone Number *</label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      required
                    />
                  </div>

                  <div className="checkout-field full-width">
                    <label htmlFor="address">Full Address *</label>

                    <textarea
                      id="address"
                      name="address"
                      placeholder="House number, street, area..."
                      value={form.address}
                      onChange={handleChange}
                      autoComplete="street-address"
                      rows={3}
                      required
                      maxLength={300}
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="city">City *</label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="Enter city"
                      value={form.city}
                      onChange={handleChange}
                      autoComplete="address-level2"
                      required
                      maxLength={100}
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="postalCode">PIN Code *</label>

                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      placeholder="6-digit PIN code"
                      value={form.postalCode}
                      onChange={handleChange}
                      autoComplete="postal-code"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Payment method */}
              <section className="checkout-card">
                <div className="checkout-card-heading">
                  <div className="checkout-heading-icon">
                    💳
                  </div>

                  <div>
                    <h2>Payment Method</h2>
                    <p>Choose how you want to pay.</p>
                  </div>
                </div>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                  />

                  <span className="payment-radio-design"></span>

                  <span className="payment-option-icon">
                    💵
                  </span>

                  <span className="payment-option-content">
                    <strong>Cash on Delivery</strong>
                    <small>Pay when your order arrives.</small>
                  </span>

                  <span className="payment-tag">Available</span>
                </label>

                <p className="payment-note">
                  🔒 Your order details are sent securely to the server.
                </p>
              </section>
            </div>

            {/* RIGHT SIDE: ORDER SUMMARY */}
            <aside className="checkout-summary">
              <div className="checkout-summary-heading">
                <h2>Your Order</h2>

                <span>
                  {cartItems.reduce(
                    (sum, item) => sum + Number(item.quantity || 1),
                    0
                  )}{" "}
                  items
                </span>
              </div>

              <div className="checkout-order-items">
                {cartItems.map((item, index) => {
                  const id = item._id || item.id || index;
                  const name = item.name || item.title || "Product";

                  const image =
                    item.image ||
                    item.imageUrl ||
                    item.images?.[0] ||
                    "https://placehold.co/100x100?text=Product";

                  const quantity = Number(item.quantity || 1);
                  const price = Number(item.price || 0);

                  return (
                    <div className="checkout-order-item" key={id}>
                      <div className="checkout-order-image">
                        <img
                          src={image}
                          alt={name}
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src =
                              "https://placehold.co/100x100?text=Product";
                          }}
                        />

                        <span>{quantity}</span>
                      </div>

                      <div className="checkout-order-details">
                        <h3>{name}</h3>

                        <p>
                          ₹{price.toLocaleString("en-IN")} each
                        </p>
                      </div>

                      <strong className="checkout-order-price">
                        ₹
                        {(price * quantity).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  );
                })}
              </div>

              <div className="checkout-summary-divider"></div>

              <div className="checkout-summary-row">
                <span>Subtotal</span>

                <strong>
                  ₹{subtotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="checkout-summary-row">
                <span>Delivery Fee</span>

                <strong className={delivery === 0 ? "checkout-free" : ""}>
                  {delivery === 0
                    ? "FREE"
                    : `₹${delivery.toLocaleString("en-IN")}`}
                </strong>
              </div>

              <div className="checkout-free-note">
                {subtotal >= 999
                  ? "✓ Free delivery unlocked!"
                  : `Spend ₹${(999 - subtotal).toLocaleString(
                      "en-IN"
                    )} more for free delivery.`}
              </div>

              <div className="checkout-summary-divider"></div>

              <div className="checkout-grand-total">
                <span>Total Amount</span>

                <strong>
                  ₹{total.toLocaleString("en-IN")}
                </strong>
              </div>

              {error && (
                <div className="checkout-error" role="alert">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="place-order-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="checkout-button-spinner"></span>
                    Placing Order...
                  </>
                ) : (
                  <>
                    Place Order <span>→</span>
                  </>
                )}
              </button>

              <Link to="/cart" className="checkout-edit-cart">
                ← Return to Cart
              </Link>

              <div className="checkout-trust">
                <span>🔐</span>

                <p>
                  <strong>Shop with confidence</strong>
                  <br />
                  Review your details before placing your order.
                </p>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Checkout;