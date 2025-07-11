# 🌍 WanderLust

**WanderLust** is a full-stack travel accommodation web application inspired by platforms like Airbnb. Users can explore, create, review, and manage property listings from around the world.

🔗 **Live Demo**: [https://wanderlust-zox7.onrender.com/listings](https://wanderlust-zox7.onrender.com/listings)

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: EJS Templating, Bootstrap, Vanilla JS
- **Authentication**: Passport.js (Local Strategy)
- **Geocoding & Maps**: MapTiler API
- **Image Uploads**: Cloudinary
- **Styling**: CSS, Bootstrap
- **Others**: Express-Session, Connect-Flash, Method-Override, Multer

---

## ✨ Features

- 🏡 **Listings**: Browse, view, create, edit, and delete property listings
- 📍 **Location Mapping**: Interactive map view using coordinates from MapTiler
- 📸 **Image Uploads**: Upload and display images via Cloudinary
- 💬 **Reviews**: Add and delete reviews for listings
- 👤 **User Authentication**: Sign up, login, logout
- 🔐 **Authorization**: Listing and review actions are protected based on ownership
- ⚠️ **Error Handling**: Custom client/server-side error handling with user-friendly messages

---

## 📂 Project Structure

```
WanderLust/
├── controllers/        # Route logic for listings, reviews, users
├── models/             # Mongoose schemas
├── views/              # EJS templates
├── public/             # Static assets (CSS, JS)
├── Routes/             # Route definitions
├── utils/              # Utilities (geocoding, async wrapper, etc.)
├── init/               # Sample data seeding
├── app.js              # Entry point of the app
├── middleware.js       # Custom middleware functions
├── cloudConfig.js      # Cloudinary configuration
├── schema.js           # Joi validation schemas
├── .env.sample         # Example environment file
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/AnkitMishra2006/WanderLust.git
cd WanderLust
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file based on `.env.sample` and add your keys:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MAPTILER_API_KEY=your_maptiler_key
SESSION_SECRET=your_session_secret
```

### 4. Seed Sample Data (Optional)
```bash
node init/index.js
```

### 5. Start the Development Server
```bash
npm run dev
```

Visit `http://localhost:3000/listings`

---

## 🖼️ Screenshots

> *(Include screenshots of homepage, listing view, map integration, reviews, etc. if desired)*

---

## 🤝 Author

**Ankit Mishra**

- GitHub: [@AnkitMishra2006](https://github.com/AnkitMishra2006)
- Email: ankit.kumar.mishra2006@gmail.com

---

## 📃 License

This project is licensed under the MIT License.
