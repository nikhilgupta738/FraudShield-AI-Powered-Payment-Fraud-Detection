// document.addEventListener('DOMContentLoaded', function() {
//     // Get DOM elements
//     const predictRandomForestBtn = document.getElementById('predictRandomForest');
//     const predictNeuralNetworkBtn = document.getElementById('predictNeuralNetwork');
//     const loadingSpinner = document.getElementById('loadingSpinner');
//     const resultCard = document.getElementById('resultCard');
//     const form = document.getElementById('predictionForm');
    
//     // Setup event listeners
//     predictRandomForestBtn.addEventListener('click', () => handlePrediction('random-forest'));
//     predictNeuralNetworkBtn.addEventListener('click', () => handlePrediction('neural-network'));
    
//     // Prediction handler
//     function handlePrediction(modelType) {
//       // Get form values
//       const amount = document.getElementById('transactionAmount').value;
//       const category = document.getElementById('merchantCategory').value;
//       const time = document.getElementById('timeOfDay').value;
//       const device = document.getElementById('deviceType').value;
      
//       // Simple validation
//       if (!amount || !category || !time || !device) {
//         alert('Please fill in all fields');
//         return;
//       }
      
//       // Show loading spinner
//       resultCard.style.display = 'none';
//       loadingSpinner.style.display = 'flex';
      
//       // Simulate API call
//       setTimeout(() => {
//         // Hide loading spinner
//         loadingSpinner.style.display = 'none';
        
//         // Generate a random result for demo purposes
//         const isFraud = Math.random() > 0.7;
//         const confidenceScore = (Math.random() * 30 + 70).toFixed(1);
        
//         // Update UI with result
//         updateResultUI(isFraud, parseFloat(confidenceScore), modelType);
        
//         // Show result card
//         resultCard.style.display = 'block';
//       }, 1500);
//     }
    
//     // Update result UI
//     function updateResultUI(isFraud, confidenceScore, modelType) {
//       const resultTitle = document.querySelector('.result-title');
//       const resultIcon = document.querySelector('.result-icon');
//       const modelInfo = document.querySelector('.model-info');
//       const confidenceValue = document.querySelector('.confidence-value');
//       const progressBar = document.querySelector('.progress-bar');
//       const resultMessage = document.querySelector('.result-message');
      
//       // Set result class
//       if (isFraud) {
//         resultCard.className = 'card result-card fraud';
//         resultTitle.textContent = 'Potential Fraud Detected';
//         resultIcon.className = 'fas fa-exclamation-triangle result-icon';
//         resultMessage.textContent = 'This transaction exhibits patterns typical of fraudulent activity. We recommend reviewing and verifying before proceeding.';
//       } else {
//         resultCard.className = 'card result-card legit';
//         resultTitle.textContent = 'Transaction Legitimate';
//         resultIcon.className = 'fas fa-check-circle result-icon';
//         resultMessage.textContent = 'This transaction appears legitimate based on our analysis. It aligns with normal transaction patterns.';
//       }
      
//       // Set model type
//       modelInfo.textContent = `Analyzed with ${modelType === 'random-forest' ? 'Random Forest' : 'Neural Network'} Model`;
      
//       // Set confidence score
//       confidenceValue.textContent = `${confidenceScore}%`;
//       progressBar.style.width = `${confidenceScore}%`;
//     }
//   });  
document.getElementById('predictionForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const type = document.getElementById('type').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const oldbalanceOrg = parseFloat(document.getElementById('oldbalanceOrg').value);
  const newbalanceOrig = parseFloat(document.getElementById('newbalanceOrig').value);
  const oldbalanceDest = parseFloat(document.getElementById('oldbalanceDest').value);
  const newbalanceDest = parseFloat(document.getElementById('newbalanceDest').value);

  const features = [
      amount,
      oldbalanceOrg,
      newbalanceOrig,
      newbalanceDest,
      oldbalanceDest,
      type === 'CASH_OUT' ? 1 : 0,
      type === 'DEBIT' ? 1 : 0,
      type === 'PAYMENT' ? 1 : 0,
      type === 'TRANSFER' ? 1 : 0
  ];

  try {
      const response = await fetch('/predict', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ features })
      });

      const result = await response.json();
      const resultDiv = document.getElementById('result-message');
      
      resultDiv.style.display = 'block';
      if (result.prediction === 1) {
          resultDiv.className = 'fraud';
          resultDiv.textContent = 'Warning: This transaction is predicted to be FRAUDULENT!';
      } else {
          resultDiv.className = 'non-fraud';
          resultDiv.textContent = 'This transaction is predicted to be NON-FRAUDULENT.';
      }
  } catch (error) {
      console.error('Error:', error);
      const resultDiv = document.getElementById('result-message');
      resultDiv.style.display = 'block';
      resultDiv.className = 'fraud';
      resultDiv.textContent = 'Error occurred while processing the request.';
  }
});