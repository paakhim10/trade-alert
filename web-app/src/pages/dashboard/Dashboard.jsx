import Dashboardhero from "../../components/dashboard/dashboardhero/Dashboardhero";
import Contact from "../../components/common/contactUs/Contact";
import StockOverview from "../../components/dashboard/stockoverview/StockOverview";
import MarketTrend from "../../components/dashboard/markettrend/MarketTrend";
import InvestmentGlance from "../../components/dashboard/investmentglance/InvestmentGlance";
import PersonalisedRecommendation from "../../components/dashboard/personalisedrecommendation/PersonalisedRecommendation";

const Dashboard = () => {
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
