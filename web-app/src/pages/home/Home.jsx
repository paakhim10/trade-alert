import Container from "react-bootstrap/Container";
import Hero from "../../components/hero/Hero";
import About from "../../components/about/About";
import NewsPartner from "../../components/newsPartner/NewsPartner";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <NewsPartner />
      <Container fluid id="contact" style={{ height: "50vh" }}>
        Contact Us
      </Container>
    </>
  );
};

export default Home;
