// Home Loan Eligibility Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('eligibilityForm');
  const resultContainer = document.getElementById('resultContainer');
  const errorMessage = document.getElementById('errorMessage');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateEligibility();
  });
  
  function calculateEligibility() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);
    const monthlyObligations = parseFloat(document.getElementById('monthlyObligations').value) || 0;
    const annualRate = parseFloat(document.getElementById('interestRate').value);
    const tenureYears = parseFloat(document.getElementById('tenure').value);
    const foirPercentage = parseFloat(document.getElementById('foirPercentage').value);
    
    if (!monthlyIncome || monthlyIncome <= 0) {
      showError('Please enter a valid monthly income');
      return;
    }
    
    if (monthlyObligations < 0) {
      showError('Monthly obligations cannot be negative');
      return;
    }
    
    if (!annualRate || annualRate <= 0 || annualRate > 20) {
      showError('Please enter a valid interest rate between 1 and 20');
      return;
    }
    
    if (!tenureYears || tenureYears <= 0 || tenureYears > 30) {
      showError('Please enter a valid tenure between 1 and 30 years');
      return;
    }
    
    // Calculate available income after obligations
    const availableIncome = monthlyIncome - monthlyObligations;
    
    if (availableIncome <= 0) {
      showError('Your existing obligations exceed your income. Please reduce obligations or increase income.');
      return;
    }
    
    // Calculate maximum EMI based on FOIR
    const maxEMI = (monthlyIncome * foirPercentage / 100) - monthlyObligations;
    
    if (maxEMI <= 0) {
      showError('Unable to determine eligibility. Your existing obligations are too high relative to your income.');
      return;
    }
    
    // Calculate eligible loan amount using reverse EMI formula
    const monthlyRate = annualRate / 12 / 100;
    const tenureMonths = tenureYears * 12;
    
    let eligibleAmount;
    if (monthlyRate === 0) {
      eligibleAmount = maxEMI * tenureMonths;
    } else {
      const power = Math.pow(1 + monthlyRate, tenureMonths);
      eligibleAmount = (maxEMI * (power - 1)) / (monthlyRate * power);
    }
    
    const totalPayable = maxEMI * tenureMonths;
    
    displayResults(eligibleAmount, maxEMI, totalPayable, availableIncome);
  }
  
  function displayResults(eligibleAmount, monthlyEMI, totalPayable, availableIncome) {
    document.getElementById('eligibilityAmount').textContent = '$' + formatNumber(eligibleAmount);
    document.getElementById('monthlyEMI').textContent = '$' + formatNumber(monthlyEMI);
    document.getElementById('totalPayable').textContent = '$' + formatNumber(totalPayable);
    document.getElementById('availableIncome').textContent = '$' + formatNumber(availableIncome);
    
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
