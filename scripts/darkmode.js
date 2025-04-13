const themeToggleButton = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggleButton.checked = true;
} else {
  document.body.classList.remove('dark-mode');
  themeToggleButton.checked = false;
}
updateThemeParticles();

themeToggleButton.addEventListener('change', () => {
  const isDark = themeToggleButton.checked;
  document.body.classList.toggle('dark-mode', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});