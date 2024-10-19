import { Container } from "react-bootstrap";
import "./Contact.css";

const Contact = () => {
  return (
    <Container fluid className="contact-us-section" id="contact">
      <Container fluid className="contact-us-upper-section d-flex">
        <Container fluid className="d-flex flex-column flex-md-row">
          <div className="contact-us-upper-left-container text-center text-md-left col-12 col-md-6">
            <div className="contact-us-upper-left-heading">
              <h2>Contact Us</h2>
            </div>
          </div>
          <div className="contact-us-upper-right-container col-12 col-md-6">
            <div className="text-center text-md-left">
              We are here to help! Please reach out to us with any questions or
              concerns.
            </div>
          </div>
        </Container>
      </Container>
      <Container className="contact-us-lower-section d-flex flex-column justify-content-between align-items-center p-4">
        <div className="left-section align-self-start">
          <h2 className="red-alert-heading">Trade Alert</h2>
        </div>
        <div className="right-section">
          <form className="contact-form d-flex flex-column">
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group mb-3">
              <textarea
                className="form-control"
                id="message"
                rows="4"
                placeholder="Let us know what you think"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary align-self-end">
              Submit!
            </button>
          </form>
        </div>
      </Container>
    </Container>
  );
};

export default Contact;
