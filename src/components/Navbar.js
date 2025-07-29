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
  FaBoxOpen,
} from "react-icons/fa";

const NavigationBar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navLinkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: "500",
    color: "#333",
    transition: "all 0.2s ease-in-out",
  };

  const navHover = {
    textDecoration: "none",
    borderRadius: "8px",
    padding: "6px 10px",
    transition: "0.2s",
  };

  return (
    <>
      <Navbar
        bg="white"
        expand="lg"
        className="shadow-sm sticky-top py-3"
        style={{ backdropFilter: "blur(6px)", zIndex: 1030 }}
      >
        <Container fluid className="px-4">
          {/* Brand */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold fs-4 text-primary d-flex align-items-center gap-2"
          >
            🛒 E-Shop
          </Navbar.Brand>

          {/* Mobile Icons */}
          <div className="d-lg-none d-flex align-items-center gap-3">
            {user && (
              <span className="fw-semibold text-muted small">
                👋 {user.name}
              </span>
            )}
            <Link to="/cart" className="text-dark position-relative">
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
            <Button
              variant="outline-primary"
              onClick={handleShow}
              className="border-0 shadow-sm"
              style={{ borderRadius: "8px" }}
            >
              <FaBars />
            </Button>
          </div>

          {/* Desktop Navigation */}
          <Nav className="ms-auto d-none d-lg-flex align-items-center gap-3">
            <Nav.Item>
              <Link to="/" style={{ ...navLinkStyle, ...navHover }}>
                <FaHome /> Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/add-product" style={{ ...navLinkStyle, ...navHover }}>
                <FaPlus /> Add Product
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/products" style={{ ...navLinkStyle, ...navHover }}>
                <FaBoxOpen /> All Products
              </Link>
            </Nav.Item>

            {!user ? (
              <>
                <Nav.Item>
                  <Link to="/login" style={{ ...navLinkStyle, ...navHover }}>
                    <FaSignInAlt /> Login
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/signup" style={{ ...navLinkStyle, ...navHover }}>
                    <FaUserPlus /> Signup
                  </Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <span className="text-muted small fw-semibold">
                  👋 Hi, {user.name}
                </span>
                <Nav.Item>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={logout}
                    style={{
                      ...navHover,
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontWeight: "500",
                      backgroundColor: "#f8d7da",
                      color: "#721c24",
                    }}
                  >
                    <FaSignOutAlt /> Logout
                  </Button>
                </Nav.Item>
              </>
            )}

            <Nav.Item>
              <Link
                to="/cart"
                style={{ ...navLinkStyle, ...navHover, position: "relative" }}
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
              </Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>📂 Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-3">
            <Link to="/" onClick={handleClose} style={navLinkStyle}>
              <FaHome /> Home
            </Link>
            <Link to="/add-product" onClick={handleClose} style={navLinkStyle}>
              <FaPlus /> Add Product
            </Link>
            <Link to="/products" onClick={handleClose} style={navLinkStyle}>
              <FaBoxOpen /> All Products
            </Link>
            {!user ? (
              <>
                <Link to="/login" onClick={handleClose} style={navLinkStyle}>
                  <FaSignInAlt /> Login
                </Link>
                <Link to="/signup" onClick={handleClose} style={navLinkStyle}>
                  <FaUserPlus /> Signup
                </Link>
              </>
            ) : (
              <>
                <div className="fw-semibold mb-2">👋 {user.name}</div>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    logout();
                    handleClose();
                  }}
                  size="sm"
                  className="d-flex align-items-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </Button>
              </>
            )}
            <Link to="/cart" onClick={handleClose} style={navLinkStyle}>
              <FaShoppingCart /> Cart
              {cart.length > 0 && (
                <Badge bg="danger" pill className="ms-2">
                  {cart.length}
                </Badge>
              )}
            </Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavigationBar;
