document.addEventListener("DOMContentLoaded", () => {
  // Profile Dropdown Logic
  const profileIcon = document.querySelector(".profile-icon");
  const profileDropdown = document.querySelector(".profile-dropdown");
  const profileOverlay = document.createElement("div");
  profileOverlay.classList.add("overlay");
  document.body.appendChild(profileOverlay);

  if (profileIcon && profileDropdown) {
    profileIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      profileDropdown.classList.toggle("show");
      profileOverlay.classList.toggle("show");
    });

    // Close dropdown and overlay when clicking outside
    document.addEventListener("click", (event) => {
      if (
        !profileIcon.contains(event.target) &&
        !profileDropdown.contains(event.target)
      ) {
        profileDropdown.classList.remove("show");
        profileOverlay.classList.remove("show");
      }
    });
  }

  // "See All Categories" Sidebar Logic
  const sidebar = document.getElementById("sidebar");
  const openSidebarButton = document.getElementById("openSidebar");
  const closeSidebarButton = document.getElementById("closeSidebar");

  if (sidebar && openSidebarButton && closeSidebarButton) {
    openSidebarButton.addEventListener("click", () => {
      sidebar.classList.add("open");
      profileOverlay.classList.add("show"); // Reuse overlay for dimming
    });

    closeSidebarButton.addEventListener("click", () => {
      sidebar.classList.remove("open");
      profileOverlay.classList.remove("show");
    });

    // Close sidebar when clicking outside
    profileOverlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      profileOverlay.classList.remove("show");
    });
  }

  // Department Page Filter Dropdown Logic
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const dropdownId = button.getAttribute("data-dropdown-id");
      const dropdown = document.getElementById(dropdownId);

      if (dropdown) {
        // Toggle only the clicked dropdown
        dropdown.style.display =
          dropdown.style.display === "block" ? "none" : "block";
      }
    });
  });

  // Prevent closing dropdown when interacting with options
  document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
    dropdown.addEventListener("click", (event) => {
      event.stopPropagation(); // Keep the dropdown open
    });
  });

  // Close all dropdowns when clicking outside
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-content").forEach((content) => {
      content.style.display = "none";
    });
  });

  // Listing Page Carousel Logic
  const carouselContainer = document.querySelector(".carousel-container");
  if (carouselContainer) {
    const carouselImages = document.querySelectorAll(".carousel-image");
    const prevArrow = document.querySelector(".carousel-prev");
    const nextArrow = document.querySelector(".carousel-next");
    const imageCounter = document.querySelector(".carousel-counter");

    let currentIndex = 0;

    const updateCarousel = () => {
      carouselImages.forEach((image, index) => {
        image.style.display = index === currentIndex ? "block" : "none";
      });
      if (imageCounter) {
        imageCounter.textContent = `${currentIndex + 1}/${carouselImages.length}`;
      }
    };

    if (prevArrow && nextArrow) {
      prevArrow.addEventListener("click", () => {
        currentIndex =
          (currentIndex - 1 + carouselImages.length) % carouselImages.length;
        updateCarousel();
      });

      nextArrow.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % carouselImages.length;
        updateCarousel();
      });

      updateCarousel(); // Initialize the carousel
    }
  }
});
