import { Container, Row, Col } from "react-bootstrap";
import "./About.css";

const About = () => {
  return (
    <Container fluid className="about-section" id="about">
      {/* Upper Section */}
      <Container fluid className="about-upper-section d-flex">
        <Container fluid className="d-flex flex-column flex-md-row">
          <div className="about-upper-left-container text-center text-md-left col-12 col-md-6">
            <div className="about-upper-left-heading">
              <h2>About Us</h2>
            </div>
          </div>
          <div className="about-upper-right-container col-12 col-md-6">
            <div className="text-center text-md-left">
              At Trade Alert, we are dedicated to helping investors stay
              informed with real-time news that can impact their portfolios. By
              monitoring trusted news sources and delivering instant alerts, we
              provide the tools you need to make timely, informed investment
              decisions.
            </div>
          </div>
        </Container>
      </Container>

      {/* Lower Section */}
      <Container className="about-lower-section d-flex justify-content-center align-conten-center">
        <div className="about-lower-section-row">
          <Col xs={12} md={6} className="my-3 about-feature-container">
            <h4>Real-Time Stock News Alerts </h4>
            <p>
              Receive immediate notifications when critical news that could
              affect your stocks is detected, so you never miss an important
              update.
            </p>
          </Col>
          <Col xs={12} md={6} className="my-3 about-feature-container">
            <h4>Customisable News Sources</h4>
            <p>
              Select from a range of trusted news portals to ensure you get
              alerts from sources you trust most.
            </p>
          </Col>
          <Col xs={12} md={6} className="my-3 about-feature-container">
            <h4>Company-Specific Results</h4>
            <p>
              Choose specific companies you're invested in to get focused news
              and market updates that align with your portfolio.
            </p>
          </Col>
          <Col xs={12} md={6} className="my-3 about-feature-container">
            <h4>Trending Market Insights</h4>
            <p>
              Stay on top of trending stocks and news that are shaping the
              market, with curated content just for you.
            </p>
          </Col>
          <Col xs={12} md={6} className="my-3 about-feature-container">
            <h4>Portfolio Tracking</h4>
            <p>
              Visualize your portfolio performance in real-time, with
              easy-to-read charts that show how your investments are performing.
            </p>
          </Col>
          <Col xs={12} md={6} className="my-3 about-feature-container">
            <h4>Personalized Interactive Dashboard</h4>
            <p>
              View a detailed dashboard that includes trending stocks, stock
              price changes, and overall market movements, all in one place.
            </p>
          </Col>
        </div>
      </Container>
    </Container>
  );
};

export default About;
