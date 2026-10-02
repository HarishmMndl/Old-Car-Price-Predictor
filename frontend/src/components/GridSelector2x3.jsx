import React from 'react';
import {
  Car,
  Tag,
  UserCheck,
  Fuel,
  GitBranch,
  Users
} from 'lucide-react';
import {
  BRANDS,
  BRAND_MODELS_MAP,
  SELLER_TYPES,
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  SEATS_OPTIONS
} from '../data/carData';

export default function GridSelector2x3({ formData, onChange }) {
  const currentModels = BRAND_MODELS_MAP[formData.brand] || ["Other"];

  const handleBrandChange = (newBrand) => {
    const models = BRAND_MODELS_MAP[newBrand] || ["Other"];
    const newModel = models.includes(formData.model) ? formData.model : models[0];
    onChange({
      ...formData,
      brand: newBrand,
      model: newModel
    });
  };

  const handleModelChange = (newModel) => {
    onChange({
      ...formData,
      model: newModel
    });
  };

  const handleFieldChange = (field, value) => {
    onChange({
      ...formData,
      [field]: field === 'seats' ? Number(value) : value
    });
  };

  return (
    <div className="selector-grid-container">
      <div className="grid-header">
        <span className="grid-badge">Categorical Parameters</span>
        <h3 className="grid-title">2×3 Key Feature Selector</h3>
        <p className="grid-subtitle">Select vehicle specifications using interactive button controls</p>
      </div>

      <div className="grid-2x3">
        {/* ROW 1 - COL 1: BRAND */}
        <div className="card-selector">
          <div className="card-header">
            <div className="header-icon-box">
              <Car className="header-icon" size={18} />
            </div>
            <div>
              <label className="card-label">Brand</label>
              <span className="card-sublabel">Selected: <strong>{formData.brand}</strong></span>
            </div>
          </div>
          <div className="select-wrapper">
            <select
              className="custom-select"
              value={formData.brand}
              onChange={(e) => handleBrandChange(e.target.value)}
              id="brand-select"
            >
              {BRANDS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="button-group scrollable-pills">
            {["Maruti", "Hyundai", "Honda", "Tata", "Toyota", "Mahindra"].map((b) => (
              <button
                key={b}
                type="button"
                className={`pill-btn ${formData.brand === b ? 'active' : ''}`}
                onClick={() => handleBrandChange(b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* ROW 1 - COL 2: MODEL */}
        <div className="card-selector">
          <div className="card-header">
            <div className="header-icon-box">
              <Tag className="header-icon" size={18} />
            </div>
            <div>
              <label className="card-label">Model</label>
              <span className="card-sublabel">Selected: <strong>{formData.model}</strong></span>
            </div>
          </div>
          <div className="select-wrapper">
            <select
              className="custom-select"
              value={formData.model}
              onChange={(e) => handleModelChange(e.target.value)}
              id="model-select"
            >
              {currentModels.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="button-group scrollable-pills">
            {currentModels.map((m) => (
              <button
                key={m}
                type="button"
                className={`pill-btn ${formData.model === m ? 'active' : ''}`}
                onClick={() => handleModelChange(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* ROW 1 - COL 3: SELLER TYPE */}
        <div className="card-selector">
          <div className="card-header">
            <div className="header-icon-box">
              <UserCheck className="header-icon" size={18} />
            </div>
            <div>
              <label className="card-label">Seller Type</label>
              <span className="card-sublabel">{formData.seller_type}</span>
            </div>
          </div>
          <div className="button-group button-group-vertical">
            {SELLER_TYPES.map((st) => (
              <button
                key={st}
                type="button"
                className={`pill-btn full-width ${formData.seller_type === st ? 'active' : ''}`}
                onClick={() => handleFieldChange('seller_type', st)}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* ROW 2 - COL 1: FUEL TYPE */}
        <div className="card-selector">
          <div className="card-header">
            <div className="header-icon-box">
              <Fuel className="header-icon" size={18} />
            </div>
            <div>
              <label className="card-label">Fuel Type</label>
              <span className="card-sublabel">{formData.fuel_type}</span>
            </div>
          </div>
          <div className="button-group button-group-wrap">
            {FUEL_TYPES.map((ft) => (
              <button
                key={ft}
                type="button"
                className={`pill-btn ${formData.fuel_type === ft ? 'active' : ''}`}
                onClick={() => handleFieldChange('fuel_type', ft)}
              >
                {ft}
              </button>
            ))}
          </div>
        </div>

        {/* ROW 2 - COL 2: TRANSMISSION TYPE */}
        <div className="card-selector">
          <div className="card-header">
            <div className="header-icon-box">
              <GitBranch className="header-icon" size={18} />
            </div>
            <div>
              <label className="card-label">Transmission</label>
              <span className="card-sublabel">{formData.transmission_type}</span>
            </div>
          </div>
          <div className="button-group transmission-group">
            {TRANSMISSION_TYPES.map((tt) => (
              <button
                key={tt}
                type="button"
                className={`pill-btn large-pill ${formData.transmission_type === tt ? 'active' : ''}`}
                onClick={() => handleFieldChange('transmission_type', tt)}
              >
                {tt}
              </button>
            ))}
          </div>
        </div>

        {/* ROW 2 - COL 3: SEATS */}
        <div className="card-selector">
          <div className="card-header">
            <div className="header-icon-box">
              <Users className="header-icon" size={18} />
            </div>
            <div>
              <label className="card-label">Seats</label>
              <span className="card-sublabel">{formData.seats} Seater</span>
            </div>
          </div>
          <div className="button-group seats-group">
            {SEATS_OPTIONS.map((num) => (
              <button
                key={num}
                type="button"
                className={`pill-btn seat-btn ${formData.seats === num ? 'active' : ''}`}
                onClick={() => handleFieldChange('seats', num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
