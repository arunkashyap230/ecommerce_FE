import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../context/CartContext";
import "./Home.css"; // custom styles

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const isInCart = (id) => cart.some((item) => item._id === id);

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section text-center text-white d-flex align-items-center justify-content-center">
        <div>
          <h1 className="display-4 fw-bold">Shop the Latest Trends</h1>
          <p className="lead">
            Explore top products, hand-picked just for you.
          </p>
          <a href="#products" className="btn btn-light px-4 py-2 mt-3">
            Browse Products
          </a>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4 fw-bold">Shop by Category</h2>
          <div className="row g-4">
            {["Electronics", "Fashion", "Home", "Toys"].map((cat, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="bg-white shadow-sm rounded py-4 px-3">
                  <h5 className="text-primary">{cat}</h5>
                  <p className="text-muted small">Explore {cat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div className="container py-5" id="products">
        <h2 className="text-center mb-5 fw-bold">Featured Products</h2>
        <div className="row g-4">
          {products.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={product._id}>
              <div className="card h-100 shadow-sm border-0 product-card">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{product.name}</h5>
                  <p
                    className="card-text text-muted small"
                    style={{ height: "40px", overflow: "hidden" }}
                  >
                    {product.description}
                  </p>
                  <div className="mt-auto">
                    <h6 className="text-primary fw-bold mb-2">
                      ₹{product.price}
                    </h6>
                    {isInCart(product._id) ? (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-success w-50"
                          onClick={() => addToCart(product)}
                        >
                          Add More
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger w-50"
                          onClick={() => removeFromCart(product._id)}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-primary w-100"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
