// Crypto Profit Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('cryptoForm');
  const resultContainer = document.getElementById('resultContainer');
  const errorMessage = document.getElementById('errorMessage');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateProfit();
  });
  
  function calculateProfit() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    const buyPrice = parseFloat(document.getElementById('buyPrice').value);
    const sellPrice = parseFloat(document.getElementById('sellPrice').value);
    const quantity = parseFloat(document.getElementById('quantity').value);
    const feePercent = parseFloat(document.getElementById('tradingFee').value) || 0;
    
    if (!buyPrice || buyPrice <= 0) {
      showError('Please enter a valid buy price');
      return;
    }
    
    if (!sellPrice || sellPrice <= 0) {
      showError('Please enter a valid sell price');
      return;
    }
    
    if (!quantity || quantity <= 0) {
      showError('Please enter a valid quantity');
      return;
    }
    
    // Calculate total investment (buy side)
    const investment = buyPrice * quantity;
    const buyFee = investment * (feePercent / 100);
    const totalInvestment = investment + buyFee;
    
    // Calculate total return (sell side)
    const returnAmount = sellPrice * quantity;
    const sellFee = returnAmount * (feePercent / 100);
    const totalReturn = returnAmount - sellFee;
    
    // Calculate profit/loss
    const profit = totalReturn - totalInvestment;
    const totalFees = buyFee + sellFee;
    
    // Calculate ROI
    const roi = (profit / totalInvestment) * 100;
    
    displayResults(profit, roi, totalInvestment, totalReturn, totalFees);
  }
  
  function displayResults(profit, roi, investment, returnAmount, fees) {
    const profitLabel = document.getElementById('profitLabel');
    const profitAmountEl = document.getElementById('profitAmount');
    const roiEl = document.getElementById('roiPercentage');
    
    // Update label and color based on profit/loss
    if (profit >= 0) {
      profitLabel.textContent = 'Total Profit';
      profitAmountEl.style.color = 'var(--accent-green)';
      roiEl.style.color = 'var(--accent-green)';
      profitAmountEl.textContent = '$' + formatNumber(profit);
    } else {
      profitLabel.textContent = 'Total Loss';
      profitAmountEl.style.color = '#ef4444';
      roiEl.style.color = '#ef4444';
      profitAmountEl.textContent = '-$' + formatNumber(Math.abs(profit));
    }
    
    document.getElementById('roiPercentage').textContent = roi.toFixed(2) + '%';
    document.getElementById('totalInvestment').textContent = '$' + formatNumber(investment);
    document.getElementById('totalReturn').textContent = '$' + formatNumber(returnAmount);
    document.getElementById('totalFees').textContent = '$' + formatNumber(fees);
    
    resultContainer.classList.add('show');
    
    if (window.innerWidth < 768) {
      resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    resultContainer.classList.remove('show');
  }
  
  function formatNumber(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
});
