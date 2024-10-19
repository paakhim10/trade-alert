import Container from "react-bootstrap/Container";
import Hero from "../../components/hero/Hero";
import About from "../../components/about/About";
import NewsPartner from "../../components/newsPartner/NewsPartner";
import Contact from "../../components/contactUs/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <NewsPartner />
      <Contact />
    </>
  );
};

export default Home;
