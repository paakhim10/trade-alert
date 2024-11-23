import "./PersonalisedRecommendation.css";
import { Carousel, Card, Container, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";

const PersonalisedRecommendation = ({ user }) => {
  const [items, setItems] = useState([]);

  const [itemsPerGroup, setItemsPerGroup] = useState(2);

  // Update itemsPerGroup based on screen size
  useEffect(() => {
    const handleResize = () => {
      setItemsPerGroup(window.innerWidth < 768 ? 1 : 2);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    const notifications = user.userNotification.map((notification) => {
      return {
        heading: notification.title,
        content: notification.content,
        link: notification.link,
      };
    });
    setItems(notifications);
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
                            {/* <Badge pill className="news-card-badge-green">
                              {item.company}
                            </Badge> */}
                            <a href={item.link}>
                              <Badge pill className="news-card-badge-green">
                                Link
                              </Badge>
                            </a>
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
