# Olive & Oregano

A responsive frontend website for a fictional Cypriot restaurant, built with **HTML, CSS, and JavaScript**.

The project focuses on responsive design, interactive UI components, accessibility, form handling and a dynamic restaurant menu.

## Features

- Responsive layout for desktop, tablet, and mobile
- Desktop and mobile navigation
- Hamburger menu for smaller screens
- Interactive restaurant menu
- Dietary menu filters:
  - All
  - Vegetarian
  - Meat
  - Fish
- Sticky menu category navigation
- Active section highlighting while scrolling
- Reservation modal
- Reservation date and time validation
- Sunday reservation restriction
- Different reservation time limits depending on the day
- Job application modal
- CV file input
- Success notifications after form submission
- Promotional Meze offer
- Promotional offer displayed once per browser session
- Responsive food-card grid
- Mobile-friendly footer
- Keyboard support for closing menus, modals, and promotional messages
- Reduced-motion support for users who prefer less animation

## Technologies Used

- HTML5
- CSS3
- JavaScript
- CSS Grid
- Flexbox
- CSS Media Queries
- Font Awesome
- Google Fonts
- Web Storage API (`sessionStorage`)
- Intersection Observer API

No frameworks or external JavaScript libraries were used.

## Pages

### Home Page

The home page includes:

- Restaurant navigation
- Hero section
- Featured desserts
- Cypriot wine section
- Opening hours
- Contact information
- Social media area
- Reservation form
- Job application form

### Menu Page

The menu contains several categories:

- Meze
- Breakfast
- Lunch & Dinner
- Kids Menu
- Drinks & Spirits

The menu also includes dietary filtering and responsive food cards.

## Menu Filtering

Users can filter menu items by dietary category:

- **VEG**
- **MEAT**
- **FISH**

JavaScript dynamically shows and hides menu cards depending on the selected filter.

The Drinks & Spirits section remains visible regardless of the dietary filter.

## Reservation System

The reservation form includes frontend validation for:

- Name
- Email
- Phone
- Date
- Time
- Number of guests
- Special requests

Reservations cannot be selected for Sundays.

Available reservation times are also adjusted depending on the selected day.

> This project currently demonstrates frontend form behaviour only. Reservation information is not sent to a backend or stored in a database.

## Job Application Form

Visitors can also open a **Work With Us** form containing:

- Personal information
- Employment type
- Position selection
- About section
- Optional CV upload

Like the reservation form, submission is currently simulated on the frontend.

## Promotional Offer

The menu page includes a promotional Meze offer:

**20% OFF MEZE — Every Tuesday**

The offer:

- Appears shortly after visiting the menu
- Automatically disappears
- Can be manually closed
- Is shown only once per browser session using `sessionStorage`

## Responsive Design

The website was designed for multiple screen sizes.

The menu grid changes depending on the available width:

- Desktop: **4 columns**
- Tablet: **2 columns**
- Mobile: **1 column**

Navigation, footer content, forms, images, menu categories, promotional messages, and success notifications also adapt for smaller screens.

## Accessibility

The project includes several accessibility improvements:

- Semantic HTML elements
- Form labels
- ARIA labels
- `aria-current` for active navigation pages
- `aria-expanded` for the mobile navigation
- `aria-pressed` for menu filter buttons
- Dialog roles for modal windows
- Keyboard focus styles
- Escape-key support
- Decorative icons hidden from screen readers where appropriate
- Live success notifications using `aria-live`
- Reduced-motion support

## Running the Project Locally

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Open the project folder.

3. Open `index.html` in your browser.

You can also use an extension such as **Live Server** in Visual Studio Code.

## Screenshots

Screenshots will be added after the final deployed version is completed.

### Desktop

`Coming soon`

### Mobile

`Coming soon`

## Live Demo

**Coming soon — the project will be deployed using GitHub Pages.**

## What I Learned

While building this project, I practiced and improved my understanding of:

- Structuring multi-page websites with semantic HTML
- Building responsive layouts using Flexbox and CSS Grid
- Creating reusable CSS styles
- Working with responsive breakpoints
- Building modal interfaces
- DOM manipulation
- JavaScript event listeners
- Form validation
- Filtering UI content
- Working with `sessionStorage`
- Using `IntersectionObserver`
- Managing accessibility states with ARIA
- Building responsive mobile navigation
- Debugging layout and responsive-design issues
- Organizing a frontend project for a portfolio

## Future Improvements

Possible future improvements include:

- Connect the reservation form to a backend
- Store reservations in a database
- Connect the job application form to a backend
- Add real restaurant social-media links
- Add Gallery and About Us sections
- Improve reservation availability based on existing bookings
- Add automated form confirmation emails

## Project Status

**Frontend complete — final testing and deployment in progress.**

---

Built as a frontend portfolio project using HTML, CSS, and JavaScript.
