import { Carousel, Container } from 'react-bootstrap';


export default function HighlightsCarousel() {
  return (
    <Container className="highlights-container my-5">
      <Carousel>
        {/* Mission Slide */}
        <Carousel.Item>
          <div className="d-flex justify-content-center">
            <div className="cardHighlight p-3">
              <h2 className="highlights-title text-center">Mission</h2>
              <p>
                At Streetwear Hub, our mission is to deliver the latest in streetwear fashion to those who want to express themselves through style...
              </p>
            </div>
          </div>
        </Carousel.Item>

        {/* Vision Slide */}
        <Carousel.Item>
          <div className="d-flex justify-content-center">
            <div className="cardHighlight p-3">
              <h2 className="highlights-title text-center">Vision</h2>
              <p>
                To become the go-to destination for streetwear enthusiasts, creating a vibrant community where style meets culture...
              </p>
            </div>
          </div>
        </Carousel.Item>

        {/* CSR Slide */}
        <Carousel.Item>
          <div className="d-flex justify-content-center">
            <div className="cardHighlight p-3">
              <h2 className="highlights-title text-center">Corporate Social Responsibility (CSR)</h2>
              <p>
                At Streetwear Hub, we believe in the power of fashion to create positive change, not just through style...
              </p>
            </div>
          </div>
        </Carousel.Item>

        {/* Goals Slide */}
        <Carousel.Item>
          <div className="d-flex justify-content-center">
            <div className="cardHighlight p-3">
              <h2 className="highlights-title text-center">Goals</h2>
              <ol>
                <li>📌<strong>Provide Trendy and Authentic Streetwear:</strong> Curate a collection of authentic and trendy streetwear pieces...</li>
                <li>📌<strong>Customer-Centered Shopping Experience:</strong> Create a user-friendly platform...</li>
                <li>📌<strong>Build a Strong Community:</strong> Engage with customers...</li>
                <li>📌<strong>Sustainable Growth:</strong> Expand product offerings globally...</li>
              </ol>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
