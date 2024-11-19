import Header from "../../components/common/header/Header";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiCall from "../../utils/axiosInstance.js";
import { toast } from "react-toastify";
import Storage from "../../utils/storage.js";
import Spinner from "react-bootstrap/Spinner";

const Login = (props) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password.length < 6) {
      toast.error("Password should be atleast 6 characters long");
      setLoading(false);
      return;
    }

    const response = await apiCall("POST", "api/v1/auth/login", formData);

    setLoading(false);
    if (response.success) {
      if (response.data.stage == "Stage_EmailVerification") {
        toast.info("Please verify your email to continue");
      } else {
        Storage.setData("token", response.data.token);
        Storage.setData("stage", response.data.stage);
        if (response.data.stage === "Stage_AddUserDetails")
          navigate("/register");
        else navigate("/dashboard");
      }
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <Header heading="Log In" />
      <Container fluid>
        <Row className="justify-content-center">
          <div className="login-form-container">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Log In"
                )}
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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password should be atleast 6 characters long");
      setLoading(false);
      return;
    }

    const response = await apiCall("POST", "api/v1/auth/signup", formData);
    setLoading(false);
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
                  value={formData.email}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Sign Up"
                )}
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
