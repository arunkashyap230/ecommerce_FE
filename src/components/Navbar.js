// src/components/Navbar.js
import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import {
  FaShoppingCart,
  FaHome,
  FaPlus,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

const NavigationBar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      className="shadow-sm py-3 sticky-top"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4 d-flex align-items-center gap-2"
        >
          🛒 E-Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link
              as={Link}
              to="/"
              className="d-flex align-items-center gap-1"
            >
              <FaHome /> Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/add-product"
              className="d-flex align-items-center gap-1"
            >
              <FaPlus /> Add Product
            </Nav.Link>

            {!user ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="d-flex align-items-center gap-1"
                >
                  <FaSignInAlt /> Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                  className="d-flex align-items-center gap-1"
                >
                  <FaUserPlus /> Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="d-flex align-items-center gap-1" disabled>
                  👋 Hi, {user.name}
                </Nav.Link>
                <Nav.Link
                  onClick={logout}
                  className="d-flex align-items-center gap-1"
                >
                  <FaSignOutAlt /> Logout
                </Nav.Link>
              </>
            )}

            <Nav.Link
              as={Link}
              to="/cart"
              className="position-relative d-flex align-items-center gap-1"
            >
              <FaShoppingCart />
              Cart
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-100 translate-middle"
              >
                {cart.length}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
