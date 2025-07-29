import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../context/CartContext";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css"; // custom styles

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    fetch(`${BACKEND_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []); // Adjust based on your actual backend response
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const isInCart = (id) => cart.some((item) => item._id === id);

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section d-flex align-items-center justify-content-center text-white text-center">
        <div>
          <h1 className="display-3 fw-bold" data-aos="fade-up">
            Your Style, Delivered
          </h1>
          <p className="lead mb-4" data-aos="fade-up" data-aos-delay="200">
            Discover trending products curated just for you.
          </p>
          <a
            href="#products"
            className="btn btn-light btn-lg px-4 py-2"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            Shop Now
          </a>
        </div>
      </div>

      {/* Products Section */}
      <div className="container py-5" id="products">
        <h2 className="text-center fw-bold mb-5" data-aos="fade-up">
          Featured Products
        </h2>
        <div className="row g-4">
          {products.map((product, index) => (
            <div
              className="col-sm-6 col-md-4 col-lg-3"
              key={product._id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="card h-100 border-0 shadow-sm product-card">
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
                    <h6 className="fw-bold text-primary mb-2">
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

      {/* Categories Section */}
      <section className="py-5 bg-light" id="categories">
        <div className="container text-center">
          <h2 className="fw-bold mb-4" data-aos="fade-up">
            Shop by Category
          </h2>
          <div className="row g-4 justify-content-center">
            {[
              { name: "Electronics", icon: "💻" },
              { name: "Fashion", icon: "👗" },
              { name: "Home", icon: "🏠" },
              { name: "Toys", icon: "🧸" },
            ].map((cat, i) => (
              <div
                className="col-6 col-md-3"
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="category-card py-4 shadow-sm">
                  <div className="display-5">{cat.icon}</div>
                  <h5 className="mt-2 fw-semibold">{cat.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-dark text-white text-center">
        <div className="container" data-aos="zoom-in">
          <h3 className="fw-bold">Limited Time Deals!</h3>
          <p>Hurry up and grab exclusive discounts before they expire.</p>
          <a href="#products" className="btn btn-warning btn-lg">
            Explore Offers
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
