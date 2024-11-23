import { Container } from "react-bootstrap";
import "./dashboardhero.css";

const Dashboardhero = ({ user }) => {
  return (
    <Container
      fluid
      id="dashboard-hero-section"
      className="d-flex flex-column-reverse flex-md-row dashboard-hero-section"
      style={{ minHeight: "70vh" }}
    >
      <Container className="dashboard-hero-left-section d-flex justify-content-center align-content-center flex-column">
        <div className="dashboard-hero-upper-section mb-3">
          <h2>Welcome {user.user.name}</h2>
        </div>
        <div className="dashboard-hero-lower-section">
          <ul className="list-unstyled">
            <li>
              Get <span className="text-color-primary">real-time alerts</span>{" "}
              on news that impacts your stocks.
            </li>
            <li>Monitor the market and track your portfolio.</li>
            <li>
              Stay ahead with the latest updates from trusted news sources—
              <span className="text-color-primary">all in one place.</span>
            </li>
          </ul>
          <div className="row text-start">
            <button
              className="btn rounded dashboard-hero-left-lower-section-button"
              //   style={{ width: "120px" }}
            >
              Go to your feed
            </button>
          </div>
        </div>
      </Container>
      <Container className="dashboard-hero-right-section">
        <img
          src="/assets/images/hero.svg"
          alt="Hero Image"
          className="w-100 h-100"
        />
      </Container>
    </Container>
  );
};

export default Dashboardhero;
