// YouTube Earnings Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('youtubeForm');
  const resultContainer = document.getElementById('resultContainer');
  const errorMessage = document.getElementById('errorMessage');
  const cpmSelect = document.getElementById('cpmRate');
  const customCPMGroup = document.getElementById('customCPMGroup');
  
  // Show/hide custom CPM input based on selection
  cpmSelect.addEventListener('change', function() {
    if (this.value === 'custom') {
      customCPMGroup.style.display = 'block';
    } else {
      customCPMGroup.style.display = 'none';
    }
  });
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateEarnings();
  });
  
  function calculateEarnings() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    const monthlyViews = parseFloat(document.getElementById('monthlyViews').value);
    let cpm;
    
    if (cpmSelect.value === 'custom') {
      cpm = parseFloat(document.getElementById('customCPM').value);
      if (!cpm || cpm <= 0) {
        showError('Please enter a valid custom CPM rate');
        return;
      }
    } else {
      cpm = parseFloat(cpmSelect.value);
    }
    
    if (!monthlyViews || monthlyViews <= 0) {
      showError('Please enter a valid number of monthly views');
      return;
    }
    
    // Calculate earnings
    // YouTube takes ~45% of ad revenue, so creator gets ~55%
    const creatorShare = 0.55;
    const grossRevenue = (monthlyViews / 1000) * cpm;
    const monthlyEarnings = grossRevenue * creatorShare;
    const yearlyEarnings = monthlyEarnings * 12;
    
    displayResults(monthlyEarnings, yearlyEarnings, monthlyViews, cpm);
  }
  
  function displayResults(monthlyEarnings, yearlyEarnings, views, cpm) {
    document.getElementById('monthlyEarnings').textContent = '$' + formatNumber(monthlyEarnings);
    document.getElementById('yearlyEarnings').textContent = '$' + formatNumber(yearlyEarnings);
    document.getElementById('displayViews').textContent = formatNumberShort(views);
    document.getElementById('displayCPM').textContent = '$' + cpm.toFixed(2);
    
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
  
  function formatNumberShort(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  }
});
