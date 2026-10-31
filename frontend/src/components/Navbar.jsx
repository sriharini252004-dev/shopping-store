import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>ShopEase</h2>

      <div>
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/cart">Cart</Link>
       
        <Link to="/Register">Register</Link>

      

          <Link to="/Checkout">Checkout</Link>


            <Link to="/ProductDetails">ProductDetails</Link>

            <Link to="/Login">Login</Link>





      </div>
    </nav>
  );
}

export default Navbar;