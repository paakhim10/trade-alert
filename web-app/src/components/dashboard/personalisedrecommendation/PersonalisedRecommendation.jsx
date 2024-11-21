import "./PersonalisedRecommendation.css";
import { Carousel, Card, Container, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";

const PersonalisedRecommendation = () => {
  const items = [
    {
      heading:
        "Sensex, Nifty end choppy trade on flat notes weighed by weak earnings and foreign outflows",
      content:
        "Indian blue-chip equity indices closed flat on Monday after fluctuating between gains and losses, as concerns over weak earnings and sustained foreign outflows continued to weigh on domestic equities.",
      company: "Google",
    },
    {
      heading:
        "Sensex, Nifty end choppy trade on flat notes weighed by weak earnings and foreign outflows",
      content:
        "Indian blue-chip equity indices closed flat on Monday after fluctuating between gains and losses, as concerns over weak earnings and sustained foreign outflows continued to weigh on domestic equities.",
      company: "Google",
    },
    {
      heading:
        "Sensex, Nifty end choppy trade on flat notes weighed by weak earnings and foreign outflows",
      content:
        "Indian blue-chip equity indices closed flat on Monday after fluctuating between gains and losses, as concerns over weak earnings and sustained foreign outflows continued to weigh on domestic equities.",
      company: "Google",
    },
    {
      heading:
        "Sensex, Nifty end choppy trade on flat notes weighed by weak earnings and foreign outflows",
      content:
        "Indian blue-chip equity indices closed flat on Monday after fluctuating between gains and losses, as concerns over weak earnings and sustained foreign outflows continued to weigh on domestic equities.",
      company: "Google",
    },
  ];

  const [itemsPerGroup, setItemsPerGroup] = useState(2);

  // Update itemsPerGroup based on screen size
  useEffect(() => {
    const handleResize = () => {
      setItemsPerGroup(window.innerWidth < 768 ? 1 : 2);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="personal-recommendation-heading">
        <h2>Personalised Recommendations</h2>
      </div>
      <Container className="custom-carousel-container">
        <Carousel interval={3000} indicators={false}>
          {Array.from({ length: Math.ceil(items.length / itemsPerGroup) }).map(
            (_, groupIndex) => (
              <Carousel.Item key={groupIndex}>
                <div className="d-flex justify-content-center flex-wrap">
                  {items
                    .slice(
                      groupIndex * itemsPerGroup,
                      groupIndex * itemsPerGroup + itemsPerGroup
                    )
                    .map((item, index) => (
                      <Card className="news-card" key={index}>
                        <Card.Body>
                          <Card.Title className="news-card-title">
                            {item.heading}
                          </Card.Title>
                          <div className="news-card-tags">
                            <Badge pill className="news-card-badge-green">
                              {item.company}
                            </Badge>
                            <Badge pill className="news-card-badge-green">
                              Link
                            </Badge>
                          </div>
                          <Card.Text className="news-card-description">
                            {item.content}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                </div>
              </Carousel.Item>
            )
          )}
        </Carousel>
      </Container>
    </>
  );
};

export default PersonalisedRecommendation;
