import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Badge,
  Offcanvas,
  Button,
} from "react-bootstrap";
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
  FaBars,
} from "react-icons/fa";

const NavigationBar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        className="shadow-sm py-3 sticky-top"
      >
        <Container className="d-flex justify-content-between align-items-center">
          {/* Brand */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold fs-4 d-flex align-items-center gap-2"
          >
            🛒 E-Shop
          </Navbar.Brand>

          {/* Right-side icons (Mobile View) */}
          <div className="d-lg-none d-flex align-items-center gap-3">
            {user && (
              <span
                className="fw-semibold text-muted"
                style={{ fontSize: "0.9rem" }}
              >
                👋 {user.name}
              </span>
            )}
            <Link to="/cart" className="position-relative text-dark">
              <FaShoppingCart size={20} />
              {cart.length > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cart.length}
                </Badge>
              )}
            </Link>
            <Button variant="light" onClick={handleShow}>
              <FaBars />
            </Button>
          </div>

          {/* Desktop View */}
          <Nav className="ms-auto d-none d-lg-flex align-items-center gap-4">
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
                <Nav.Link disabled className="d-flex align-items-center gap-1">
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
              <FaShoppingCart /> Cart
              {cart.length > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cart.length}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              All Products
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Offcanvas Sidebar for Mobile */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-3">
            <Nav.Link as={Link} to="/" onClick={handleClose}>
              <FaHome /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/add-product" onClick={handleClose}>
              <FaPlus /> Add Product
            </Nav.Link>
            <Nav.Link as={Link} to="/products" onClick={handleClose}>
              📦 All Products
            </Nav.Link>
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login" onClick={handleClose}>
                  <FaSignInAlt /> Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" onClick={handleClose}>
                  <FaUserPlus /> Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link disabled>👋 Hi, {user.name}</Nav.Link>
                <Nav.Link
                  onClick={() => {
                    logout();
                    handleClose();
                  }}
                >
                  <FaSignOutAlt /> Logout
                </Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/cart" onClick={handleClose}>
              <FaShoppingCart /> Cart
              {cart.length > 0 && (
                <Badge bg="danger" pill className="ms-2">
                  {cart.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavigationBar;
