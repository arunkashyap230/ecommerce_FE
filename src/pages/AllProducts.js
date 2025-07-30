import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Badge,
  Form,
} from "react-bootstrap";
import { useCart } from "../context/CartContext";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantities, setQuantities] = useState({});
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});
  const [filters, setFilters] = useState({
    search: "",
  });

  const { addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/products`);
        const data = await res.json();
        setProducts(data.products || []);
        setFiltered(data.products || []);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (filters.search) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFiltered(temp);
  }, [filters, products]);

  const handleBuyClick = (productId) => {
    setSelectedProductId(productId);
    setQuantities((prev) => ({ ...prev, [productId]: 1 }));
  };

  const incrementQty = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const decrementQty = (productId) => {
    setQuantities((prev) => {
      const updatedQty = (prev[productId] || 0) - 1;
      if (updatedQty <= 0) {
        setSelectedProductId(null);
        const { [productId]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: updatedQty };
    });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart((prev) => ({ ...prev, [product._id]: true }));
  };

  const handleRemoveFromCart = (product) => {
    removeFromCart(product._id);
    setSelectedProductId(null);
    setQuantities((prev) => {
      const { [product._id]: removed, ...rest } = prev;
      return rest;
    });
    setAddedToCart((prev) => {
      const { [product._id]: removed, ...rest } = prev;
      return rest;
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center fw-bold">🛍️ Explore Products</h2>

      {/* Search Filter Only */}
      <Row className="mb-4">
        <Col md={4} className="mx-auto">
          <Form.Control
            type="text"
            placeholder="Search by name..."
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
          />
        </Col>
      </Row>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {filtered.length === 0 ? (
          <Col>
            <Alert variant="info" className="text-center">
              No products found.
            </Alert>
          </Col>
        ) : (
          filtered.map((product) => {
            const isSelected = selectedProductId === product._id;
            const quantity = quantities[product._id] || 0;
            const isInCart = addedToCart[product._id];

            return (
              <Col
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className="mb-4"
              >
                <Card className="shadow-sm border-0 h-100 product-card">
                  <Card.Img
                    variant="top"
                    src={product.imageUrl || "https://via.placeholder.com/300"}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="fw-bold">
                        {product.name}
                      </Card.Title>
                      <Card.Text className="text-muted small">
                        {product.description?.slice(0, 60)}...
                      </Card.Text>
                    </div>
                    <div>
                      <h5 className="text-primary fw-bold mt-2">
                        ₹{product.price}
                      </h5>
                      <div className="mt-3">
                        {!isSelected && !isInCart ? (
                          <Button
                            variant="dark"
                            className="w-100"
                            onClick={() => handleBuyClick(product._id)}
                          >
                            Buy Now
                          </Button>
                        ) : isSelected && !isInCart ? (
                          <>
                            <div className="d-flex justify-content-center align-items-center gap-3">
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => decrementQty(product._id)}
                              >
                                −
                              </Button>
                              <Badge bg="secondary" className="fs-6 px-3 py-1">
                                {quantity}
                              </Badge>
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => incrementQty(product._id)}
                              >
                                +
                              </Button>
                            </div>
                            <Button
                              variant="primary"
                              className="mt-2 w-100"
                              onClick={() => handleAddToCart(product)}
                            >
                              Add {quantity} to Cart
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline-danger"
                            className="w-100"
                            onClick={() => handleRemoveFromCart(product)}
                          >
                            Remove from Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>

      <style>{`
        .product-card:hover {
          transform: translateY(-5px);
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }
      `}</style>
    </Container>
  );
};

export default AllProducts;
