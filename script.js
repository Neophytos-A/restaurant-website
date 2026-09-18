// DOM
const bookTableButton = document.getElementById("book-table-button");
const reservationModal = document.getElementById("reservation-modal");
const reservationForm = document.getElementById("reservation-form");
const reservationCloseButton = document.getElementById(
  "reservation-close-button",
);
const reservationMessage = document.getElementById("reservation-message");

// FORM FIELDS
const reservationNameInput = document.getElementById("reservation-name");
const reservationEmailInput = document.getElementById("reservation-email");
const reservationPhoneInput = document.getElementById("reservation-phone");
const reservationDateInput = document.getElementById("reservation-date");
const reservationTimeInput = document.getElementById("reservation-time");
const reservationGuestsInput = document.getElementById("reservation-guests");
const reservationRequestsInput = document.getElementById("reservation-request");

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

  if (selectedDate.getDay() === 0) {
    reservationDateInput.setCustomValidity(
      "Reservations are not available on Sundays.",
    );
  } else {
    reservationDateInput.setCustomValidity = "";
  }
});

// Open Modal
function openReservationModal() {
  reservationModal.classList.add("active");
  document.body.classList.add("modal-open");
  reservationNameInput.focus();
}

bookTableButton.addEventListener("click", openReservationModal);

// Close Modal
function closeReservationModal() {
  reservationModal.classList.remove("active");
  document.body.classList.remove("modal-open");
  reservationMessage.textContent = "";
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

  console.log(reservation);

  reservationMessage.textContent =
    "Reservation request submitted successfully!";

  reservationMessage.classList.add("active");

  reservationForm.reset();
});
