// DOM
const bookTableButton = document.getElementById("book-table-button");
const reservationModal = document.getElementById("reservation-modal");
const reservationForm = document.getElementById("reservation-form");
const reservationCloseButton = document.getElementById(
  "reservation-close-button",
);

// Form Fields
const nameInput = document.getElementById("reservation-name");

// Open Modal
function openReservationModal() {
  reservationModal.classList.add("active");
  document.body.classList.add("modal-open");
  nameInput.focus();
}

bookTableButton.addEventListener("click", openReservationModal);

// Close Modal
function closeReservationModal() {
  reservationModal.classList.remove("active");
  document.body.classList.remove("modal-open");
  bookTableButton.focus();
}

reservationModal.addEventListener("click", function (event) {
  if (event.target === reservationModal) {
    closeReservationModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && reservationModal.classList.contains("active")) {
    closeReservationModal();
  }
});

reservationCloseButton.addEventListener("click", closeReservationModal);

// Submit Reservation
