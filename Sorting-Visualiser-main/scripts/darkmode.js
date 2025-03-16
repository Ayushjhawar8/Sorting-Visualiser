// Function to toggle dark mode
const themeToggleButton = document.getElementById("theme-toggle");

// Check if dark mode is enabled in localStorage and apply it
const currentTheme = localStorage.getItem("theme") || "light";

if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  updateBarColors(); // Ensure bars have correct colors when loading
}

// Toggle dark mode on button click
themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Store theme preference in localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  updateBarColors(); // Update bar colors dynamically
});

// Function to update bar colors dynamically
function updateBarColors() {
  // Delay to allow the theme switch animation to complete
  setTimeout(() => {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.style.backgroundColor = ""; // Reset to CSS default
    });
  }, 100);
}
