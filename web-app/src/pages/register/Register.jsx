import { Container, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import "./Register.css";
import Header from "../../components/common/header/Header";

const UserInfoForm = (props) => {
  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <div className="register-form-container">
            <Form>
              <Form.Group controlId="formBasicFullName">
                <Form.Control type="text" placeholder="Full Name" />
              </Form.Group>
              <Form.Group controlId="formBasicPhoneNumber">
                <Form.Control type="tel" placeholder="Phone Number" />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  props.setRegisterStep(2);
                }}
              >
                Next →
              </Button>
            </Form>
          </div>
        </Row>
      </Container>
    </>
  );
};

const AddCompanyInfoForm = (props) => {
  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <div className="register-form-container">
            <Form>
              <Form.Group controlId="formBasicCompanyName">
                <Form.Control type="text" placeholder="Company Name" />
              </Form.Group>
              <Form.Group controlId="formBasicCompanyAddress">
                <Form.Control type="text" placeholder="Company Address" />
              </Form.Group>
              <Form.Group controlId="formBasicCompanyPhoneNumber">
                <Form.Control type="tel" placeholder="Company Phone Number" />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  props.setRegisterStep(3);
                }}
              >
                Next →
              </Button>
            </Form>
          </div>
        </Row>
      </Container>
    </>
  );
};

const SelectNewsPartnerForm = (props) => {
  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <div className="register-form-container">
            <Form>
              <Form.Group controlId="formBasicCompanyName">
                <Form.Control type="text" placeholder="News Partner" />
              </Form.Group>
              <Form.Group controlId="formBasicCompanyAddress">
                <Form.Control type="text" placeholder="News Partner name" />
              </Form.Group>
              <Form.Group controlId="formBasicCompanyPhoneNumber">
                <Form.Control type="tel" placeholder="Number Number" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Next →
              </Button>
            </Form>
          </div>
        </Row>
      </Container>
    </>
  );
};

const Register = () => {
  const [registerStep, setRegisterStep] = useState(1);

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center register-container"
    >
      <Header heading="Registration" />
      {registerStep === 1 ? (
        <UserInfoForm setRegisterStep={setRegisterStep} />
      ) : (
        <>
          {registerStep === 2 ? (
            <AddCompanyInfoForm setRegisterStep={setRegisterStep} />
          ) : (
            <SelectNewsPartnerForm setRegisterStep={setRegisterStep} />
          )}
        </>
      )}
    </Container>
  );
};

export default Register;
