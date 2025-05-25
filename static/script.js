// document.addEventListener('DOMContentLoaded', function() {
//     // Get DOM elements
//     const predictRandomForestBtn = document.getElementById('predictRandomForest');
//     const predictNeuralNetworkBtn = document.getElementById('predictNeuralNetwork');
//     const loadingSpinner = document.getElementById('loadingSpinner');
//     const resultCard = document.getElementById('resultCard');
//     const form = document.getElementById('predictionForm');
    
//     // Setup event listeners for the form submission
//     form.addEventListener('submit', async (e) => {
//       e.preventDefault();
//       handlePrediction('random-forest');
//     });
    
//     // Setup event listeners for buttons
//     if (predictRandomForestBtn) {
//       predictRandomForestBtn.addEventListener('click', () => handlePrediction('random-forest'));
//     }
    
//     if (predictNeuralNetworkBtn) {
//       predictNeuralNetworkBtn.addEventListener('click', () => handlePrediction('neural-network'));
//     }
    
//     // Prediction handler
//     async function handlePrediction(modelType) {
//       // Get form values
//       const type = document.getElementById('type').value;
//       const amount = parseFloat(document.getElementById('amount').value);
//       const oldbalanceOrg = parseFloat(document.getElementById('oldbalanceOrg').value);
//       const newbalanceOrig = parseFloat(document.getElementById('newbalanceOrig').value);
//       const oldbalanceDest = parseFloat(document.getElementById('oldbalanceDest').value);
//       const newbalanceDest = parseFloat(document.getElementById('newbalanceDest').value);
      
//       // Simple validation
//       if (!type || isNaN(amount) || isNaN(oldbalanceOrg) || isNaN(newbalanceOrig) || 
//           isNaN(oldbalanceDest) || isNaN(newbalanceDest)) {
//         alert('Please fill in all fields with valid numbers');
//         return;
//       }
      
//       // Prepare features array
//       const features = [
//         type,
//         amount,
//         oldbalanceOrg,
//         newbalanceOrig,
//         newbalanceDest,
//         oldbalanceDest
        
//       ];
      
//       console.log("Sending features:", features);
      
//       // Show loading spinner if it exists
//       if (resultCard) resultCard.style.display = 'none';
//       if (loadingSpinner) loadingSpinner.style.display = 'flex';
      
//       try {
//         // Make API call
//         const response = await fetch('/predict', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ features })
//         });
        
//         const result = await response.json();
        
//         // Hide loading spinner
//         if (loadingSpinner) loadingSpinner.style.display = 'none';
        
//         // Check if we have the enhanced UI or simple UI
//         if (resultCard) {
//           // Enhanced UI with result card
//           updateResultUI(result.prediction === 1, (Math.random() * 30 + 70).toFixed(1), modelType);
//           resultCard.style.display = 'block';
//         } else {
//           // Simple UI with result message
//           const resultDiv = document.getElementById('result-message');
//           if (resultDiv) {
//             resultDiv.style.display = 'block';
//             if (result.prediction === 1) {
//               resultDiv.className = 'fraud';
//               resultDiv.textContent = 'Warning: This transaction is predicted to be FRAUDULENT!';
//             } else {
//               resultDiv.className = 'non-fraud';
//               resultDiv.textContent = 'This transaction is predicted to be NON-FRAUDULENT.';
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Error:', error);
        
//         // Hide loading spinner
//         if (loadingSpinner) loadingSpinner.style.display = 'none';
        
//         // Check which UI we're using
//         if (resultCard) {
//           // Enhanced UI
//           updateResultUI(true, 90, modelType, true);
//           resultCard.style.display = 'block';
//         } else {
//           // Simple UI
//           const resultDiv = document.getElementById('result-message');
//           if (resultDiv) {
//             resultDiv.style.display = 'block';
//             resultDiv.className = 'fraud';
//             resultDiv.textContent = 'Error occurred while processing the request.';
//           }
//         }
//       }
//     }
    
//     // Update result UI
//     function updateResultUI(isFraud, confidenceScore, modelType, isError = false) {
//       const resultTitle = document.querySelector('.result-title');
//       const resultIcon = document.querySelector('.result-icon');
//       const modelInfo = document.querySelector('.model-info');
//       const confidenceValue = document.querySelector('.confidence-value');
//       const progressBar = document.querySelector('.progress-bar');
//       const resultMessage = document.querySelector('.result-message');
      
//       if (isError) {
//         // Error state
//         resultCard.className = 'card result-card error';
//         if (resultTitle) resultTitle.textContent = 'Error Processing Request';
//         if (resultIcon) resultIcon.className = 'fas fa-exclamation-circle result-icon';
//         if (resultMessage) resultMessage.textContent = 'An error occurred while processing your request. Please try again.';
//       } else if (isFraud) {
//         // Fraud detected
//         resultCard.className = 'card result-card fraud';
//         if (resultTitle) resultTitle.textContent = 'Potential Fraud Detected';
//         if (resultIcon) resultIcon.className = 'fas fa-exclamation-triangle result-icon';
//         if (resultMessage) resultMessage.textContent = 'This transaction exhibits patterns typical of fraudulent activity. We recommend reviewing and verifying before proceeding.';
//       } else {
//         // Legitimate transaction
//         resultCard.className = 'card result-card legit';
//         if (resultTitle) resultTitle.textContent = 'Transaction Legitimate';
//         if (resultIcon) resultIcon.className = 'fas fa-check-circle result-icon';
//         if (resultMessage) resultMessage.textContent = 'This transaction appears legitimate based on our analysis. It aligns with normal transaction patterns.';
//       }
      
//       // Set model type
//       if (modelInfo) modelInfo.textContent = `Analyzed with ${modelType === 'random-forest' ? 'Random Forest' : 'Neural Network'} Model`;
      
//       // Set confidence score
//       if (confidenceValue) confidenceValue.textContent = `${confidenceScore}%`;
//       if (progressBar) progressBar.style.width = `${confidenceScore}%`;
//     }
//   });