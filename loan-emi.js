document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('emiForm');
  const resultContainer = document.getElementById('resultContainer');
  const errorMessage = document.getElementById('errorMessage');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateEMI();
  });
  
  function calculateEMI() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualRate = parseFloat(document.getElementById('interestRate').value);
    const tenureYears = parseFloat(document.getElementById('loanTenure').value);
    
    if (!loanAmount || loanAmount <= 0) {
      showError('Please enter a valid loan amount in PKR');
      return;
    }
    
    if (!annualRate || annualRate < 0 || annualRate > 30) {
      showError('Please enter a valid interest rate between 0 and 30');
      return;
    }
    
    if (!tenureYears || tenureYears <= 0 || tenureYears > 40) {
      showError('Please enter a valid loan tenure between 1 and 40 years');
      return;
    }
    
    const monthlyRate = annualRate / 12 / 100;
    const tenureMonths = tenureYears * 12;
    
    let emi;
    if (monthlyRate === 0) {
      emi = loanAmount / tenureMonths;
    } else {
      const power = Math.pow(1 + monthlyRate, tenureMonths);
      emi = (loanAmount * monthlyRate * power) / (power - 1);
    }
    
    const totalAmount = emi * tenureMonths;
    const totalInterest = totalAmount - loanAmount;
    
    displayResults(emi, totalInterest, totalAmount, loanAmount);
  }
  
  function displayResults(emi, totalInterest, totalAmount, principal) {
    document.getElementById('emiResult').textContent = '₨' + formatNumber(emi);
    document.getElementById('totalInterest').textContent = '₨' + formatNumber(totalInterest);
    document.getElementById('totalAmount').textContent = '₨' + formatNumber(totalAmount);
    document.getElementById('principalAmount').textContent = '₨' + formatNumber(principal);
    
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
    return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
});
