import React from 'react';
import {
  Gauge,
  Fuel,
  Calendar,
  Cpu,
  Zap,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { SLIDER_CONFIGS } from '../data/carData';

const ICONS = {
  Gauge,
  Fuel,
  Calendar,
  Cpu,
  Zap
};

export default function DragSliders({ formData, onChange }) {
  const handleSliderChange = (key, value) => {
    onChange({
      ...formData,
      [key]: Number(value)
    });
  };

  const formatDisplayValue = (key, value) => {
    switch (key) {
      case 'km_driven':
        return `${Number(value).toLocaleString('en-IN')} km`;
      case 'mileage':
        return `${Number(value).toFixed(1)} km/l`;
      case 'vehicle_age':
        return `${value} ${value === 1 ? 'Year' : 'Years'} Old`;
      case 'engine':
        return `${Number(value).toLocaleString('en-IN')} cc`;
      case 'max_power':
        return `${Number(value).toFixed(1)} bhp`;
      default:
        return value;
    }
  };

  return (
    <div className="drag-sliders-container">
      <div className="sliders-header">
        <div className="sliders-header-left">
          <div className="header-icon-box accent">
            <SlidersHorizontal size={20} />
          </div>
          <div>
            <span className="grid-badge purple">Continuous Metrics</span>
            <h3 className="grid-title">Draggable Sliders (5 Parameters)</h3>
            <p className="grid-subtitle">Drag smoothly to fine-tune mileage, engine capacity, power, and odometer</p>
          </div>
        </div>
      </div>

      <div className="sliders-list">
        {SLIDER_CONFIGS.map((cfg) => {
          const IconComponent = ICONS[cfg.icon] || SlidersHorizontal;
          const currentValue = formData[cfg.key];
          const progressPercent = Math.min(
            100,
            Math.max(0, ((currentValue - cfg.min) / (cfg.max - cfg.min)) * 100)
          );

          return (
            <div key={cfg.key} className="slider-card">
              <div className="slider-top-row">
                <div className="slider-label-group">
                  <div className="slider-icon-bubble">
                    <IconComponent size={16} />
                  </div>
                  <div>
                    <span className="slider-label">{cfg.label}</span>
                    <span className="slider-hint">{cfg.hint}</span>
                  </div>
                </div>

                <div className="slider-value-badge">
                  <span className="slider-value-text">
                    {formatDisplayValue(cfg.key, currentValue)}
                  </span>
                </div>
              </div>

              {/* DRAG SLIDER ELEMENT */}
              <div className="slider-track-container">
                <input
                  type="range"
                  id={`slider-${cfg.key}`}
                  min={cfg.min}
                  max={cfg.max}
                  step={cfg.step}
                  value={currentValue}
                  onChange={(e) => handleSliderChange(cfg.key, e.target.value)}
                  className="drag-range-input"
                  style={{
                    '--progress': `${progressPercent}%`
                  }}
                />
              </div>

              <div className="slider-bottom-meta">
                <span className="meta-min">Min: {cfg.min} {cfg.unit}</span>
                <span className="meta-percent">{progressPercent.toFixed(0)}% Range</span>
                <span className="meta-max">Max: {cfg.max.toLocaleString('en-IN')} {cfg.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
