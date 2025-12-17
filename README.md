# Recipe Finder Ionic App

Student ID: G00439461  
Module: 25-26: 9149 – Mobile Applications Development  
Project Type: Final Project  

---

## Project Overview

This project is a Recipe Finder mobile application developed using Ionic and Angular.

The application allows users to:
- Search for recipes using one or more ingredients
- View detailed recipe information
- Save and manage favourite recipes
- Choose between Metric and US measurement systems
- Persist user preferences and favourites using browser localStorage

The app consumes the Spoonacular REST API to retrieve real recipe data.

---

## Features

### Core Features (Assignment Requirements)
- Ionic + Angular standalone application
- Recipe search using an external REST API
- Recipe details page with ingredients and instructions
- Parameterised routing (/recipe/:id)
- Favourites functionality (add, remove, list)
- Settings page for measurement units
- Persistent storage using browser localStorage
- Error handling and loading indicators
- Navigation between pages using Angular Router

### Enhancements
- Global application header with ATU branding and navigation
- Welcome instructions on the Home page
- Numbered cooking steps using analyzedInstructions
- Toast messages for favourite add/remove feedback
- Improved UX with spinners and empty-state messages
- Defensive coding for API access and storage handling

---

## Technologies Used

- Ionic Framework (Standalone Components)
- Angular
- TypeScript
- HTML
- SCSS
- Spoonacular Food API
- Browser localStorage

---

## How to Run the Application

From the command prompt:

1. Install dependencies:
   npm install

2. Start the development server:
   ionic serve

3. Open in browser (the server usually opens this automatically):
   http://localhost:8100

---

## Tested Scenarios

- Search using a single ingredient
- Search using multiple ingredients (comma-separated)
- Empty search input validation
- No results returned from API
- View recipe details by ID
- Add and remove favourites
- Persist favourites after page refresh
- Change measurement settings and reload app
- API loading and error handling

---

## Known Limitations

- Spoonacular API usage depends on external availability and rate limits
- Some recipes may not include structured step-by-step instructions
- Nutritional information is not displayed

---

## Repository

The full source code for this project is available on GitHub:
https://github.com/G00439461/G00439461

---

## Notes

- The project was developed and tested using Visual Studio Code
- All required functionality has been implemented
- Additional enhancements were added to improve usability and presentation
