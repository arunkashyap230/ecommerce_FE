// src/pages/ProductForm.js
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

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
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/products`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Product added successfully!");
        console.log(data);
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (err) {
      console.error("Error uploading product:", err);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Add Product</h2>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default ProductForm;
