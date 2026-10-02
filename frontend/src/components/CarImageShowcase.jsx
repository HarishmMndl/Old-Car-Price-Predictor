import React, { useState } from 'react';
import {
  Camera,
  Sparkles,
  CheckCircle2,
  Car
} from 'lucide-react';

export default function CarImageShowcase({
  formData,
  carImages = [],
  loadingImages = false
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const displayImages = Array.isArray(carImages) ? carImages.filter(Boolean) : [];
  const currentImage = displayImages[activeImageIndex] || displayImages[0] || null;
  const calculatedYear = new Date().getFullYear() - Number(formData.vehicle_age || 0);

  return (
    <div className="car-image-showcase-container" id="car-image-showcase">
      <div className="showcase-card">
        {/* TOP BAR */}
        <div className="showcase-topbar">
          <div className="showcase-badge-group">
            <span className="showcase-live-pill">
              <Camera size={13} />
              <span>Vehicle Visualizer</span>
            </span>
            <span className="showcase-car-title">
              {formData.brand} {formData.model} ({calculatedYear})
            </span>
          </div>

          <div className="showcase-sync-indicator">
            {loadingImages && (
              <span className="showcase-sync-pill loading">
                <Sparkles size={12} className="spin-icon text-cyan" />
                <span>Fetching API Visual...</span>
              </span>
            )}
          </div>
        </div>

        {/* MAIN IMAGE DISPLAY AREA */}
        <div className="showcase-image-frame">
          {currentImage ? (
            <img
              src={currentImage}
              alt={`${formData.brand} ${formData.model}`}
              className="showcase-img"
              loading="lazy"
            />
          ) : (
            <div className="showcase-empty-state">
              <Car size={50} className="showcase-empty-icon" />
              <p className="showcase-empty-text">
                {loadingImages
                  ? `Fetching ${formData.brand} ${formData.model} from CarImages API...`
                  : `Vehicle image for ${formData.brand} ${formData.model}`}
              </p>
            </div>
          )}

          <div className="image-overlay-gradient"></div>

          {/* OVERLAY BADGE WITH CAR SPECS */}
          <div className="image-overlay-info">
            <div className="car-hero-spec">
              <h4>{formData.brand} {formData.model}</h4>
              <div className="hero-spec-chips">
                <span>Year: {calculatedYear}</span>
                <span>•</span>
                <span>{formData.fuel_type}</span>
                <span>•</span>
                <span>{formData.transmission_type}</span>
                <span>•</span>
                <span>{formData.seats} Seats</span>
              </div>
            </div>

            {loadingImages && (
              <div className="image-loading-pill">
                <Sparkles className="spin-icon" size={14} />
                <span>Fetching Vehicle Visual...</span>
              </div>
            )}
          </div>

          {/* THUMBNAIL STRIP */}
          {displayImages.length > 1 && (
            <div className="thumbnail-strip">
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={img} alt={`thumb-${idx}`} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
