import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";
import Auth from "./pages/auth/Auth";
import Settings from "./pages/settings/Settings";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

const App = () => {
  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
