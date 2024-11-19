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
import PrivateUserRoute from "./routes/PrivateUserRoutes";
import PrivateRegisterRoute from "./routes/PrivateRegisterRoute";

const App = () => {
  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route element={<PrivateUserRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route element={<PrivateRegisterRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
