import {
  Container,
  Row,
  Form,
  Button,
  ListGroup,
  InputGroup,
} from "react-bootstrap";
import { useState } from "react";
import "./Register.css";
import Header from "../../components/common/header/Header";

const UserInfoForm = (props) => {
  const handleChange = (e) => {
    props.setFormData({ ...props.formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <div className="register-form-container">
            <Form>
              {/* Heading */}
              <h2 className="text-center mb-4 register-form-heading-color">
                Enter Your Details
              </h2>

              <Form.Group controlId="formBasicFullName">
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  value={props.formData.fullName}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPhoneNumber">
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={props.formData.phoneNumber}
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  size="sm"
                  className="mx-2"
                  onClick={(e) => {
                    e.preventDefault();
                    props.setRegisterStep(2); // Go to the next step
                  }}
                >
                  Next →
                </Button>
              </div>
            </Form>
          </div>
        </Row>
      </Container>
    </>
  );
};

const AddCompanyInfoForm = (props) => {
  const [companySuggestions, setCompanySuggestions] = useState([
    "Apple",
    "Microsoft",
  ]);
  const [selectedCompanies, setSelectedCompanies] = useState([
    "Apple",
    "Microsoft",
  ]);
  const [query, setQuery] = useState("");

  const handleInputChange = async (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.length > 2) {
      try {
        const response = await axios.get(`/api/companies?query=${input}`);
        setCompanySuggestions(response.data); // API response should be an array of company names
      } catch (error) {
        console.error("Error fetching company suggestions:", error);
        setCompanySuggestions([]);
      }
    } else {
      setCompanySuggestions([]);
    }
  };

  const handleCompanySelect = (company) => {
    if (!selectedCompanies.includes(company)) {
      setSelectedCompanies([...selectedCompanies, company]);
    }
    setQuery(""); // Clear the input field after selection
    setCompanySuggestions([]); // Clear suggestions
  };

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <div className="register-form-container">
            <Form>
              <h2 className="text-center mb-4 register-form-heading-color">
                Enter Your Stock
              </h2>

              <Form.Group
                controlId="formBasicCompanyName"
                className="company-dropdown"
              >
                <Form.Control
                  type="text"
                  placeholder="Select the companies in your portfolio"
                  value={query}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="register-company-dropdown-input"
                />
                {companySuggestions.length > 0 && (
                  <div className="suggestions-dropdown">
                    <ul className="list-group">
                      {companySuggestions.map((company, index) => (
                        <li
                          key={index}
                          className="list-group-item"
                          onClick={() => handleCompanySelect(company)}
                          style={{ cursor: "pointer" }}
                        >
                          {company}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Form.Group>

              <ListGroup>
                {selectedCompanies.map((company, index) => (
                  <ListGroup.Item
                    key={index}
                    className="selected-company-container"
                    style={{
                      borderBottom: "1px solid #ccc",
                      borderRadius: "2px",
                      padding: "10px 0",
                      margin: "5px",
                    }}
                  >
                    <span>{company}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="d-flex justify-content-center mt-4">
                <Button
                  variant="secondary"
                  size="sm"
                  className="mx-2"
                  onClick={(e) => {
                    e.preventDefault();
                    props.setRegisterStep(1); // Go to the previous step
                  }}
                >
                  ← Prev
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="mx-2"
                  onClick={(e) => {
                    e.preventDefault();
                    props.setRegisterStep(3); // Go to the next step
                  }}
                >
                  Next →
                </Button>
              </div>
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
              <h2 className="text-center mb-4 register-form-heading-color">
                Select Your News Partner
              </h2>
              <Form.Group controlId="formBasicCompanyName">
                <Form.Control type="text" placeholder="News Partner" />
              </Form.Group>
              <Form.Group controlId="formBasicCompanyAddress">
                <Form.Control type="text" placeholder="News Partner name" />
              </Form.Group>
              <Form.Group controlId="formBasicCompanyPhoneNumber">
                <Form.Control type="tel" placeholder="Number Number" />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button
                  variant="secondary"
                  size="sm"
                  className="mx-2"
                  onClick={(e) => {
                    e.preventDefault();
                    props.setRegisterStep(3); // Go to the previous step
                  }}
                >
                  ← Prev
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="mx-2"
                  onClick={(e) => {
                    e.preventDefault();
                    props.setRegisterStep(4); // Go to the next step
                  }}
                >
                  Next →
                </Button>
              </div>
            </Form>
          </div>
        </Row>
      </Container>
    </>
  );
};

const Register = () => {
  const [registerStep, setRegisterStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    companies: [],
    newsPartners: [],
    alertPreferences: {
      types: [],
      frequency: [],
    },
  });

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center register-container"
    >
      <Header heading="Registration" />
      {registerStep === 1 ? (
        <UserInfoForm
          setRegisterStep={setRegisterStep}
          setFormData={setFormData}
          formData={formData}
        />
      ) : (
        <>
          {registerStep === 2 ? (
            <AddCompanyInfoForm
              setRegisterStep={setRegisterStep}
              formData={formData}
              setFormData={setFormData}
            />
          ) : (
            <SelectNewsPartnerForm
              setRegisterStep={setRegisterStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default Register;
