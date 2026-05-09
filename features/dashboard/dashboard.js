const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("show");
  sidebarOverlay.classList.toggle("show");
});

sidebarOverlay.addEventListener("click", () => {
  sidebar.classList.remove("show");
  sidebarOverlay.classList.remove("show");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 992) {
    sidebar.classList.remove("show");
    sidebarOverlay.classList.remove("show");
  }
});
