// ZoomableImage.jsx
import React, { useState } from 'react';
import './zoomableImage.css';

const ZoomableImage = ({ src, alt }) => {
  const [isZoomed, setZoomed] = useState(false);

  const handleZoomToggle = () => {
    setZoomed(!isZoomed);
  };

  return (
    <div
      className={`zoomable-image-container ${isZoomed ? 'zoomed' : ''}`}
      onClick={handleZoomToggle}
    >
      <img src={src} alt={alt} />
    </div>
  );
};

export default ZoomableImage;
