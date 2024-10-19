import Container from "react-bootstrap/Container";
import Hero from "../../components/hero/Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <Container fluid id="about" style={{ height: "50vh" }}>
        About
      </Container>
      <Container fluid id="news-partner" style={{ height: "50vh" }}>
        News Partner
      </Container>
      <Container fluid id="contact" style={{ height: "50vh" }}>
        Contact Us
      </Container>
    </>
  );
};

export default Home;
