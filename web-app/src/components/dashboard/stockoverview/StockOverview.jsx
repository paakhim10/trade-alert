import { useEffect, useState } from "react";
import "./StockOverview.css";
import { Container } from "react-bootstrap";
import Plot from "react-plotly.js";

const StockOverview = ({ user }) => {
  const [data, setData] = useState([
    {
      values: [450, 300, 200, 50],
      labels: ["Reliance", "Tata", "MDH", "Airtel"],
      type: "pie",
      hoverinfo: "label+percent",
      textinfo: "label+percent",
      textposition: "inside",
      marker: {
        colors: ["#636EFA", "#EF553B", "#00CC96", "#AB63FA"],
      },
    },
  ]);

  const layout = {
    title: {
      text: "Stocks Distribution",
      font: { size: 30, color: "#FFC0C0" },
    },
    plot_bgcolor: "rgba(0,0,0,0)", // Transparent plot area background
    paper_bgcolor: "rgba(0,0,0,0)",
    legend: {
      font: {
        color: "#FFC0C0", // Set legend label color to match the title color
      },
    },
    responsive: true,
  };
  useEffect(() => {
    setData([
      {
        values: user.user.companyStocks.map((stock) => stock.quantity),
        labels: user.user.companyStocks.map((stock) => stock.name),
        type: "pie",
        hoverinfo: "label+percent",
        textinfo: "label+percent",
        textposition: "inside",
        marker: {
          colors: [
            "#636EFA",
            "#EF553B",
            "#00CC96",
            "#AB63FA",
            "#FFA15A",
            "#19D3F3",
            "#FF6692",
            "#B6E880",
            "#FF97FF",
            "#FFC83D",
            "#FF83FA",
          ],
        },
      },
    ]);
  }, []);
  return (
    <>
      <Container fluid className="dashboard-stockoverview-section">
        <Container fluid className="dashboard-stockoverview-heading">
          <h2>Dashboard</h2>
        </Container>
        <Container fluid className="dashboard-stockoverview-content">
          <Container fluid className="dashboard-stockoverview-left-section">
            <div className="dashboard-stockoverview-upper-half">
              <h3>Calculated Investment Value</h3>
              <em>₹ 500</em>
            </div>
            <div className="dashboard-stockoverview-lower-half">
              Your Companies
            </div>
          </Container>
          <Container fluid className="dashboard-stockoverview-right-section">
            <Plot data={data} layout={layout} className="pie-chart" />
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default StockOverview;
