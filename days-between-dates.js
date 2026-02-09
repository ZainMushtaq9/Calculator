// Days Between Dates Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('daysForm');
  const resultContainer = document.getElementById('resultContainer');
  const errorMessage = document.getElementById('errorMessage');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateDays();
  });
  
  function calculateDays() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    const startDateInput = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate').value;
    const includeEndDate = document.getElementById('includeEndDate').checked;
    
    if (!startDateInput) {
      showError('Please enter a start date');
      return;
    }
    
    if (!endDateInput) {
      showError('Please enter an end date');
      return;
    }
    
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
    
    if (startDate > endDate) {
      showError('Start date must be before or equal to end date');
      return;
    }
    
    // Calculate total days
    const timeDiff = endDate.getTime() - startDate.getTime();
    let totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Include end date if checked
    if (includeEndDate) {
      totalDays += 1;
    }
    
    // Calculate weeks
    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    
    // Calculate approximate months (30.44 days per month average)
    const months = Math.floor(totalDays / 30.44);
    
    // Calculate approximate years
    const years = Math.floor(totalDays / 365.25);
    
    // Calculate business days (weekdays only)
    const businessDays = calculateBusinessDays(startDate, endDate, includeEndDate);
    
    displayResults(totalDays, weeks, remainingDays, months, years, businessDays);
  }
  
  function calculateBusinessDays(startDate, endDate, includeEnd) {
    let count = 0;
    let currentDate = new Date(startDate);
    const end = new Date(endDate);
    
    // Adjust end date if including it
    if (includeEnd) {
      end.setDate(end.getDate() + 1);
    }
    
    while (currentDate < end) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return count;
  }
  
  function displayResults(days, weeks, remainingDays, months, years, businessDays) {
    const dayText = days === 1 ? 'Day' : 'Days';
    document.getElementById('totalDays').textContent = `${days.toLocaleString()} ${dayText}`;
    
    const weekText = remainingDays > 0 ? 
      `${weeks} weeks, ${remainingDays} days` : 
      `${weeks} weeks`;
    document.getElementById('totalWeeks').textContent = weekText;
    
    document.getElementById('totalMonths').textContent = months.toFixed(1) + ' months';
    document.getElementById('totalYears').textContent = years.toFixed(2) + ' years';
    document.getElementById('businessDays').textContent = businessDays.toLocaleString() + ' days';
    
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
