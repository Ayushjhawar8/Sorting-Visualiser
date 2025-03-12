// Function to toggle dark mode
const themeToggleButton = document.getElementById('theme-toggle');
const themeIcon = themeToggleButton.querySelector('i');

document.getElementById('theme-toggle').addEventListener('click', function() {
  const body = document.getElementById('body');
  body.classList.toggle('dark-mode');
});
// Check if dark mode is enabled in localStorage, and apply it if true
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.classList.remove('fa-moon-o');
  themeIcon.classList.add('fa-sun-o');
}

// Toggle dark mode on button click
themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Toggle icon between moon and sun
  themeIcon.classList.toggle('fa-moon-o');
  themeIcon.classList.toggle('fa-sun-o');
  
  // Store theme preference in localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
