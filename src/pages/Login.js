import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const loginEndpoints = [
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
      `${process.env.REACT_APP_BACKEND_URL}/api/customers/login`,
    ];

    for (const endpoint of loginEndpoints) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok) {
          const rawUser = data.user || data.customer;
          const normalizedUser = {
            name: rawUser.name || rawUser.fullName,
            email: rawUser.email,
            role: rawUser.role,
          };

          login(normalizedUser, data.token);
          navigate("/");
          return;
        }
      } catch (err) {
        console.error("Login error:", err);
      }
    }

    setError("Invalid email or password.");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e3f2fd, #ffffff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 15px",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className="shadow-lg rounded-4 border-0 p-3">
              <Card.Body>
                <h3 className="text-center fw-bold mb-4 text-primary">
                  Sign In
                </h3>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Form.Check label="Remember me" />
                    <Link
                      to="#"
                      className="small text-decoration-none text-primary"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 py-2"
                  >
                    Login
                  </Button>
                </Form>

                <hr className="my-4" />

                <p className="text-center text-muted">Or login using</p>

                <div className="d-flex justify-content-between gap-2 flex-wrap mt-3">
                  {[
                    {
                      label: "Gmail",
                      icon: "https://img.icons8.com/color/24/gmail-new.png",
                    },
                    {
                      label: "Twitter",
                      icon: "https://img.icons8.com/color/24/twitter--v1.png",
                    },
                  ].map(({ label, icon }) => (
                    <Button
                      key={label}
                      variant="outline-secondary"
                      className="flex-grow-1 d-flex align-items-center gap-2 py-2 justify-content-center"
                    >
                      <img src={icon} alt={label} />
                      {label}
                    </Button>
                  ))}
                </div>

                <div className="text-center mt-4">
                  <span className="text-muted">Don’t have an account? </span>
                  <Link
                    to="/signup"
                    className="text-decoration-none text-primary fw-semibold"
                  >
                    Register
                  </Link>
                </div>
              </Card.Body>
            </Card>

            <p className="text-center text-muted small mt-3">
              © 2025{" "}
              <a
                href="https://codedthemes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                CodedThemes
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
