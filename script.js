/* ==========================================================
   LOADER
========================================================== */
const iframe = document.getElementById("viewer");
const loader = document.getElementById("loader");

iframe.addEventListener("load", () => {
  loader.style.opacity = "0";
  setTimeout(() => loader.style.display = "none", 400);
});

/* ==========================================================
   THEME TOGGLE
========================================================== */
const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;

toggle.addEventListener("click", () => {
  const dark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", dark ? "light" : "dark");
  toggle.textContent = dark ? "🌙" : "☀️";
});

/* ==========================================================
   PREMIUM PARTICLES
========================================================== */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let particles = [];

function createParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 9000);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.8 + 0.6,
      opacity: Math.random() * 0.6 + 0.2
    });
  }
}
createParticles();

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(render);
}
render();
