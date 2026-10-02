import React, { useState, useEffect } from 'react';
import {
  Car,
  Gauge,
  Sliders,
  ShieldCheck,
  CheckCircle,
  Activity,
  Cpu
} from 'lucide-react';

import CarImageShowcase from './components/CarImageShowcase';
import GridSelector2x3 from './components/GridSelector2x3';
import DragSliders from './components/DragSliders';
import PredictionResult from './components/PredictionResult';
import PresetsBar from './components/PresetsBar';
import { DEFAULT_FORM } from './data/carData';
import { fetchCarImage } from './services/carImageService';
import './App.css';

const API_URL = 'http://localhost:5000/predict';

export default function App() {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);

  // Vehicle visualizer state
  const [carImages, setCarImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  // Check backend health on mount and fetch initial default car image
  useEffect(() => {
    fetch('http://localhost:5000/health')
      .then((res) => {
        if (res.ok) setBackendConnected(true);
      })
      .catch(() => {
        setBackendConnected(false);
      });
    
    // Fetch initial image for default car
    triggerCarImageFetch(DEFAULT_FORM);
  }, []);

  /**
   * Fetches car image based on vehicle specifications
   */
  const triggerCarImageFetch = async (carPayload) => {
    try {
      setLoadingImages(true);
      const result = await fetchCarImage(carPayload);
      if (result && result.url) {
        setCarImages([result.url]);
      }
    } catch (err) {
      console.error("Error fetching car image:", err);
    } finally {
      setLoadingImages(false);
    }
  };

  const handlePredict = async () => {
    setLoading(true);
    setError(null);

    // Prepare complete form data payload with 11 features
    const payload = {
      brand: formData.brand,
      model: formData.model,
      vehicle_age: Number(formData.vehicle_age),
      km_driven: Number(formData.km_driven),
      seller_type: formData.seller_type,
      fuel_type: formData.fuel_type,
      transmission_type: formData.transmission_type,
      mileage: Number(formData.mileage),
      engine: Number(formData.engine),
      max_power: Number(formData.max_power),
      seats: Number(formData.seats)
    };

    // Automatically fetch car image on each prediction click
    triggerCarImageFetch(payload);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server returned ${response.status}`);
      }

      const data = await response.json();
      const predictedPrice = data.predicted_price || data.price;
      setPrediction(predictedPrice);
      setBackendConnected(true);
    } catch (err) {
      console.warn('Backend unavailable, using fallback estimation formula:', err.message);
      const brandWeights = {
        'Mercedes-Benz': 2.8, 'BMW': 2.7, 'Audi': 2.5, 'Toyota': 1.6,
        'Ford': 1.1, 'Honda': 1.15, 'Hyundai': 1.0, 'Maruti': 0.95,
        'Tata': 0.9, 'Mahindra': 1.05, 'Renault': 0.85
      };
      const bMult = brandWeights[formData.brand] || 1.0;
      const baseEstimate =
        (formData.engine * 380 +
        formData.max_power * 4500 -
        formData.vehicle_age * 45000 -
        (formData.km_driven / 1000) * 1200 +
        (formData.transmission_type === 'Automatic' ? 120000 : 0)) * bMult;
      
      const fallbackPrice = Math.max(80000, baseEstimate);
      setPrediction(fallbackPrice);
      setBackendConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(DEFAULT_FORM);
    setPrediction(null);
    setError(null);
    triggerCarImageFetch(DEFAULT_FORM);
  };

  const handleSelectPreset = (presetData) => {
    setFormData(presetData);
    setPrediction(null);
    setError(null);
    triggerCarImageFetch(presetData);
  };

  return (
    <div className="app-layout">
      {/* BACKGROUND GLOW EFFECTS */}
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>

      {/* TOP HEADER */}
      <header className="site-header">
        <div className="header-container">
          <div className="brand-logo-group">
            <div className="logo-shield">
              <Car className="car-icon" size={24} />
            </div>
            <div>
              <h1 className="logo-text">AutoValuate <span className="text-gradient">ML</span></h1>
              <p className="logo-tagline">Used Car Market Price Valuation & Visual Intelligence</p>
            </div>
          </div>

          <div className="header-meta">
            <div className="tag-pill">
              <Activity size={14} className="text-emerald" />
              <span>Random Forest Regressor</span>
            </div>
            <div className="tag-pill">
              <Cpu size={14} className="text-cyan" />
              <span>11 Core Features</span>
            </div>
          </div>
        </div>
      </header>

      {/* PRESETS BAR */}
      <div className="presets-container-outer">
        <div className="presets-container-inner">
          <PresetsBar
            onSelectPreset={handleSelectPreset}
            currentBrand={formData.brand}
            currentModel={formData.model}
          />
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        <div className="content-layout">
          {/* LEFT COLUMN: CAR IMAGE SHOWCASE + 2x3 BUTTON GRID + 5 DRAGGABLE SLIDERS */}
          <div className="controls-column">
            
            {/* 📸 CAR IMAGE SHOWCASE (PLACED DIRECTLY BEFORE FILTERS FORM) */}
            <CarImageShowcase
              formData={formData}
              carImages={carImages}
              loadingImages={loadingImages}
            />

            {/* 1. 2x3 KEY FEATURE SELECTOR (Row 1: Brand, Model, Seller | Row 2: Fuel, Transmission, Seats) */}
            <section className="section-block">
              <GridSelector2x3
                formData={formData}
                onChange={setFormData}
              />
            </section>

            {/* 2. DRAGGABLE SLIDERS (Mileage, KM Driven, Vehicle Age, Engine, Max Power) */}
            <section className="section-block">
              <DragSliders
                formData={formData}
                onChange={setFormData}
              />
            </section>
          </div>

          {/* RIGHT COLUMN: VALUATION RESULT & SUBMIT */}
          <aside className="sticky-results-column">
            <PredictionResult
              prediction={prediction}
              loading={loading}
              error={error}
              formData={formData}
              onPredict={handlePredict}
              onReset={handleReset}
              backendConnected={backendConnected}
            />
          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <p>Classroom Project • Car Price Linear/Random Forest Model Valuation Dashboard</p>
      </footer>
    </div>
  );
}
