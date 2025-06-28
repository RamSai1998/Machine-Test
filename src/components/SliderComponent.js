import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=400&fit=crop'
];

function SliderComponent() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="slider-container">
      <Carousel activeIndex={index} onSelect={handleSelect} indicators>
        {images.map((img, idx) => (
          <Carousel.Item key={idx}>
            <img
              src={img}
              className="d-block w-100"
              alt={`Slide ${idx}`}
              style={{ height: '300px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default SliderComponent;
