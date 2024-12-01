document.addEventListener("DOMContentLoaded", () => {
  
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

  
  const sidebar = document.getElementById("sidebar");
  const openSidebarButton = document.getElementById("openSidebar");
  const closeSidebarButton = document.getElementById("closeSidebar");

  if (sidebar && openSidebarButton && closeSidebarButton) {
    openSidebarButton.addEventListener("click", () => {
      sidebar.classList.add("open");
      profileOverlay.classList.add("show"); 
    });

    closeSidebarButton.addEventListener("click", () => {
      sidebar.classList.remove("open");
      profileOverlay.classList.remove("show");
    });

    
    profileOverlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      profileOverlay.classList.remove("show");
    });
  }

  
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const dropdownId = button.getAttribute("data-dropdown-id");
      const dropdown = document.getElementById(dropdownId);

      if (dropdown) {
        
        dropdown.style.display =
          dropdown.style.display === "block" ? "none" : "block";
      }
    });
  });

  // Prevent closing dropdown 
  document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
    dropdown.addEventListener("click", (event) => {
      event.stopPropagation(); // Keep the dropdown open
    });
  });


  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-content").forEach((content) => {
      content.style.display = "none";
    });
  });

  
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
  
  const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];
  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const listing = button.closest(".listing");
      const listingId = listing.dataset.id;

      
      if (likedItems.includes(listingId)) {
        likedItems.splice(likedItems.indexOf(listingId), 1);
        button.style.color = ""; 
      } else {
        likedItems.push(listingId);
        button.style.color = "red"; 
      }

      
      localStorage.setItem("likedItems", JSON.stringify(likedItems));
    });

    
    const listing = button.closest(".listing");
    if (likedItems.includes(listing.dataset.id)) {
      button.style.color = "red";
    }
  });

  
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

 
  let likedListings = JSON.parse(localStorage.getItem("likedListings")) || [];

  
  const updateLikedListings = () => {
    localStorage.setItem("likedListings", JSON.stringify(likedListings));
  };

  
  const renderLikedListings = () => {
    if (!likedListingsContainer) return;

    likedListingsContainer.innerHTML = "";

    if (likedListings.length === 0) {
      // Show message
      likedListingsContainer.innerHTML = `
        <p class="no-likes-message">Start liking listings, and they will appear here!</p>
      `;
    } else {
      // Display likes
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


  likeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const listingElement = button.closest(".listing");
      const listingId = parseInt(listingElement.dataset.id);

      // Check 
      const isLiked = likedListings.some(listing => listing.id === listingId);

      if (isLiked) {
        // Unlike 
        likedListings = likedListings.filter(listing => listing.id !== listingId);
        button.textContent = "♡ Like";
      } else {
        // Like 
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

    
    renderLikedListings();
  }
});
localStorage.removeItem("likedListings");
