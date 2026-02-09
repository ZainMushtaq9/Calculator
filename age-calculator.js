document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('ageForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const birthDate = new Date(document.getElementById('birthDate').value);
    const currentDate = document.getElementById('currentDate').value ? new Date(document.getElementById('currentDate').value) : new Date();
    if (birthDate > currentDate) {
      document.getElementById('errorMessage').textContent = 'Birth date cannot be in future';
      document.getElementById('errorMessage').classList.add('show');
      return;
    }
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();
    if (days < 0) { months--; days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalMonths = years * 12 + months;
    const totalDays = Math.floor((currentDate - birthDate) / (1000*60*60*24));
    document.getElementById('ageYears').textContent = years + ' Years';
    document.getElementById('totalMonths').textContent = totalMonths.toLocaleString() + ' months';
    document.getElementById('totalDays').textContent = totalDays.toLocaleString() + ' days';
    document.getElementById('detailedAge').textContent = years + 'y ' + months + 'm ' + days + 'd';
    document.getElementById('resultContainer').classList.add('show');
    document.getElementById('errorMessage').classList.remove('show');
  });
});
