// Function to toggle dark mode
const themeToggleButton = document.getElementById('theme-toggle');
const themeIcon = themeToggleButton.querySelector('i');

// Check if dark mode is enabled in localStorage, and apply it if true
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.classList.remove('fa-moon-o');
  themeIcon.classList.add('fa-sun-o');

  // Apply Dark Mode colors to sorting bars
  applySortingColors();
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

  // Apply colors dynamically when theme is toggled
  applySortingColors();
});

// Function to apply sorting colors based on Dark/Light Mode
function applySortingColors() {
  const bars = document.querySelectorAll(".cell");
  
  bars.forEach(bar => {
    if (document.body.classList.contains("dark-mode")) {
      bar.style.backgroundColor = "#2ecc71"; // Green for unsorted in Dark Mode
    } else {
      bar.style.backgroundColor = "#ff9800"; // Orange for unsorted in Light Mode
    }
  });
}

// Function to change colors during sorting (called in app.js)
function updateBarColor(index, colorType) {
  const bars = document.querySelectorAll(".cell");

  if (bars[index]) {
    if (colorType === "compare") {
      bars[index].style.backgroundColor = "#3498db"; // Blue for comparison
    } else if (colorType === "sorted") {
      bars[index].style.backgroundColor = "#ffffff"; // White for sorted elements
    } else {
      bars[index].style.backgroundColor = document.body.classList.contains("dark-mode") ? "#2ecc71" : "#ff9800"; // Green (Dark) or Orange (Light)
    }
  }
}
