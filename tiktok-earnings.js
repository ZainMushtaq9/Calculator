// TikTok Earnings Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('tiktokForm');
  const resultContainer = document.getElementById('resultContainer');
  const errorMessage = document.getElementById('errorMessage');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateEarnings();
  });
  
  function calculateEarnings() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    const monthlyViews = parseFloat(document.getElementById('monthlyViews').value);
    const engagementRate = parseFloat(document.getElementById('engagementRate').value);
    const audienceLocation = document.getElementById('audienceLocation').value;
    
    if (!monthlyViews || monthlyViews <= 0) {
      showError('Please enter a valid number of monthly views');
      return;
    }
    
    // Base rate per 1000 views varies by audience location
    let baseRateLow, baseRateHigh;
    
    switch(audienceLocation) {
      case 'high':
        baseRateLow = 0.03;
        baseRateHigh = 0.08;
        break;
      case 'medium':
        baseRateLow = 0.02;
        baseRateHigh = 0.05;
        break;
      case 'low':
        baseRateLow = 0.01;
        baseRateHigh = 0.03;
        break;
    }
    
    // Engagement multiplier (higher engagement = slightly better rates)
    const engagementMultiplier = 1 + (engagementRate / 100);
    
    // Calculate Creator Fund earnings
    const creatorFundLow = (monthlyViews / 1000) * baseRateLow * engagementMultiplier;
    const creatorFundHigh = (monthlyViews / 1000) * baseRateHigh * engagementMultiplier;
    
    // Estimate brand deal potential based on views and engagement
    // Rough formula: views/1000 * engagement multiplier * location factor
    let brandDealMultiplier;
    switch(audienceLocation) {
      case 'high':
        brandDealMultiplier = 0.5;
        break;
      case 'medium':
        brandDealMultiplier = 0.3;
        break;
      case 'low':
        brandDealMultiplier = 0.1;
        break;
    }
    
    const brandDealLow = (monthlyViews / 10000) * brandDealMultiplier * engagementMultiplier * 50;
    const brandDealHigh = (monthlyViews / 10000) * brandDealMultiplier * engagementMultiplier * 200;
    
    // Total earnings range
    const totalLow = creatorFundLow + brandDealLow;
    const totalHigh = creatorFundHigh + brandDealHigh;
    
    displayResults(totalLow, totalHigh, creatorFundLow, creatorFundHigh, brandDealLow, brandDealHigh);
  }
  
  function displayResults(totalLow, totalHigh, fundLow, fundHigh, brandLow, brandHigh) {
    document.getElementById('earningsRange').textContent = 
      '$' + formatNumber(totalLow) + ' - $' + formatNumber(totalHigh);
    document.getElementById('creatorFundLow').textContent = '$' + formatNumber(fundLow);
    document.getElementById('creatorFundHigh').textContent = '$' + formatNumber(fundHigh);
    document.getElementById('brandDeals').textContent = 
      '$' + formatNumber(brandLow) + ' - $' + formatNumber(brandHigh);
    
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
