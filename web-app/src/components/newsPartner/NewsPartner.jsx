import { Container, Row, Col } from "react-bootstrap";
import "./NewsPartner.css";
import newsPartnerData from "../../assets/data/newsPartnerData";

const NewsPartner = () => {
  return (
    <Container fluid className="news-partner-section" id="news-partner">
      {/* Upper Section */}
      <Container fluid className="news-partner-upper-section d-flex">
        <Container fluid className="d-flex flex-column flex-md-row">
          <div className="news-partner-upper-left-container text-center text-md-left col-12 col-md-6">
            <div className="news-partner-upper-left-heading">
              <h2>Our News Partner</h2>
            </div>
          </div>
          <div className="news-partner-upper-right-container col-12 col-md-6">
            <div className="text-center text-md-left">
              We partner with trusted news sources to deliver timely, relevant
              updates. From major financial networks to specialized outlets, our
              partners ensure you stay informed with comprehensive market news.
            </div>
          </div>
        </Container>
      </Container>

      {/* Lower Section */}
      <Container className="news-partner-lower-section d-flex justify-content-center align-content-center">
        <Row className="w-100 justify-content-center">
          {newsPartnerData.map((newsPartner) => (
            <Col
              key={newsPartner.id}
              xs={6} // 2 logos per row on small screens
              md={3} // 4 logos per row on medium and larger screens
              className="d-flex justify-content-center align-items-center"
            >
              <div className="news-partner-logo-container">
                <img
                  src={newsPartner.path}
                  alt={newsPartner.alt}
                  title={newsPartner.title}
                  className="news-partner-logo"
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default NewsPartner;
