// ======================================================
// DOM ELEMENTS
// ======================================================

// Reservation modal
const bookTableButton = document.getElementById("book-table-button");
const mobileBookTableButton = document.getElementById(
  "mobile-book-table-button",
);
const reservationModal = document.getElementById("reservation-modal");
const reservationForm = document.getElementById("reservation-form");
const reservationCloseButton = document.getElementById(
  "reservation-close-button",
);

const reservationNameInput = document.getElementById("reservation-name");
const reservationDateInput = document.getElementById("reservation-date");
const reservationTimeInput = document.getElementById("reservation-time");

// Application modal
const workWithUsButton = document.getElementById("work-btn");
const applicationModal = document.getElementById("job-application-modal");
const applicationForm = document.getElementById("application-form");
const applicationCloseButton = document.getElementById(
  "application-close-button",
);

const applicationNameInput = document.getElementById("application-name");

// Success toast
const successToast = document.getElementById("success-toast");
const successToastText = document.getElementById("success-toast-text");

// Menu filtering and scroll-spy
const menuSections = document.querySelectorAll(".menu-section");
const menuCategoryLinks = document.querySelectorAll(".menu-category-nav a");
const filterButtons = document.querySelectorAll(".filter-button");
const menuCards = document.querySelectorAll(".card");

// Meze promotional offer
const mezeOffer = document.getElementById("meze-offer");
const offerCloseButton = document.getElementById("offer-close-button");

// Mobile navigation
const hamburgerButton = document.getElementById("hamburger-button");
const mobileMenu = document.getElementById("mobile-menu");

const hamburgerIcon = hamburgerButton
  ? hamburgerButton.querySelector("i")
  : null;

// ======================================================
// RESERVATION DATE AND TIME
// ======================================================

// Reset the time field to its initial state
function resetReservationTimeInput() {
  if (!reservationTimeInput) return;

  reservationTimeInput.disabled = true;
  reservationTimeInput.value = "";

  reservationTimeInput.removeAttribute("min");
  reservationTimeInput.removeAttribute("max");
}

// Set today's date as the earliest available reservation date
if (reservationDateInput && reservationTimeInput) {
  const today = new Date();

  const todayFormatted =
    `${today.getFullYear()}-` +
    `${String(today.getMonth() + 1).padStart(2, "0")}-` +
    `${String(today.getDate()).padStart(2, "0")}`;

  reservationDateInput.min = todayFormatted;

  // Update available reservation times when a date is selected
  reservationDateInput.addEventListener("change", function () {
    // Handle the date being cleared
    if (!reservationDateInput.value) {
      reservationDateInput.setCustomValidity("");
      resetReservationTimeInput();

      return;
    }

    // Convert YYYY-MM-DD into local date values
    const [selectedYear, selectedMonth, selectedDate] =
      reservationDateInput.value.split("-").map(Number);

    const selectedDay = new Date(
      selectedYear,
      selectedMonth - 1,
      selectedDate,
    ).getDay();

    // Sunday = 0
    if (selectedDay === 0) {
      reservationDateInput.setCustomValidity(
        "Reservations are not available on Sundays.",
      );

      resetReservationTimeInput();

      return;
    }

    // Valid reservation day
    reservationDateInput.setCustomValidity("");

    reservationTimeInput.disabled = false;
    reservationTimeInput.min = "08:00";

    // Monday - Thursday
    if (selectedDay >= 1 && selectedDay <= 4) {
      reservationTimeInput.max = "22:30";
    } else {
      // Friday - Saturday
      reservationTimeInput.max = "23:30";
    }

    // Clear the previous time whenever the date changes
    reservationTimeInput.value = "";
  });
}

// ======================================================
// RESERVATION MODAL
// ======================================================

let lastReservationTrigger = bookTableButton;

// Open reservation modal
function openReservationModal(triggerButton) {
  if (!reservationModal || !reservationNameInput) return;

  lastReservationTrigger = triggerButton || bookTableButton || hamburgerButton;

  reservationModal.classList.add("active");
  document.body.classList.add("modal-open");

  reservationNameInput.focus();
}

// Close reservation modal
function closeReservationModal() {
  if (!reservationModal) return;

  reservationModal.classList.remove("active");
  document.body.classList.remove("modal-open");

  if (lastReservationTrigger) {
    lastReservationTrigger.focus();
  }
}

// Desktop Book a Table button
if (bookTableButton) {
  bookTableButton.addEventListener("click", function () {
    openReservationModal(bookTableButton);
  });
}

// Mobile Book a Table button
if (mobileBookTableButton) {
  mobileBookTableButton.addEventListener("click", function () {
    closeMobileMenu();

    openReservationModal(hamburgerButton || mobileBookTableButton);
  });
}

// Close reservation modal with X button
if (reservationCloseButton) {
  reservationCloseButton.addEventListener("click", closeReservationModal);
}

// Close reservation modal by clicking the overlay
if (reservationModal) {
  reservationModal.addEventListener("click", function (event) {
    if (event.target === reservationModal) {
      closeReservationModal();
    }
  });
}

// ======================================================
// APPLICATION MODAL
// ======================================================

// Open application modal
function openApplicationModal() {
  if (!applicationModal || !applicationNameInput) return;

  applicationModal.classList.add("active");
  document.body.classList.add("modal-open");

  applicationNameInput.focus();
}

// Close application modal
function closeApplicationModal() {
  if (!applicationModal) return;

  applicationModal.classList.remove("active");
  document.body.classList.remove("modal-open");

  if (workWithUsButton) {
    workWithUsButton.focus();
  }
}

// Open application modal
if (workWithUsButton) {
  workWithUsButton.addEventListener("click", openApplicationModal);
}

