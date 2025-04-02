
const themeToggleButton = document.getElementById('theme-toggle');
const themeIcon = themeToggleButton.querySelector('i');


const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.classList.remove('fa-moon-o');
  themeIcon.classList.add('fa-sun-o');
}


themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  
  themeIcon.classList.toggle('fa-moon-o');
  themeIcon.classList.toggle('fa-sun-o');
  
 
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});



const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none"; 
canvas.style.zIndex = "-1";

let particles = [];
const numParticles = 100;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); 


function getTheme() {
  return document.body.classList.contains("dark-mode") ? "dark" : "light";
}


function createParticles() {
  particles = [];
  const theme = getTheme();

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 2, // Particle size........
      color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.5)", // White for dark mode, Black for light mode....
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
    });
  }
}


function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
}


function updateParticles() {
  for (let p of particles) {
    p.x += p.speedX;
    p.y += p.speedY;

   
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  }
}


function animate() {
  drawParticles();
  updateParticles();
  requestAnimationFrame(animate);
}


function updateThemeParticles() {
  createParticles();
}


document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  updateThemeParticles();
});


createParticles();
animate();

