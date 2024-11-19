import { Container, Row, Form, Button, ListGroup } from "react-bootstrap";
import { useState } from "react";
import "./Register.css";
import Header from "../../components/common/header/Header";
import apiCall from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { Spinner } from "react-bootstrap";
import { validateRegistrationForm } from "../../utils/validation";
import Storage from "../../utils/storage";
import { useNavigate } from "react-router-dom";

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
                  style={{ color: "white" }}
                  className="register-userinfo-input"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPhoneNumber">
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={props.formData.phoneNumber}
                  style={{ color: "white" }}
                  className="register-userinfo-input"
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
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.length > 2) {
      setLoading(true);
      const response = await apiCall(
        "GET",
        `/api/v1/company/getSuggestion?query=${input}`
      );
      setLoading(false);
      if (response.success) {
        setCompanySuggestions(response.data);
      }
      console.log("Company suggestions:", response);
    } else {
      setCompanySuggestions([]);
    }
  };

  const handleCompanySelect = (company) => {
    console.log("Company:", company);
    company.quantity = "";
    company.priority = "";
    if (!props.formData.companies.some((c) => c._id === company._id)) {
      props.setFormData({
        ...props.formData,
        companies: [...props.formData.companies, company],
      });
    } else {
      toast.error("Company already added");
    }

    setQuery(""); // Clear the input field after selection
    setCompanySuggestions([]); // Clear suggestions
  };

  const handleCompanyPriorityAndQuantity = (e, company) => {
    // Create a new companies array with updated company data
    const updatedCompanies = props.formData.companies.map((c) => {
      if (c._id === company._id) {
        // Update the priority or quantity based on the input field
        return {
          ...c,
          [e.target.name]: e.target.value,
        };
      }
      return c;
    });

    // Check if priority is within the valid range
    if (
      e.target.name === "priority" &&
      (e.target.value < 0 || e.target.value > 10)
    ) {
      toast.error("Priority should be between 0 and 10");
      return;
    }

    // Update the formData with the new companies array
    props.setFormData({
      ...props.formData,
      companies: updatedCompanies,
    });

    console.log("Updated companies:", updatedCompanies);
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
                {loading ? (
                  <div
                    className="list-group-item "
                    style={{
                      minHeight: "100px",
                      overflowY: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "white",
                      borderRadius: "10px",
                    }}
                  >
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <>
                    {companySuggestions.length > 0 && (
                      <div
                        className="suggestions-dropdown"
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        <ul className="list-group">
                          {companySuggestions.map((company, index) => (
                            <li
                              key={company._id}
                              className="list-group-item"
                              onClick={() => handleCompanySelect(company)}
                              style={{ cursor: "pointer" }}
                            >
                              {company.name + " (" + company.symbol + ")"}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </Form.Group>

              <ListGroup>
                {props.formData.companies.map((company, index) => (
                  <ListGroup.Item
                    key={index}
                    className="selected-company-container justify-content-between"
                    style={{
                      borderBottom: "1px solid #D1CFE2",
                      borderRadius: "10px",
                      padding: "10px 5px",
                      margin: "5px",
                      background: "#D1CFE2",
                    }}
                  >
                    <div
                      className="d-flex justify-content-between align-items-center flex-md-row flex-column"
                      style={{ background: "#D1CFE2" }}
                    >
                      {/* Company Name and Symbol */}
                      <div className="d-flex flex-column flex-md-row align-items-start">
                        <span>
                          {company.name + " ("}
                          <span style={{ color: "#4CAF50" }}>
                            {company.symbol}
                          </span>
                          {")"}
                        </span>
                      </div>

                      {/* Two Input Boxes */}
                      <div className="d-flex flex-column flex-md-row justify-content-end align-items-center register-company-priority-quantity">
                        <input
                          type="number"
                          className="form-control"
                          name="quantity"
                          style={{
                            width: "97px",
                            marginBottom: "0",
                            background: "#3D3D4E",
                            color: "white",
                          }}
                          placeholder="Quantity"
                          value={props.formData.companies[index].quantity}
                          onChange={(e) =>
                            handleCompanyPriorityAndQuantity(e, company)
                          }
                        />
                        <input
                          type="number"
                          name="priority"
                          className="form-control"
                          style={{
                            width: "95px",
                            marginBottom: "0",
                            background: "#3D3D4E",
                            marginLeft: "5px",
                            color: "white",
                          }}
                          placeholder="Priority"
                          value={props.formData.companies[index].priority}
                          onChange={(e) =>
                            handleCompanyPriorityAndQuantity(e, company)
                          }
                        />
                        <MdDelete
                          size={40}
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            const updatedCompanies =
                              props.formData.companies.filter(
                                (c) => c._id !== company._id
                              );
                            props.setFormData({
                              ...props.formData,
                              companies: updatedCompanies,
                            });
                          }}
                        />
                      </div>
                    </div>
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
  const newPortals = [
    "The Economic Times",
    "The Tribune",
    "Hindustan Times",
    "Pulse by Zerodha",
    "The Indian Express",
    "Times of India",
    "LiveMint",
    "CNBC",
  ];
  const handleClick = (e, index) => {
    const newPortal = newPortals[index];
    if (!props.formData.newsPartners.includes(newPortal)) {
      props.setFormData({
        ...props.formData,
        newsPartners: [...props.formData.newsPartners, newPortal],
      });
    } else {
      const updatedNewsPartners = props.formData.newsPartners.filter(
        (np) => np !== newPortal
      );
      props.setFormData({
        ...props.formData,
        newsPartners: updatedNewsPartners,
      });
    }
  };
  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <div className="register-form-container">
            <Form>
              <h2 className="text-center mb-4 register-form-heading-color">
                Select Your News Partner
              </h2>
              <div className="register-news-partner-subheading">
                Select the news portals you trust with your investments:
              </div>

              <div className="register-news-partner-section">
                {newPortals.map((newPortal, index) => {
                  return (
                    <div
                      key={index}
                      className="regiser-news-partner-rectangle"
                      onClick={(e) => {
                        handleClick(e, index);
                      }}
                      style={{
                        backgroundColor: `${
                          props.formData.newsPartners.includes(
                            newPortals[index]
                          )
                            ? "#FF6666"
                            : "#3d3d4e"
                        }`,
                      }}
                    >
                      {newPortal}
                    </div>
                  );
                })}
              </div>

              <div className="d-flex justify-content-center">
                <Button
                  variant="secondary"
                  size="sm"
                  className="mx-2"
                  onClick={(e) => {
                    e.preventDefault();
                    props.setRegisterStep(2); // Go to the previous step
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

const AlertPreferencesForm = (props) => {
  const navigate = useNavigate();
  const alertTypes = ["By Email", "In App"];
  const alertFreq = ["Hourly", "Daily", "Weekly", "As Necessary"];
  const [loading, setLoading] = useState(false);

  const handleClick = (e, index, type) => {
    console.log(props.formData);
    if (type === "types") {
      const selectedType = alertTypes[index];
      const isSelected =
        props.formData.alertPreferences.types.includes(selectedType);

      if (!isSelected) {
        props.setFormData({
          ...props.formData,
          alertPreferences: {
            ...props.formData.alertPreferences,
            types: [...props.formData.alertPreferences.types, selectedType],
          },
        });
      } else {
        const updatedTypes = props.formData.alertPreferences.types.filter(
          (t) => t !== selectedType
        );
        props.setFormData({
          ...props.formData,
          alertPreferences: {
            ...props.formData.alertPreferences,
            types: updatedTypes,
          },
        });
      }
    } else {
      props.setFormData({
        ...props.formData,
        alertPreferences: {
          ...props.formData.alertPreferences,
          frequency: alertFreq[index],
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateRegistrationForm(props.formData);
    if (errors) {
      toast.error(errors);
      return;
    }
    setLoading(true);
    const token = Storage.getData("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await apiCall(
      "POST",
      "api/v1/auth/register",
      props.formData,
      headers
    );
    setLoading(false);
    console.log("response from handlesubmit", response);
    if (response.success) {
      Storage.removeData("stage");
      Storage.setData("token", response.data.token);
      navigate("/landing");
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <div className="register-form-container">
          <Form>
            <h2 className="text-center mb-4 register-form-heading-color">
              Alert Preferences
            </h2>

            <div
              className="register-alertpref-types"
              style={{ margin: "2rem" }}
            >
              <h3 className="register-alterpref-types-subheading">
                Alert Types
              </h3>
              <div className="register-alterpref-types-box">
                {alertTypes.map((type, index) => {
                  const [click, setClick] = useState(false);
                  return (
                    <div
                      key={index}
                      className="register-alertpref-type"
                      onClick={(e) => {
                        handleClick(e, index, "types");
                        setClick((prev) => !prev);
                      }}
                      style={{
                        background: `${
                          props.formData.alertPreferences.types.includes(
                            alertTypes[index]
                          )
                            ? "#FF6666"
                            : "#3D3D4E"
                        }`,
                      }}
                    >
                      {type}
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="register-alertpref-types"
              style={{ margin: "2rem" }}
            >
              <h3 className="register-alterpref-types-subheading">
                Alert Frequency
              </h3>
              <div className="register-alterpref-types-box">
                {alertFreq.map((freq, index) => {
                  return (
                    <div
                      key={index}
                      className="register-alertpref-type"
                      onClick={(e) => {
                        handleClick(e, index, "freq");
                      }}
                      style={{
                        background: `${
                          props.formData.alertPreferences.frequency ===
                          alertFreq[index]
                            ? "#FF6666"
                            : "#3D3D4E"
                        }`,
                      }}
                    >
                      {freq}
                    </div>
                  );
                })}
              </div>
            </div>
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
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </Form>
        </div>
      </Row>
    </Container>
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
      frequency: "",
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
            <>
              {registerStep === 3 ? (
                <SelectNewsPartnerForm
                  setRegisterStep={setRegisterStep}
                  formData={formData}
                  setFormData={setFormData}
                />
              ) : (
                <AlertPreferencesForm
                  setRegisterStep={setRegisterStep}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Register;
