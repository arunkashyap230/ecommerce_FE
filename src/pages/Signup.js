// src/pages/Signup.js
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // 👈

const Signup = () => {
  const navigate = useNavigate(); // 👈
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Signup successful!");
        console.log(data);
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      {/* ✅ Button on Top */}
      <div className="text-end mb-3">
        <Button variant="primary" onClick={() => navigate("/customer-signup")}>
          Customer_Sign
        </Button>
      </div>

      <h2 className="mb-4">Signup</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="signupName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="signupEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="signupPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Signup
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
