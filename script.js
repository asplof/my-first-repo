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
document.addEventListener("DOMContentLoaded", () => {
  // Like button logic
  const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];
  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const listing = button.closest(".listing");
      const listingId = listing.dataset.id;

      // Toggle liked state
      if (likedItems.includes(listingId)) {
        likedItems.splice(likedItems.indexOf(listingId), 1);
        button.style.color = ""; // Reset to default
      } else {
        likedItems.push(listingId);
        button.style.color = "red"; // Highlight liked
      }

      // Save liked items to localStorage
      localStorage.setItem("likedItems", JSON.stringify(likedItems));
    });

    // Initialize button state
    const listing = button.closest(".listing");
    if (likedItems.includes(listing.dataset.id)) {
      button.style.color = "red";
    }
  });

  // Triple dot dropdown logic
  const dotsButtons = document.querySelectorAll(".dots-btn");

  dotsButtons.forEach((dotsButton) => {
    const dropdown = dotsButton.nextElementSibling;

    dotsButton.addEventListener("click", (event) => {
      event.stopPropagation();
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", () => {
      dropdown.style.display = "none";
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const likedListingsContainer = document.getElementById("liked-listings-container");
  const likeButtons = document.querySelectorAll(".like-btn");

  // Fetch liked listings from local storage
  let likedListings = JSON.parse(localStorage.getItem("likedListings")) || [];

  // Function to update the likes in localStorage
  const updateLikedListings = () => {
    localStorage.setItem("likedListings", JSON.stringify(likedListings));
  };

  // Function to render liked listings on the likes.html page
  const renderLikedListings = () => {
    if (!likedListingsContainer) return;

    likedListingsContainer.innerHTML = "";

    if (likedListings.length === 0) {
      // Show "no liked items" message
      likedListingsContainer.innerHTML = `
        <p class="no-likes-message">Start liking listings, and they will appear here!</p>
      `;
    } else {
      // Display liked listings
      likedListings.forEach(listing => {
        const listingElement = document.createElement("div");
        listingElement.classList.add("listing");

        listingElement.innerHTML = `
          <div class="listing-header">
            <img src="user.png" alt="User Profile" class="user-profile">
            <div class="user-details">
              <p class="username">${listing.username}</p>
              <span class="listing-life">${listing.listingLife}</span>
            </div>
          </div>
          <img src="${listing.image}" alt="Listing Image" class="listing-image">
          <div class="listing-content">
            <h3 class="item-name">${listing.itemName}</h3>
            <p class="price">${listing.price}</p>
            <p class="condition">${listing.condition}</p>
          </div>
          <div class="listing-footer">
            <button class="unlike-btn" data-id="${listing.id}">♥ Unlike</button>
          </div>
        `;
        likedListingsContainer.appendChild(listingElement);
      });
    }
  };

  // Function to handle "like" button click
  likeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const listingElement = button.closest(".listing");
      const listingId = parseInt(listingElement.dataset.id);

      // Check if the listing is already liked
      const isLiked = likedListings.some(listing => listing.id === listingId);

      if (isLiked) {
        // Unlike the listing
        likedListings = likedListings.filter(listing => listing.id !== listingId);
        button.textContent = "♡ Like";
      } else {
        // Like the listing
        const newListing = {
          id: listingId,
          username: listingElement.querySelector(".username").textContent,
          listingLife: listingElement.querySelector(".listing-life").textContent,
          image: listingElement.querySelector(".listing-image").src,
          itemName: listingElement.querySelector(".item-name").textContent,
          price: listingElement.querySelector(".price").textContent,
          condition: listingElement.querySelector(".condition").textContent
        };
        likedListings.push(newListing);
        button.textContent = "♥ Liked";
      }

      // Update localStorage
      updateLikedListings();
    });
  });

  // Handle "Unlike" button on the likes.html page
  if (likedListingsContainer) {
    likedListingsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("unlike-btn")) {
        const listingId = parseInt(e.target.dataset.id);
        likedListings = likedListings.filter(listing => listing.id !== listingId);
        updateLikedListings();
        renderLikedListings();
      }
    });

    // Render liked listings initially
    renderLikedListings();
  }
});
localStorage.removeItem("likedListings");
