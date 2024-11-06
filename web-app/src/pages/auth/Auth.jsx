import Header from "../../components/common/header/Header";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Auth.css";
import { useState } from "react";
import apiCall from "../../utils/axiosInstance.js";
import { toast } from "react-toastify";
import * as validate from "../../utils/validation.js";

const Login = (props) => {
  return (
    <>
      <Header heading="Log In" />
      <Container fluid>
        <Row className="justify-content-center">
          <div className="login-form-container">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Log In
              </Button>
            </Form>
          </div>
          <p className="first-time-user">
            First time User?{" "}
            <span
              className="text-color-primary auth-mode-change-link"
              onClick={(e) => {
                e.preventDefault();
                props.setAuthMode("signup");
              }}
            >
              Sign Up here.
            </span>
          </p>
        </Row>
      </Container>
    </>
  );
};

const SignUp = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password should be atleast 6 characters long");
      return;
    }
    if (!validate.validEmail(formData.email)) {
      toast.error("Invalid Email");
      return;
    }

    const response = await apiCall("POST", "api/v1/auth/signup", formData);
    console.log("response from handlesubmit", response);
    if (response.success) {
      toast.success("Please verify your email to continue");
      props.setAuthMode("login");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <Header heading="Sign Up" />
      <Container fluid>
        <Row className="justify-content-center">
          <div className="login-form-container">
            <Form>
              <Form.Group>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Sign Up
              </Button>
            </Form>
          </div>
          <p className="first-time-user">
            Already have an account?{" "}
            <span
              className="text-color-primary auth-mode-change-link"
              onClick={(e) => {
                e.preventDefault();
                props.setAuthMode("login");
              }}
            >
              Log In here.
            </span>
          </p>
        </Row>
      </Container>
    </>
  );
};

const Auth = () => {
  const [authMode, setAuthMode] = useState("login");
  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center auth-container"
    >
      {authMode === "login" ? (
        <Login setAuthMode={setAuthMode} />
      ) : (
        <SignUp setAuthMode={setAuthMode} />
      )}
    </Container>
  );
};

export default Auth;
