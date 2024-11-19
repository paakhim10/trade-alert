import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown, Card, Container } from "react-bootstrap"; // React-Bootstrap components
import Plot from "react-plotly.js"; // Plotly component for the graph
import "./MarketTrend.css"; // CSS file for styling

const MarketTrend = () => {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [stockData, setStockData] = useState(null);

  // Simulate fetching stock data
  const fetchStockData = (stock) => {
    const mockData = {
      AAPL: [150, 152, 155, 158, 160],
      GOOGL: [2800, 2850, 2900, 2950, 3000],
      AMZN: [3400, 3450, 3500, 3550, 3600],
    };

    // Simulate a delay for data fetching
    setTimeout(() => {
      setStockData(mockData[stock]);
    }, 1000);
  };

  // Handle stock selection
  const handleStockChange = (stock) => {
    setSelectedStock(stock);
    fetchStockData(stock);
  };

  useEffect(() => {
    fetchStockData("AAPL");
  }, []);

  // Plotly graph data
  const plotData = [
    {
      x: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"], // X-axis labels
      y: stockData || [], // Y-axis data
      type: "scatter",
      mode: "lines+markers", // Graph style: line with markers
      marker: { color: "rgba(75, 192, 192, 1)" },
      name: selectedStock,
    },
  ];

  const layout = {
    title: `${selectedStock} Stock Price`,
    xaxis: {
      title: "Days",
      showgrid: true,
    },
    yaxis: {
      title: "Price (USD)",
      showgrid: true,
    },
    plot_bgcolor: "#E5E5E5", // Transparent plot area background
    paper_bgcolor: "#E5E5E5",
    autosize: true, // Ensures the graph resizes dynamically
    responsive: true, // Ensures the chart resizes based on its container
  };

  return (
    <Container className="market-trend-box">
      <Card.Body>
        <Container className="market-trend-section">
          <h3 className="market-trend-heading">Market Trends</h3>
          <div className="dropdown-container">
            <DropdownButton
              title={`Select Stock: ${selectedStock}`}
              onSelect={handleStockChange}
            >
              <Dropdown.Item eventKey="AAPL">AAPL</Dropdown.Item>
              <Dropdown.Item eventKey="GOOGL">GOOGL</Dropdown.Item>
              <Dropdown.Item eventKey="AMZN">AMZN</Dropdown.Item>
            </DropdownButton>
          </div>
        </Container>

        <div className="chart-container">
          {stockData ? (
            <Plot
              data={plotData}
              layout={layout}
              className="market-trend-stock-chart"
            />
          ) : (
            <div>Loading chart...</div>
          )}
        </div>
      </Card.Body>
    </Container>
  );
};

export default MarketTrend;
