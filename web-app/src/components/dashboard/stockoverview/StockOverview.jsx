import { useEffect, useState } from "react";
import "./StockOverview.css";
import { Container } from "react-bootstrap";
import Plot from "react-plotly.js";

const StockOverview = ({ user }) => {
  const stockPrices = {
    Reliance: 2450,
    TCS: 780,
    Infosys: 1450,
    HDFC_Bank: 1610,
    Airtel: 900,
  };

  const [data, setData] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0);

  useEffect(() => {
    const userStocks = [
      { name: "Reliance", quantity: 10 },
      { name: "TCS", quantity: 15 },
      { name: "Infosys", quantity: 8 },
      { name: "HDFC_Bank", quantity: 12 },
      { name: "Airtel", quantity: 10 },
    ];

    // Calculate total investment dynamically
    const total = userStocks.reduce(
      (sum, stock) => sum + stock.quantity * stockPrices[stock.name],
      0
    );

    // Prepare data for the pie chart
    setData([
      {
        values: userStocks.map((stock) => stock.quantity),
        labels: userStocks.map((stock) => stock.name),
        type: "pie",
        hoverinfo: "label+percent",
        textinfo: "label+percent",
        textposition: "inside",
        marker: {
          colors: ["#636EFA", "#EF553B", "#00CC96", "#AB63FA", "#FFA15A"],
        },
      },
    ]);
    setTotalInvestment(total);
  }, []);

  const layout = {
    title: {
      text: "Stocks Distribution",
      font: { size: 30, color: "#FFC0C0" },
    },
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
    legend: {
      font: {
        color: "#FFC0C0",
      },
    },
    responsive: true,
  };

  return (
    <Container fluid className="dashboard-stockoverview-section">
      <Container fluid className="dashboard-stockoverview-heading">
        <h2>Dashboard</h2>
      </Container>
      <Container fluid className="dashboard-stockoverview-content">
        <Container fluid className="dashboard-stockoverview-left-section">
          <div className="dashboard-stockoverview-upper-half">
            <h3>Calculated Investment Value</h3>
            <em>₹ {totalInvestment.toLocaleString()}</em>
          </div>
          <div className="dashboard-stockoverview-lower-half">
            View your portfolio interactively.
          </div>
        </Container>
        <Container fluid className="dashboard-stockoverview-right-section">
          <Plot data={data} layout={layout} className="pie-chart" />
        </Container>
      </Container>
    </Container>
  );
};

export default StockOverview;
