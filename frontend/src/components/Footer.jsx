import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>ShopEase</h2>

          <p>
            Your one-stop destination for quality products
            at amazing prices. Shop smarter, live better!
          </p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Shopping Cart</Link>
          <Link to="/profile">My Account</Link>
          <Link to="/orders">My Orders</Link>
        </div>

        <div className="footer-contact">
          <p>📦 Fast delivery across India</p>
          <p>
            ✉️ <a href="mailto:support@shopease.com">
              support@shopease.com
            </a>
          </p>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
          <p>Made with 💙 for a better shopping experience.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;