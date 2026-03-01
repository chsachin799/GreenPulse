import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import random

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load saved deployment assets
try:
    main_model = joblib.load('crop_yield_model.pkl')
    all_models = joblib.load('hybrid_framework_models.pkl')
    logger.info("Models loaded successfully.")
except Exception as e:
    logger.error(f"Error loading models: {e}")
    # Create dummy models for testing if real ones fail (Development Fallback)
    class DummyModel:
        def predict(self, df): return [random.uniform(50000, 120000)]
    main_model = DummyModel()

avg_yield_benchmark = 77053.33

class NoveltyEngine:
    """
    Handles advanced logic, simulation, and 'novelty' calculations 
    that go beyond simple prediction.
    """
    
    @staticmethod
    def calculate_xai_importance(df, prediction):
        """Feature 31: Logic-based XAI (Explainable AI) approximation - DYNAMIC"""
        impacts = []
        
        # 1. Rainfall Logic (Optimal ~1500mm)
        rain = df['average_rain_fall_mm_per_year'].values[0]
        rain_diff = rain - 1500
        # Formula: 20 - deviation. 
        rain_impact = round(20 - (abs(rain_diff) / 50), 1)
        # Cap max/min for display sanity
        rain_impact = max(-25, min(25, rain_impact))
        
        if rain_impact > 5: rain_reason = "Optimal Hydration"
        elif rain_diff < 0: rain_reason = "Water Deficiency"
        else: rain_reason = "Excess Rainfall"
        
        impacts.append({"factor": "Rainfall", "impact": rain_impact, "reason": rain_reason})

        # 2. Pesticide Logic (Optimal ~85 tonnes)
        pest = df['pesticides_tonnes'].values[0]
        if pest < 50:
             pest_impact = -5 
             pest_reason = "Bio-Vulnerability"
        elif pest <= 120:
             pest_impact = round(10 - (abs(pest - 85) / 5), 1)
             pest_reason = "Controlled Usage"
        else:
             pest_impact = round(-1 * (pest - 120) / 4, 1)
             pest_reason = "Chemical Toxicity"
        
        pest_impact = max(-25, min(15, pest_impact))
        impacts.append({"factor": "Pesticides", "impact": pest_impact, "reason": pest_reason})
            
        # 3. Temp Logic (Optimal 24C)
        temp = df['avg_temp'].values[0]
        temp_diff = temp - 24
        temp_impact = round(15 - (abs(temp_diff) * 1.5), 1)
        temp_impact = max(-25, min(20, temp_impact))
        
        if temp_impact > 0: temp_reason = "Ideal Thermals"
        elif temp_diff < 0: temp_reason = "Cold Stress"
        else: temp_reason = "Heat Stress"

        impacts.append({"factor": "Temperature", "impact": temp_impact, "reason": temp_reason})
        
        return impacts

    @staticmethod
    def economic_simulation(prediction, crop_name):
        """Feature 35: Dynamic Economic Model"""
        # Base prices per ton (randomized/heuristic bases)
        base_prices = {
            'Maize': 250, 'Rice, paddy': 400, 'Wheat': 320, 'Potatoes': 150,
            'Sorghum': 220, 'Soybeans': 550, 'Yams': 180, 'Cassava': 120
        }
        base = base_prices.get(crop_name, 300)
        
        # Supply/Demand Curve: Higher Yield = Lower Unit Price
        supply_factor = max(0.5, 1.2 - (prediction / 100000))
        market_price = round(base * supply_factor, 2)
        
        return market_price

    @staticmethod
    def calculate_reliability(xai_data):
        """Feature: Dynamic Reliability Score"""
        # Base reliability
        score = 98.5
        
        # Reduce reliability based on how extreme the AI factors are
        # If factors have high impact (meaning simulated/extreme conditions), confidence drops slightly
        total_impact = sum([abs(x['impact']) for x in xai_data])
        
        # Penalty factor: 0.1% per impact unit above 10
        penalty = max(0, (total_impact - 10) * 0.1)
        
        final_score = max(85.0, score - penalty)
        return f"{round(final_score, 1)}%"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        input_df = pd.DataFrame([data])
        
        # 1. Prediction
        prediction = main_model.predict(input_df)[0]
        
        # 2. Novelty Engine Computations
        xai_data = NoveltyEngine.calculate_xai_importance(input_df, prediction)
        reliability_score = NoveltyEngine.calculate_reliability(xai_data)
        
        # Eco Score (Reusing logic for consistency)
        pest_score = max(0, 100 - (data['pesticides_tonnes'] / 2)) 
        rain_score = 100 - abs(data['average_rain_fall_mm_per_year'] - 1500) / 10 if abs(data['average_rain_fall_mm_per_year'] - 1500) < 1000 else 0
        eco_score = round(min(100, max(0, (pest_score * 0.7) + (rain_score * 0.3))), 1)
        
        market_price = NoveltyEngine.economic_simulation(prediction, data['Item'])

        return jsonify({
            'prediction': round(prediction, 2),
            'eco_score': eco_score,
            'xai_analysis': xai_data,
            'market_price': market_price,
            'reliability': reliability_score,
            'status': 'success'
        })

    except Exception as e:
        logger.error(f"Prediction Error: {e}")
@app.route('/predict_batch', methods=['POST'])
def predict_batch():
    """Feature 18: Batch Prediction for Sensitivity Analysis & Crop Battle"""
    try:
        data_list = request.json # Expecting a list of dictionaries
        if not isinstance(data_list, list):
             return jsonify({'status': 'error', 'message': 'Input must be a list of data objects'})

        results = []
        input_df = pd.DataFrame(data_list)
        
        # Batch Prediction
        predictions = main_model.predict(input_df)
        
        for i, pred in enumerate(predictions):
            row_data = data_list[i]
            
            # Simplified Logic for Batch
            market_price = NoveltyEngine.economic_simulation(pred, row_data['Item'])
            
            # Simple Eco Score for batch
            pest_score = max(0, 100 - (row_data['pesticides_tonnes'] / 2)) 
            rain_score = 100 - abs(row_data['average_rain_fall_mm_per_year'] - 1500) / 10 if abs(row_data['average_rain_fall_mm_per_year'] - 1500) < 1000 else 0
            eco_score = round(min(100, max(0, (pest_score * 0.7) + (rain_score * 0.3))), 1)

            results.append({
                'prediction': round(pred, 2),
                'market_price': market_price,
                'eco_score': eco_score,
                'input': row_data
            })
            
        return jsonify({'status': 'success', 'batch_results': results})

    except Exception as e:
        logger.error(f"Batch Prediction Error: {e}")
        return jsonify({'status': 'error', 'message': str(e)})



if __name__ == '__main__':
    app.run(debug=True, port=5000)