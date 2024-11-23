import React, { useState, useEffect } from "react";
import {
  DropdownButton,
  Dropdown,
  Card,
  Container,
  Spinner,
} from "react-bootstrap";
import Plot from "react-plotly.js";
import "./MarketTrend.css";

const MarketTrend = () => {
  const [selectedStocks, setSelectedStocks] = useState(["Reliance"]); // Default selection
  const [stockData, setStockData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Current stock prices
  const stockPrices = {
    Reliance: 2450,
    TCS: 780,
    Infosys: 1450,
    HDFC_Bank: 1610,
    Airtel: 900,
  };

  const allStocks = Object.keys(stockPrices); // Available stocks based on the current stockPrices

  // Simulated stock data fetching (Dummy data for the past 5 days)
  const fetchStockData = async () => {
    const mockData = {};

    allStocks.forEach((stock) => {
      // Generate dummy data for 5 days by fluctuating the base price by ±3%
      const basePrice = stockPrices[stock];
      const priceFluctuations = Array.from({ length: 5 }, (_, i) => {
        const fluctuation = Math.random() * 0.06 * basePrice - 0.03 * basePrice; // ±3% fluctuation
        return parseFloat((basePrice + fluctuation).toFixed(2)); // Adjusted price for each day
      });
      mockData[stock] = priceFluctuations;
    });

    setTimeout(() => {
      setStockData(mockData);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const handleStockChange = (stock) => {
    if (stock === "ALL") {
      setSelectedStocks(allStocks); // Select all companies
    } else {
      setSelectedStocks([stock]); // Select only the chosen company
    }
  };

  // Prepare plot data for selected stocks
  const plotData = selectedStocks.map((stock) => ({
    x: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    y: stockData[stock] || [],
    type: "scatter",
    mode: "lines+markers",
    name: stock,
  }));

  const layout = {
    title: `Stock Prices: ${selectedStocks.join(", ")}`,
    xaxis: { title: "Days", showgrid: true },
    yaxis: { title: "Price (INR)", showgrid: true },
    plot_bgcolor: "#E5E5E5",
    paper_bgcolor: "#E5E5E5",
    autosize: true,
    responsive: true,
  };

  return (
    <Container className="market-trend-box">
      <Card.Body>
        <Container className="market-trend-section">
          <h3 className="market-trend-heading">Market Trends</h3>
          <div className="dropdown-container">
            <DropdownButton
              title="Select Stocks"
              className="multi-select-dropdown"
            >
              <Dropdown.Item
                onClick={() => handleStockChange("ALL")}
                active={selectedStocks.length === allStocks.length}
              >
                All Companies
              </Dropdown.Item>
              {allStocks.map((stock) => (
                <Dropdown.Item
                  key={stock}
                  onClick={() => handleStockChange(stock)}
                  active={
                    selectedStocks.includes(stock) &&
                    selectedStocks.length === 1
                  }
                >
                  {stock}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        </Container>

        <div className="chart-container">
          {isLoading ? (
            <div className="loading-container">
              <Spinner animation="border" />
              <p>Loading chart...</p>
            </div>
          ) : (
            <Plot
              data={plotData}
              layout={layout}
              className="market-trend-stock-chart"
            />
          )}
        </div>
      </Card.Body>
    </Container>
  );
};

export default MarketTrend;
