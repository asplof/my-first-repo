// Sidebar functionality
const openSidebarButton = document.getElementById("openSidebar");
const closeSidebarButton = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// Open sidebar
openSidebarButton.addEventListener("click", () => {
  sidebar.classList.add("open");
  overlay.classList.add("show");
});

// Close sidebar
closeSidebarButton.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});

// Close sidebar when clicking on the overlay
overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});
