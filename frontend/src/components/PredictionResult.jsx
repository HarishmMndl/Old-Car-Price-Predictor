import React from 'react';
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  IndianRupee
} from 'lucide-react';

export default function PredictionResult({
  prediction,
  loading,
  error,
  formData,
  onPredict,
  onReset,
  backendConnected
}) {
  const formatIndianCurrency = (num) => {
    if (num === null || num === undefined || isNaN(num)) return '₹ --';
    const rounded = Math.round(num);
    const inLakhs = (rounded / 100000).toFixed(2);
    return {
      formatted: `₹ ${rounded.toLocaleString('en-IN')}`,
      inLakhs: `₹ ${inLakhs} Lakhs`
    };
  };

  const priceObj = prediction ? formatIndianCurrency(prediction) : null;

  return (
    <div className="prediction-panel">
      {/* ACTION CARD */}
      <div className="action-card">
        <div className="action-header">
          <div className="status-indicator">
            <span className={`status-dot ${backendConnected ? 'online' : 'demo'}`}></span>
            <span className="status-text">
              {backendConnected ? 'Backend ML API Connected' : 'Ready (Client / API)'}
            </span>
          </div>
          <button
            type="button"
            className="reset-btn"
            onClick={onReset}
            title="Reset to default car"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
        </div>

        <button
          type="button"
          id="predict-button"
          className={`predict-btn ${loading ? 'loading' : ''}`}
          onClick={onPredict}
          disabled={loading}
        >
          <Sparkles className="btn-sparkle" size={20} />
          <span>{loading ? 'Evaluating Model...' : 'Calculate Market Price'}</span>
        </button>

        {error && (
          <div className="error-banner">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* RESULT CARD */}
      {prediction !== null && !error && (
        <div className="result-card animate-fade-in">
          <div className="result-header">
            <div className="result-tag">
              <CheckCircle2 size={15} />
              <span>Valuation Generated</span>
            </div>
            <span className="car-summary-pill">
              {formData.brand} {formData.model} ({formData.vehicle_age}y)
            </span>
          </div>

          <div className="price-display-box">
            <span className="price-caption">Estimated Market Value</span>
            <div className="main-price">
              <span className="currency-symbol">₹</span>
              <span className="price-digits">{Math.round(prediction).toLocaleString('en-IN')}</span>
            </div>
            <div className="price-sub-badge">
              <span>Approx. {priceObj?.inLakhs}</span>
            </div>
          </div>

          <div className="result-specs-grid">
            <div className="spec-item">
              <span className="spec-label">Transmission</span>
              <span className="spec-val">{formData.transmission_type}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Fuel</span>
              <span className="spec-val">{formData.fuel_type}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Odometer</span>
              <span className="spec-val">{formData.km_driven.toLocaleString('en-IN')} km</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Mileage</span>
              <span className="spec-val">{formData.mileage} km/l</span>
            </div>
          </div>

          <div className="result-footer">
            <ShieldCheck size={16} className="text-emerald" />
            <span>Powered by Random Forest Regressor trained on 15,400+ vehicle records</span>
          </div>
        </div>
      )}
    </div>
  );
}
