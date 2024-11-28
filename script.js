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
document.addEventListener("DOMContentLoaded", () => {
  const images = ["listing1.png", "listing2.png", "listing3.png"];
  let currentIndex = 0;

  const carouselImage = document.getElementById("carouselImage");
  const carouselCount = document.getElementById("carouselCount");
  const prevArrow = document.getElementById("prevArrow");
  const nextArrow = document.getElementById("nextArrow");

  const updateCarousel = () => {
    carouselImage.src = images[currentIndex];
    carouselCount.textContent = `${currentIndex + 1}/${images.length}`;
  };

  prevArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  });

  nextArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });

  updateCarousel();
});

