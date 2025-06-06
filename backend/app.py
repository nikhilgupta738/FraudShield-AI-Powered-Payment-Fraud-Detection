from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np
import pandas as pd
app = Flask(__name__, static_folder='../static', template_folder='../frontend', static_url_path='/static')

# Load the model
import pickle
with open('model_rfc.pkl', 'rb') as f:
    model1 = pickle.load(f)
# with open('model_nn.pkl', 'rb') as f1:
#     model2 = pickle.load(f1)
        
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['GET','POST'])
def predict():
    if request.method == 'GET':
        return render_template('predict.html',result_card=False,prob = 0,prediction=0)
    else:
        try:
            data = request.form.to_dict()
            print(data)
            
            # Create a DataFrame with the same column names used during training
            features = ['amount', 'oldbalanceOrg', 'newbalanceOrig','newbalanceDest', 'oldbalanceDest', 'type_CASH_OUT', 'type_DEBIT', 'type_PAYMENT',
       'type_TRANSFER']
            d = [data['amount'],data['oldbalanceOrg'],data['newbalanceOrig'],data['newbalanceDest'],data['oldbalanceDest'],False,False,False,False]
            df = pd.DataFrame([d], columns=features)
            print(df)
            a = 'type_' + data['type']
            df.loc[df['amount'] == data['amount'], a ] = True
            print(df)
            # if data['model'] == 'RandomForest':
            #     prediction = model1.predict(df)
            # else:
            #     prediction = model2.predict(df)
            prediction = model1.predict(df)
            proba = model1.predict_proba(df)
            print(prediction,proba[0][prediction][0])
            # return jsonify({'prediction': int(prediction[0])}) 
            return render_template('predict.html', 
                                     prediction=prediction,
                                     result_card=True,
                                     prob = proba[0][prediction][0])
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
    
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=False)