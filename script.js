// DOM FOR RESERVATION MODAL
const bookTableButton = document.getElementById("book-table-button");
const reservationModal = document.getElementById("reservation-modal");
const reservationForm = document.getElementById("reservation-form");
const reservationCloseButton = document.getElementById(
  "reservation-close-button",
);

// DOM FOR APPLICATION MODAL
const workWithUsButton = document.getElementById("work-btn");
const applicationModal = document.getElementById("job-application-modal");
const applicationForm = document.getElementById("application-form");
const applicationCloseButton = document.getElementById(
  "application-close-button",
);

// DOM FOR MENU FILTERS
const filterButtons = document.querySelectorAll(".filter-button");
const menuCards = document.querySelectorAll(".card");

const successToast = document.getElementById("success-toast");
const successToastText = document.getElementById("success-toast-text");

// FORM FIELDS RESERVATION
const reservationNameInput = document.getElementById("reservation-name");
const reservationEmailInput = document.getElementById("reservation-email");
const reservationPhoneInput = document.getElementById("reservation-phone");
const reservationDateInput = document.getElementById("reservation-date");
const reservationTimeInput = document.getElementById("reservation-time");
const reservationGuestsInput = document.getElementById("reservation-guests");
const reservationRequestsInput = document.getElementById("reservation-request");

// FORM FIELDS APPLICATION
const applicationNameInput = document.getElementById("application-name");
const applicationEmailInput = document.getElementById("application-email");
const applicationPhoneInput = document.getElementById("application-phone");
const applicationPositionInput = document.getElementById(
  "application-position",
);
const applicationAboutInput = document.getElementById("application-about");
const applicationCvInput = document.getElementById("application-cv");

// RESERVATION DATE SETUP
const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

const todayFormatted = `${year}-${month}-${day}`;
reservationDateInput.min = todayFormatted;

// Prevent sunday reservations
reservationDateInput.addEventListener("change", function () {
  const selectedDate = new Date(reservationDateInput.value);
  const selectedDay = selectedDate.getDay();

  if (selectedDay === 0) {
    reservationDateInput.setCustomValidity(
      "Reservations are not available on Sundays.",
    );

    reservationTimeInput.disabled = true;
    reservationTimeInput.value = "";
  } else {
    reservationDateInput.setCustomValidity("");

    reservationTimeInput.disabled = false;
    reservationTimeInput.min = "08:00";

    if (selectedDay >= 1 && selectedDay <= 4) {
      reservationTimeInput.max = "22:30";
    } else {
      reservationTimeInput.max = "23:30";
    }

    reservationTimeInput.value = "";
  }
});

// Open Modals
function openReservationModal() {
  reservationModal.classList.add("active");
  document.body.classList.add("modal-open");
  reservationNameInput.focus();
}

bookTableButton.addEventListener("click", openReservationModal);

function openApplicationModal() {
  applicationModal.classList.add("active");
  document.body.classList.add("modal-open");
  applicationNameInput.focus();
}

workWithUsButton.addEventListener("click", openApplicationModal);

// Close Modals
function closeReservationModal() {
  reservationModal.classList.remove("active");
  document.body.classList.remove("modal-open");

  bookTableButton.focus();
}

function closeApplicationModal() {
  applicationModal.classList.remove("active");
  document.body.classList.remove("modal-open");

  workWithUsButton.focus();
}

reservationModal.addEventListener("click", function (event) {
  if (event.target === reservationModal) {
    closeReservationModal();
  }
});

applicationModal.addEventListener("click", function (event) {
  if (event.target === applicationModal) {
    closeApplicationModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key !== "Escape") return;

  if (reservationModal.classList.contains("active")) {
    closeReservationModal();
  }

  if (applicationModal.classList.contains("active")) {
    closeApplicationModal();
  }
});

reservationCloseButton.addEventListener("click", closeReservationModal);
applicationCloseButton.addEventListener("click", closeApplicationModal);

function showSuccessMessage(message) {
  successToastText.textContent = message;
  successToast.classList.add("active");

  setTimeout(function () {
    successToast.classList.remove("active");
  }, 5000);
}

// Submit Reservation
reservationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Read values
  const formData = new FormData(reservationForm);

  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const phone = formData.get("phone").trim();
  const date = formData.get("reservation-date");
  const time = formData.get("time");
  const guests = formData.get("guests");
  const requests = formData.get("request").trim();

  const reservation = {
    name,
    email,
    phone,
    date,
    time,
    guests,
    requests,
  };

  reservationForm.reset();
  closeReservationModal();

  showSuccessMessage("Reservation request submitted successfully!");
});

// Submit Application
applicationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Read values
  const formData = new FormData(applicationForm);

  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const phone = formData.get("phone").trim();
  const employmentType = formData.get("employment-type");
  const position = formData.get("position");
  const about = formData.get("about").trim();
  const cv = formData.get("cv");

  const application = {
    name,
    email,
    phone,
    employmentType,
    position,
    about,
    cv,
  };

  applicationForm.reset();
  closeApplicationModal();

  showSuccessMessage("Application submitted successfully!");
});

// Filter cards
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedFilter = button.dataset.filter;

    // Update active filter button
    filterButtons.forEach(function (filterButton) {
      filterButton.classList.remove("active");
      filterButton.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    // Filter menu cards
    menuCards.forEach(function (card) {
      const isDrinkCard = card.closest("#drinks-spirits");

      if (selectedFilter === "all" || isDrinkCard) {
        card.style.display = "";
      } else {
        const matchingTag = card.querySelector(`.tag.${selectedFilter}`);

        if (matchingTag) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      }
    });
  });
});