// Close application modal with X button
if (applicationCloseButton) {
  applicationCloseButton.addEventListener("click", closeApplicationModal);
}

// Close application modal by clicking the overlay
if (applicationModal) {
  applicationModal.addEventListener("click", function (event) {
    if (event.target === applicationModal) {
      closeApplicationModal();
    }
  });
}

// ======================================================
// KEYBOARD CONTROLS
// ======================================================

document.addEventListener("keydown", function (event) {
  if (event.key !== "Escape") return;

  // Close reservation modal
  if (reservationModal && reservationModal.classList.contains("active")) {
    closeReservationModal();
  }

  // Close application modal
  if (applicationModal && applicationModal.classList.contains("active")) {
    closeApplicationModal();
  }

  // Close mobile navigation
  if (mobileMenu && mobileMenu.classList.contains("active")) {
    closeMobileMenu();
  }

  // Close Meze offer
  if (mezeOffer && mezeOffer.classList.contains("active")) {
    mezeOffer.classList.remove("active");
  }
});

// ======================================================
// SUCCESS TOAST
// ======================================================

let successToastTimer;

// Display a temporary success message
function showSuccessMessage(message) {
  if (!successToast || !successToastText) return;

  // Prevent an older timer from hiding a newer message
  clearTimeout(successToastTimer);

  successToastText.textContent = message;
  successToast.classList.add("active");

  successToastTimer = setTimeout(function () {
    successToast.classList.remove("active");
  }, 5000);
}

// ======================================================
// RESERVATION FORM SUBMISSION
// ======================================================

if (reservationForm) {
  reservationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    /*
      In a real application, the reservation data
      would be sent to a backend here.
    */

    reservationForm.reset();

    reservationDateInput.setCustomValidity("");
    resetReservationTimeInput();

    closeReservationModal();

    showSuccessMessage("Reservation request submitted successfully!");
  });
}

// ======================================================
// APPLICATION FORM SUBMISSION
// ======================================================

if (applicationForm) {
  applicationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    /*
      In a real application, the application data
      and CV would be sent to a backend here.
    */

    applicationForm.reset();

    closeApplicationModal();

    showSuccessMessage("Application submitted successfully!");
  });
}

// ======================================================
// MENU FILTERING
// ======================================================

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedFilter = button.dataset.filter;

    // Reset all filter buttons
    filterButtons.forEach(function (filterButton) {
      filterButton.classList.remove("active");

      filterButton.setAttribute("aria-pressed", "false");
    });

    // Activate the clicked filter
    button.classList.add("active");

    button.setAttribute("aria-pressed", "true");

    // Show or hide menu cards
    menuCards.forEach(function (card) {
      const isDrinkCard = card.closest("#drinks-spirits");

      // Always show drinks and show everything for ALL
      if (selectedFilter === "all" || isDrinkCard) {
        card.style.display = "";

        return;
      }

      // Look for the selected dietary tag inside the card
      const matchingTag = card.querySelector(`.tag.${selectedFilter}`);

      if (matchingTag) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ======================================================
// MENU SCROLL-SPY
// ======================================================

if (menuSections.length > 0 && menuCategoryLinks.length > 0) {
  const observerOptions = {
    root: null,
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const sectionId = entry.target.id;

      // Remove active state from all category links
      menuCategoryLinks.forEach(function (link) {
        link.classList.remove("active");
      });

      // Find the link connected to the visible section
      const activeLink = document.querySelector(
        `.menu-category-nav a[href="#${sectionId}"]`,
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }
    });
  }, observerOptions);

  // Observe every main menu section
  menuSections.forEach(function (section) {
    sectionObserver.observe(section);
  });
}

// ======================================================
// MEZE PROMOTIONAL OFFER
// ======================================================

if (mezeOffer && offerCloseButton) {
  const offerWasShown = sessionStorage.getItem("mezeOfferShown");

  // Show the offer only once per browser session
  if (!offerWasShown) {
    setTimeout(function () {
      mezeOffer.classList.add("active");

      sessionStorage.setItem("mezeOfferShown", "true");

      // Hide the offer after 7 seconds
      setTimeout(function () {
        mezeOffer.classList.remove("active");
      }, 7000);
    }, 2000);
  }

  // Close the offer manually
  offerCloseButton.addEventListener("click", function () {
    mezeOffer.classList.remove("active");
  });
}

// ======================================================
// MOBILE NAVIGATION
// ======================================================

// Update the complete mobile-menu state
function setMobileMenuState(isOpen) {
  if (!hamburgerButton || !mobileMenu) return;

  if (isOpen) {
    mobileMenu.classList.add("active");

    hamburgerButton.setAttribute("aria-expanded", "true");

    hamburgerButton.setAttribute("aria-label", "Close navigation menu");

    if (hamburgerIcon) {
      hamburgerIcon.classList.remove("fa-bars");
      hamburgerIcon.classList.add("fa-xmark");
    }
  } else {
    mobileMenu.classList.remove("active");

    hamburgerButton.setAttribute("aria-expanded", "false");

    hamburgerButton.setAttribute("aria-label", "Open navigation menu");

    if (hamburgerIcon) {
      hamburgerIcon.classList.remove("fa-xmark");
      hamburgerIcon.classList.add("fa-bars");
    }
  }
}

// Close mobile menu
function closeMobileMenu() {
  setMobileMenuState(false);
}

// Toggle mobile menu
if (hamburgerButton && mobileMenu) {
  hamburgerButton.addEventListener("click", function () {
    const menuIsOpen = !mobileMenu.classList.contains("active");

    setMobileMenuState(menuIsOpen);
  });

  // Close mobile menu after clicking a navigation link
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");

  mobileMenuLinks.forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close mobile menu when returning to desktop size
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}
