import { useEffect, useState } from "react";
import "./InvestmentGlance.css";
import { Container, Table } from "react-bootstrap";

const InvestmentGlance = () => {
  const [items, setItems] = useState([]);

  // Hardcoded stock data
  const stockData = [
    { name: "Reliance", quantity: 10 },
    { name: "TCS", quantity: 15 },
    { name: "Infosys", quantity: 8 },
    { name: "HDFC_Bank", quantity: 12 },
    { name: "Airtel", quantity: 10 },
  ];

  const stockPrices = {
    Reliance: 2450,
    TCS: 780,
    Infosys: 1450,
    HDFC_Bank: 1610,
    Airtel: 900,
  };

  const stockTrends = {
    Reliance: "Up",
    TCS: "Down",
    Infosys: "Up",
    HDFC_Bank: "Down",
    Airtel: "Up",
  };

  useEffect(() => {
    const investments = stockData.map((stock) => ({
      company: stock.name,
      quantity: stock.quantity,
      currentStockPrice: stockPrices[stock.name],
      trend: stockTrends[stock.name],
    }));
    setItems(investments);
  }, []);

  return (
    <>
      <Container className="investment-glance-section">
        <div className="investmentglance-heading">
          <h2>Your Investments at a Glance</h2>
        </div>
        <div className="investmentglance-table">
          <Table hover responsive className="investmentglance-table-bootstrap">
            <thead>
              <tr>
                <th>Company</th>
                <th>Quantity</th>
                <th>Current Stock Price (INR)</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.company}</td>
                  <td>{item.quantity}</td>
                  <td>{item.currentStockPrice}</td>
                  <td>{item.trend}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default InvestmentGlance;
