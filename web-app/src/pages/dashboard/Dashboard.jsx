import Dashboardhero from "../../components/dashboard/dashboardhero/Dashboardhero";
import Contact from "../../components/common/contactUs/Contact";
import StockOverview from "../../components/dashboard/stockoverview/StockOverview";
import MarketTrend from "../../components/dashboard/markettrend/MarketTrend";
import InvestmentGlance from "../../components/dashboard/investmentglance/InvestmentGlance";
import PersonalisedRecommendation from "../../components/dashboard/personalisedrecommendation/PersonalisedRecommendation";
import { useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "../../config/firebase";
import { toast } from "react-toastify";
import apiCall from "../../utils/axiosInstance";
import Storage from "../../utils/storage";

const Dashboard = () => {
  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const vapidKey = import.meta.env.VITE_VAPID_KEY;
        if (!vapidKey) {
          console.error("VAPID key is not defined in the environment file.");
          return;
        }
        const notificationToken = await getToken(messaging, { vapidKey });
        if (notificationToken) {
          console.log("Notification Token:", notificationToken);
          const token = Storage.getData("token");
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await apiCall(
            "POST",
            "api/v1/user/saveNotificationToken",
            { notificationToken },
            headers
          );
          if (response.success) {
            console.log("Notification token saved successfully.");
          } else {
            console.error("Failed to save notification token.");
          }
        } else {
          console.error("Failed to retrieve notification token.");
        }
      } else {
        toast.error(
          "Please allow notification permission to get notified about stock updates."
        );
      }
    } catch (err) {
      console.error("Error in requesting notification permission:", err);
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <>
      <Dashboardhero />
      <PersonalisedRecommendation />
      <StockOverview />
      <MarketTrend />
      <InvestmentGlance />
      <Contact />
    </>
  );
};

export default Dashboard;
