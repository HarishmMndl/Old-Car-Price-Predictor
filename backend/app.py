import os
import pickle
import pandas as pd
# pyrefly: ignore [missing-import]
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin requests for the React frontend

# Path to the trained ML model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, '..', 'Linear_regression', 'car_price_model.pkl')

model = None

def load_model():
    global model
    try:
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        print(f"[OK] Model successfully loaded from {MODEL_PATH}")
    except Exception as e:
        print(f"[ERROR] Failed to load model: {e}")

load_model()

FEATURE_COLUMNS = [
    'brand',
    'model',
    'vehicle_age',
    'km_driven',
    'seller_type',
    'fuel_type',
    'transmission_type',
    'mileage',
    'engine',
    'max_power',
    'seats'
]

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'features': FEATURE_COLUMNS
    })

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'ML model is not loaded'}), 500

    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        # Construct single-row DataFrame with exact expected types
        row = {
            'brand': str(data.get('brand', 'Maruti')),
            'model': str(data.get('model', 'Swift')),
            'vehicle_age': float(data.get('vehicle_age', 5)),
            'km_driven': float(data.get('km_driven', 45000)),
            'seller_type': str(data.get('seller_type', 'Individual')),
            'fuel_type': str(data.get('fuel_type', 'Petrol')),
            'transmission_type': str(data.get('transmission_type', 'Manual')),
            'mileage': float(data.get('mileage', 18.5)),
            'engine': float(data.get('engine', 1197)),
            'max_power': float(data.get('max_power', 82.0)),
            'seats': float(data.get('seats', 5))
        }

        df = pd.DataFrame([row], columns=FEATURE_COLUMNS)
        predicted_val = model.predict(df)[0]
        
        # Round and ensure non-negative
        price = max(10000.0, float(round(predicted_val, 2)))

        return jsonify({
            'status': 'success',
            'predicted_price': price,
            'input_received': row
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    print("Starting Flask Car Price Prediction API on http://127.0.0.1:5000 ...")
    app.run(host='0.0.0.0', port=5000, debug=True)
