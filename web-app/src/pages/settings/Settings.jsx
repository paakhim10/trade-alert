import "./Settings.css";
import { Container, Form, ListGroup, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import apiCall from "../../utils/axiosInstance";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Storage from "../../utils/storage";

const Settings = () => {
  const [user, setUser] = useState({
    email: "21103004@mail.jiit.ac.in",
    name: "Harsh College",
    phone: "8383936346",
    companyStocks: [
      {
        _id: 1,
        name: "Reliance Chemotex Industries Ltd",
        quantity: 10,
        priority: 8,
      },
    ],
    userPreferences: {
      news_partners: ["Times of India", "The Hindu"],
      alert_preference: {
        alertTypes: ["Push"],
        alertFrequency: "Daily",
      },
    },
  });

  useEffect(() => {
    console.log(Storage.getData("userInfo").user);
    setUser(Storage.getData("userInfo").user);
  }, []);

  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCompanyInputChange = async (e) => {
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
    if (!user.companyStocks.some((c) => c._id === company._id)) {
      setUser({
        ...user,
        companyStocks: [...user.companyStocks, company],
      });
    } else {
      toast.error("Company already added");
    }

    setQuery(""); // Clear the input field after selection
    setCompanySuggestions([]); // Clear suggestions
  };

  const handleCompanyPriorityAndQuantity = (e, company) => {
    console.log("Company:", company);
    console.log("Event:", e.target.name, " ", e.target.value);
    const updatedCompanies = user.companyStocks.map((c) => {
      if (c._id === company._id) {
        return {
          ...c,
          [e.target.name]: e.target.value,
        };
      }
      return c;
    });
    if (
      e.target.name === "priority" &&
      (e.target.value < 0 || e.target.value > 10)
    ) {
      toast.error("Priority should be between 0 and 10");
      return;
    }
    setUser({
      ...user,
      companyStocks: updatedCompanies,
    });
  };

  const alertTypes = ["By Email", "In App"];
  const alertFreq = ["Hourly", "Daily", "Weekly", "As Necessary"];
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

  return (
    <>
      <Container className="settingspage">
        <Container className="settingspage-userdetails">
          <Container className="settingspage-header">
            <h2>Edit your Details</h2>
          </Container>
          <Container className="settingspage-form">
            <Form>
              <Form.Group className="settingspage-form-group">
                <Form.Control
                  type="text"
                  placeholder={"Full Name"}
                  value={user.name}
                  name="name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="settingspage-form-group">
                <Form.Control
                  type="number"
                  placeholder={"Phone Number"}
                  value={user.phone}
                  name="phone"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 settingspage-form-group">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={user.email}
                  disabled
                />
              </Form.Group>
            </Form>
          </Container>
        </Container>

        <Container className="settingspage-companydetails">
          <Container className="settingspage-header">
            <h2>Edit your Portfolio</h2>
          </Container>
          <Container className="settingspage-form">
            <Form>
              <Form.Group
                controlId="formBasicCompanyName"
                className="company-dropdown"
              >
                <Form.Control
                  type="text"
                  placeholder="Select the companies in your portfolio"
                  value={query}
                  onChange={handleCompanyInputChange}
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
                {user.companyStocks.map((company, index) => (
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
                      <div className="d-flex flex-column flex-md-row align-items-start">
                        <span>{company.name}</span>
                      </div>

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
                          value={user.companyStocks[index].quantity}
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
                          value={user.companyStocks[index].priority}
                          onChange={(e) =>
                            handleCompanyPriorityAndQuantity(e, company)
                          }
                        />
                        <MdDelete
                          size={40}
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            const updatedCompanies = user.companyStocks.filter(
                              (c) => c._id !== company._id
                            );
                            setUser({
                              ...user,
                              companyStocks: updatedCompanies,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Form>
          </Container>
        </Container>

        <Container className="settingspage-alertpreferences">
          <Container className="settingspage-header">
            <h2>Edit your Alert Preferences</h2>
          </Container>
          <Container className="settingspage-form">
            <div
              className="register-alertpref-types"
              style={{ margin: "2rem" }}
            >
              <h3 className="register-alterpref-types-subheading">
                Alert Types
              </h3>
              <div className="register-alterpref-types-box">
                {alertTypes.map((type, index) => {
                  return (
                    <div
                      key={index}
                      className="register-alertpref-type"
                      onClick={(e) => {
                        setUser({
                          ...user,
                          userPreferences: {
                            ...user.userPreferences,
                            alert_preference: {
                              ...user.userPreferences.alert_preference,
                              alertTypes:
                                user.userPreferences.alert_preference.alertTypes.includes(
                                  alertTypes[index] == "By Email"
                                    ? "Email"
                                    : "Push"
                                )
                                  ? user.userPreferences.alert_preference.alertTypes.filter(
                                      (type) =>
                                        type !==
                                        (alertTypes[index] == "By Email"
                                          ? "Email"
                                          : "Push")
                                    )
                                  : [
                                      ...user.userPreferences.alert_preference
                                        .alertTypes,
                                      alertTypes[index] == "By Email"
                                        ? "Email"
                                        : "Push",
                                    ],
                            },
                          },
                        });
                      }}
                      style={{
                        background: `${
                          user.userPreferences.alert_preference.alertTypes.includes(
                            alertTypes[index] == "By Email" ? "Email" : "Push"
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
                        setUser({
                          ...user,
                          userPreferences: {
                            ...user.userPreferences,
                            alert_preference: {
                              ...user.userPreferences.alert_preference,
                              alertFrequency: alertFreq[index],
                            },
                          },
                        });
                      }}
                      style={{
                        background: `${
                          user.userPreferences.alert_preference
                            .alertFrequency === alertFreq[index]
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
          </Container>
        </Container>

        <Container className="settingspage-newspartner">
          <Container className="settingspage-header">
            <h2>Edit preferred News Partners</h2>
          </Container>
          <Container className="settingspage-form">
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
                      const newPortal = newPortals[index];
                      if (
                        !user.userPreferences.news_partners.includes(newPortal)
                      ) {
                        setUser({
                          ...user,
                          userPreferences: {
                            ...user.userPreferences,
                            news_partners: [
                              ...user.userPreferences.news_partners,
                              newPortal,
                            ],
                          },
                        });
                      } else {
                        const updatedNewsPartners =
                          user.userPreferences.news_partners.filter(
                            (np) => np !== newPortal
                          );
                        setUser({
                          ...user,
                          userPreferences: {
                            ...user.userPreferences,
                            news_partners: updatedNewsPartners,
                          },
                        });
                      }
                    }}
                    style={{
                      backgroundColor: `${
                        user.userPreferences.news_partners.includes(
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
          </Container>
        </Container>

        <Container className="settingspage-save">
          <button>Save Settings</button>
        </Container>
      </Container>
    </>
  );
};

export default Settings;
