import { Link, Outlet } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

type NavBarProps = {
    isAuthenticated: boolean;
};

const NavBar: React.FC<NavBarProps> = ({isAuthenticated}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem("jwt");
      navigate("/login");
  };

  return (
      <nav style={{ display: 'flex', gap: '15px', padding: '10px', borderBottom: '1px solid #ccc' }}>
          <Link to="/">Home</Link>
          {isAuthenticated ? (
              <>
                  <Link to="/products">Products</Link>
                  <Link to="/cart">Cart</Link>
                  <Link to="/profile">Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
              </>
          ) : (
              <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
              </>
          )}
      </nav>
  );
};
export default NavBar;