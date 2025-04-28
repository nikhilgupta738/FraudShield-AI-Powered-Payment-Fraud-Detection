from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np
import pandas as pd
app = Flask(__name__, static_folder='../static', template_folder='../frontend', static_url_path='/static')

# Load the model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)
    
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['GET','POST'])
def predict():
    if request.method == 'GET':
        return render_template('predict.html')
    else:
        # try:
        #     data = request.get_json()
        #     features = np.array(data['features']).reshape(1, -1)
        #     prediction = model.predict(features)
        #     return jsonify({'prediction': int(prediction[0])})
        # except Exception as e:
        #     return jsonify({'error': str(e)}), 400
        try:
            data = request.get_json()
            # Create a DataFrame with the same column names used during training
            feature_names = ['type', 'amount', 'oldbalanceOrg', 'newbalanceOrig', 'newbalanceDest', 'oldbalanceDest']
            features_df = pd.DataFrame([data['features']], columns=feature_names)
            
            prediction = model.predict(features_df)
            return jsonify({'prediction': int(prediction[0])})
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    
@app.route('/feedback', methods=['GET','POST'])
def feedback():
    if request.method == 'GET':
        return render_template('feedback.html')
    else:
        try:
            data = request.get_json()
            feedback_data = np.array(data['feedback']).reshape(1, -1)
            # Here you would typically save the feedback data to a database or file
            return jsonify({'message': 'Feedback received successfully!'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    
if __name__ == '__main__':
    app.run(debug=True)