import Container from "react-bootstrap/Container";
import "./Hero.css";
import heroImage from "../../assets/images/hero.svg";

const Hero = () => {
  return (
    <Container
      fluid
      id="hero-section"
      className="d-flex flex-column-reverse flex-md-row hero-section"
      style={{ minHeight: "70vh" }}
    >
      <Container className="hero-left-section d-flex justify-content-center align-content-center flex-column">
        <div className="hero-upper-section mb-3">
          <h1>Stay Ahead of the Market with Real Time Alerts</h1>
        </div>
        <div className="hero-lower-section">
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
              className="btn rounded hero-left-lower-section-button"
              style={{ width: "120px" }}
            >
              Sign Up!
            </button>
          </div>
        </div>
      </Container>
      <Container className="hero-right-section">
        <img src={heroImage} alt="Hero Image" className="w-100 h-100" />
      </Container>
    </Container>
  );
};

export default Hero;
