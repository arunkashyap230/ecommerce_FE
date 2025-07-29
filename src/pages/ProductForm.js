// src/pages/ProductForm.js
import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const ProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("image", image);

    try {
      const res = await fetch(`${BACKEND_URL}/api/products/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Product added successfully!");
        console.log(data);
      } else {
        alert(data.message || "❌ Failed to add product");
      }
    } catch (err) {
      console.error("Error uploading product:", err);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card
        className="p-4 shadow-lg"
        style={{ width: "100%", maxWidth: "600px", borderRadius: "16px" }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">
          Add New Product
        </h3>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter product name"
              className="rounded-3"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Price (₹)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              onChange={handleChange}
              placeholder="Enter price"
              className="rounded-3"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              onChange={handleChange}
              placeholder="Write product details..."
              className="rounded-3"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Product Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="rounded-3"
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 rounded-pill py-2 fw-bold"
          >
            🚀 Upload Product
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ProductForm;
