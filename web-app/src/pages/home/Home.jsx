import Container from "react-bootstrap/Container";
import Hero from "../../components/hero/Hero";
import About from "../../components/about/About";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
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
