// Freelance Rate Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('freelanceForm');
  const resultContainer = document.getElementById('resultContainer');
  const errorMessage = document.getElementById('errorMessage');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateRate();
  });
  
  function calculateRate() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    const annualIncome = parseFloat(document.getElementById('annualIncome').value);
    const hoursPerWeek = parseFloat(document.getElementById('hoursPerWeek').value);
    const weeksPerYear = parseFloat(document.getElementById('weeksPerYear').value);
    const expenses = parseFloat(document.getElementById('expenses').value) || 0;
    
    if (!annualIncome || annualIncome <= 0) {
      showError('Please enter a valid desired annual income');
      return;
    }
    
    if (!hoursPerWeek || hoursPerWeek <= 0 || hoursPerWeek > 80) {
      showError('Please enter valid weekly hours (1-80)');
      return;
    }
    
    if (!weeksPerYear || weeksPerYear <= 0 || weeksPerYear > 52) {
      showError('Please enter valid billable weeks (1-52)');
      return;
    }
    
    // Calculate total required revenue (income + expenses)
    const totalRequired = annualIncome + expenses;
    
    // Calculate total billable hours per year
    const billableHours = hoursPerWeek * weeksPerYear;
    
    // Calculate hourly rate
    const hourlyRate = totalRequired / billableHours;
    
    // Calculate daily rate (8 hours)
    const dailyRate = hourlyRate * 8;
    
    // Calculate monthly rate (assuming 4.33 weeks per month on average)
    const monthlyRate = (hourlyRate * hoursPerWeek * weeksPerYear) / 12;
    
    displayResults(hourlyRate, dailyRate, monthlyRate, billableHours);
  }
  
  function displayResults(hourly, daily, monthly, hours) {
    document.getElementById('hourlyRate').textContent = '$' + hourly.toFixed(2);
    document.getElementById('dailyRate').textContent = '$' + daily.toFixed(2);
    document.getElementById('monthlyRate').textContent = '$' + monthly.toFixed(2);
    document.getElementById('billableHours').textContent = hours.toFixed(0) + ' hours';
    
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
});
