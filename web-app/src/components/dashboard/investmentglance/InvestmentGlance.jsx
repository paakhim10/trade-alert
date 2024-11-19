import "./InvestmentGlance.css";
import { Container, Table } from "react-bootstrap";

const InvestmentGlance = () => {
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
                <th>Current Stock Price</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample Data Row */}
              <tr>
                <td>Company A</td>
                <td>100</td>
                <td>$150</td>
                <td>Up</td>
              </tr>
              <tr>
                <td>Company A</td>
                <td>100</td>
                <td>$150</td>
                <td>Up</td>
              </tr>
              <tr>
                <td>Company A</td>
                <td>100</td>
                <td>$150</td>
                <td>Up</td>
              </tr>
              {/* Add more rows here as needed */}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default InvestmentGlance;
