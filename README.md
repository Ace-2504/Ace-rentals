# Ace Rentals

Ace Rentals is a full-stack web application built with Node.js and Express, designed for listing and renting properties such as homes, apartments, or vacation spots. Users can create listings with images and location data, browse available rentals, leave reviews, and manage their accounts securely.

This project is inspired by platforms like Airbnb, focusing on property rentals with features like user authentication, image uploads, geocoding for locations, and review systems.

## Features

- **User Authentication**: Signup, login, and logout with secure password handling using Passport.js.
- **Property Listings**: Create, view, edit, and delete rental listings with details like title, description, price, location, and images.
- **Image Uploads**: Upload and store images using Cloudinary for seamless media management.
- **Geocoding**: Integrate Mapbox to convert location strings into map coordinates for better visualization.
- **Reviews System**: Users can leave ratings and comments on listings, with author verification.
- **Responsive UI**: Built with EJS templates and Bootstrap for a clean, mobile-friendly interface.
- **Validation**: Server-side validation using Joi to ensure data integrity.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js (local strategy with passport-local-mongoose)
- **File Uploads**: Multer with Cloudinary storage
- **Geocoding**: Mapbox SDK
- **Validation**: Joi
- **Templating**: EJS with ejs-mate
- **Session Management**: express-session with connect-flash for messages
- **Other**: method-override for PUT/DELETE, dotenv for environment variables

## Repository Layout

- `app.js` — Main application entry point, middleware setup, and route mounting.
- `controllers/` — Business logic for listings, reviews, and users.
- `routes/` — Express routers mapping endpoints to controllers.
- `models/` — Mongoose schemas for Listing, Review, and User.
- `views/` — EJS templates for rendering pages.
- `public/` — Static assets (CSS, JS, images).
- `middlewares.js` — Custom middleware for authentication, validation, and ownership checks.
- `cloudConfig.js` — Cloudinary configuration for image uploads.
- `schema.js` — Joi validation schemas.
- `utils/` — Helper functions like error handling and async wrappers.

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/[your-github-username]/ace-rentals.git
   cd ace-rentals
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Copy `.env.example` to `.env` and fill in your actual API keys and secrets:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your values

   Alternatively, for deployment, set these as environment variables in your hosting platform (e.g., Heroku, Vercel).

4. **Start MongoDB** (ensure it's running locally or update `MONGO_URI` for a remote instance).

5. **Run the application**:
   ```bash
   npm start  # or node app.js
   ```
   For development with auto-restart:
   ```bash
   npm run dev  # if you add nodemon script
   ```

6. **Access the app**:
   Open `http://localhost:8080` in your browser.

## Usage

- **Signup/Login**: Create an account or log in to access listing features.
- **Browse Listings**: View all available rentals on the homepage.
- **Create a Listing**: Add a new property with images and location details.
- **Edit/Delete Listings**: Owners can modify or remove their listings.
- **Leave Reviews**: Authenticated users can rate and comment on listings.

## API Endpoints (Overview)

- `GET /listings` — View all listings
- `POST /listings` — Create a new listing (auth required)
- `GET /listings/:id` — View a specific listing
- `PUT /listings/:id` — Update a listing (owner only)
- `DELETE /listings/:id` — Delete a listing (owner only)
- `POST /listings/:id/reviews` — Add a review (auth required)
- `DELETE /listings/:id/reviews/:reviewId` — Delete a review (author only)
- `GET /signup`, `POST /signup` — User registration
- `GET /login`, `POST /login` — User login
- `GET /logout` — User logout

## Future Features

- **Two-Factor Authentication (2FA)**: Enhance security with SMS or app-based 2FA for user logins.
- **Booking System**: Implement a reservation system for users to book rentals with date selection, availability checks, and confirmation.
- **Payment Integration**: Add Stripe or PayPal for booking and payments.
- **Advanced Search & Filters**: Implement filters by price, location, amenities, and date ranges.
- **Mobile App**: Develop a React Native or Flutter app for mobile access.
- **Admin Dashboard**: Create an admin panel for managing users and listings.
- **Email Notifications**: Send confirmation emails for bookings and reviews.
- **Real-time Chat**: Integrate WebSockets for messaging between renters and owners.
- **Analytics**: Add user behavior tracking and reporting.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Acknowledgments

- Built as part of a JavaScript course project.
- Inspired by travel and rental platforms like Airbnb.
- Thanks to the open-source community for libraries like Express, Mongoose, and Passport.
