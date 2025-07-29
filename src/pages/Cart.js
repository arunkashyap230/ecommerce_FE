import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [showBillForm, setShowBillForm] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false); // Toast state
  const [billData, setBillData] = useState({
    customerName: "",
    mobileNumber: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();

  const totalAmount = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return acc + price * quantity;
  }, 0);

  const handleChange = (e) => {
    setBillData({ ...billData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    const payload = {
      customerName: billData.customerName,
      mobileNumber: billData.mobileNumber,
      address: billData.address,
      cartItems: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("✅ Order placed successfully!");
        clearCart();
        setShowBillForm(false);
      } else {
        alert(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout.");
    }
  };

  const handleProceedToCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginToast(true); // show toast
      setTimeout(() => {
        navigate("/login");
      }, 2000); // delay before redirect
    } else {
      setShowBillForm(true);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">🛒 Your Shopping Cart</h2>

      {/* Toast for login alert */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="warning"
          onClose={() => setShowLoginToast(false)}
          show={showLoginToast}
          delay={1800}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto text-dark">Login Required</strong>
          </Toast.Header>
          <Toast.Body className="text-dark">
            Please log in to proceed to checkout.
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Cart content... (keep your existing table, billing form etc.) */}

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-muted fs-5">Your cart is currently empty.</p>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle shadow-sm border rounded table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Product</th>
                  <th>Details</th>
                  <th>Quantity</th>
                  <th>Item Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="rounded"
                        width="80"
                        height="80"
                        style={{ objectFit: "cover" }}
                      />
                    </td>
                    <td>
                      <h6 className="mb-1">{item.name}</h6>
                      <small className="text-muted">₹{item.price} each</small>
                    </td>
                    <td>{item.quantity}</td>
                    <td className="fw-bold">
                      ₹{Number(item.price) * Number(item.quantity || 1)}
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <i className="bi bi-trash"></i> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-end mt-4 p-3 bg-light rounded shadow-sm">
            <h4>
              Total Amount:{" "}
              <span className="text-success fw-bold">₹{totalAmount}</span>
            </h4>
            <button
              className="btn btn-success mt-2"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {/* Existing Billing Form — keep as is */}
      {showBillForm && (
        <div className="mt-5 p-4 bg-white rounded shadow">
          <h4 className="mb-4 text-primary">🧾 Billing Details</h4>
          <form onSubmit={handleCheckout}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="customerName"
                  required
                  value={billData.customerName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="mobileNumber"
                  required
                  value={billData.mobileNumber}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  value={billData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Shipping Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  required
                  value={billData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-4 text-end">
              <button type="submit" className="btn btn-primary">
                Submit Bill & Place Order
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary ms-2"
                onClick={() => setShowBillForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cart;
