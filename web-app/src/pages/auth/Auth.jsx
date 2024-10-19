import Header from "../../components/common/header/Header";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Auth.css";
import { Link } from "react-router-dom";
import { useState } from "react";

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
  return (
    <>
      <Header heading="Sign Up" />
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
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Confirm Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
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
