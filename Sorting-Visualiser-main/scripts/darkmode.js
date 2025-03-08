// Function to toggle dark mode
const themeToggleButton = document.getElementById('theme-toggle');

// Check if dark mode is enabled in localStorage, and apply it if true
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

// Toggle dark mode on button click
themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Store theme preference in localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
