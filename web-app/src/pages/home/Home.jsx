import Hero from "../../components/hero/Hero";
import About from "../../components/about/About";
import NewsPartner from "../../components/newsPartner/NewsPartner";
import Contact from "../../components/common/contactUs/Contact";
import { useEffect } from "react";
import Storage from "../../utils/storage";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Storage.getData("token");
    const stage = Storage.getData("stage");
    if (token && !stage) navigate("/dashboard");
  }, []);
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
