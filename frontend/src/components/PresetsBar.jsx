import React from 'react';
import { Sparkles, Bookmark } from 'lucide-react';
import { PRESETS } from '../data/carData';

export default function PresetsBar({ onSelectPreset, currentBrand, currentModel }) {
  return (
    <div className="presets-wrapper">
      <div className="presets-label">
        <Bookmark size={15} />
        <span>Quick Presets:</span>
      </div>
      <div className="presets-list">
        {PRESETS.map((preset) => {
          const isSelected =
            currentBrand === preset.data.brand &&
            currentModel === preset.data.model;

          return (
            <button
              key={preset.name}
              type="button"
              className={`preset-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectPreset(preset.data)}
            >
              <span className="preset-name">{preset.name}</span>
              <span className="preset-badge">{preset.badge}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
