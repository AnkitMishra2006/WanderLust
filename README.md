# 🌍 WanderLust

**WanderLust** is a comprehensive full-stack travel accommodation web application inspired by platforms like Airbnb. Built with modern web technologies, it allows users to explore, create, review, and manage property listings from around the world with interactive maps, secure authentication, and cloud-based image storage.

🔗 **Live Demo**: [https://wanderlust-zox7.onrender.com/listings](https://wanderlust-zox7.onrender.com/listings)

---

## 🎯 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Middleware & Security](#-middleware--security)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## ✨ Features

### 🏡 **Property Management**

- Browse and search through property listings
- Create new property listings with detailed information
- Edit and update existing listings (owner-only)
- Delete listings with cascade review deletion
- Image upload and management via Cloudinary

### 📍 **Location & Mapping**

- Interactive map integration using MapTiler API
- Automatic geocoding of property locations
- Coordinate-based location storage
- Location-based property display

### 💬 **Review System**

- Add detailed reviews and ratings for properties
- Star-based rating system
- Delete reviews (author-only)
- Review ownership protection

### 👤 **User Authentication & Authorization**

- Secure user registration and login
- Password hashing with Passport.js Local Strategy
- Session-based authentication
- Protected routes and ownership validation
- Automatic redirect after login

### 🔒 **Security Features**

- Input validation with Joi schemas
- CSRF protection with express-session
- Secure cookie configuration
- MongoDB session storage
- Environment-based configuration

### 🎨 **User Experience**

- Responsive design with Bootstrap
- Flash messages for user feedback
- Client-side and server-side validation
- Error handling with custom error pages
- Search functionality

---

## 🛠️ Tech Stack

### **Backend**

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### **Frontend**

- **EJS** - Embedded JavaScript templating
- **Bootstrap 5** - CSS framework for responsive design
- **Vanilla JavaScript** - Client-side interactivity
- **Font Awesome** - Icons and visual elements

### **Authentication & Security**

- **Passport.js** - Authentication middleware
- **passport-local** - Local authentication strategy
- **passport-local-mongoose** - Mongoose plugin for Passport
- **express-session** - Session middleware
- **connect-mongo** - MongoDB session store
- **connect-flash** - Flash message middleware

### **File Upload & Storage**

- **Cloudinary** - Cloud-based image storage and management
- **Multer** - Multipart form data handling
- **multer-storage-cloudinary** - Cloudinary storage engine for Multer

### **API Integration**

- **MapTiler API** - Geocoding and mapping services
- **Axios** - HTTP client for API requests

### **Validation & Utilities**

- **Joi** - Object schema validation
- **method-override** - HTTP method override middleware
- **dotenv** - Environment variable management
- **cookie-parser** - Cookie parsing middleware

---

## 📂 Project Structure

```
WanderLust/
├── 📁 controllers/           # Business logic layer
│   ├── listing.js           # Listing CRUD operations
│   ├── review.js            # Review management
│   └── user.js              # User authentication logic
├── 📁 models/               # Database schemas
│   ├── listing.js           # Listing model with coordinates
│   ├── review.js            # Review model with ratings
│   └── user.js              # User model with Passport integration
├── 📁 views/                # EJS templates
│   ├── Error.ejs            # Error page template
│   ├── 📁 includes/         # Reusable components
│   │   ├── flash.ejs        # Flash message component
│   │   ├── footer.ejs       # Footer component
│   │   └── navbar.ejs       # Navigation component
│   ├── 📁 layouts/          # Layout templates
│   │   └── boilerplate.ejs  # Main layout template
│   ├── 📁 listings/         # Listing-related templates
│   │   ├── edit.ejs         # Edit listing form
│   │   ├── index.ejs        # Listings grid view
│   │   ├── new.ejs          # Create listing form
│   │   └── show.ejs         # Listing detail view
│   └── 📁 users/            # User-related templates
│       ├── login.ejs        # Login form
│       └── signup.ejs       # Registration form
├── 📁 public/               # Static assets
│   ├── 📁 css/              # Stylesheets
│   │   ├── rating.css       # Star rating styles
│   │   └── style.css        # Main application styles
│   └── 📁 js/               # Client-side JavaScript
│       └── script.js        # Main JavaScript file
├── 📁 Routes/               # API route definitions
│   ├── listing.js           # Listing routes (/listings)
│   ├── review.js            # Review routes (/listings/:id/reviews)
│   └── user.js              # User routes (/signup, /login, /logout)
├── 📁 utils/                # Utility functions
│   ├── ExpressError.js      # Custom error handling class
│   ├── geocodeing.js        # MapTiler API integration
│   └── wrapAsync.js         # Async error wrapper
├── 📁 init/                 # Database initialization
│   ├── data.js              # Sample listing data
│   └── index.js             # Database seeding script
├── 📄 app.js                # Main application entry point
├── 📄 middleware.js         # Custom middleware functions
├── 📄 cloudConfig.js        # Cloudinary configuration
├── 📄 schema.js             # Joi validation schemas
├── 📄 package.json          # Dependencies and scripts
└── 📄 README.md             # Project documentation
```

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js (v22.14.0 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### **1. Clone the Repository**

```bash
git clone https://github.com/AnkitMishra2006/WanderLust.git
cd WanderLust
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Set Up Environment Variables**

Create a `.env` file in the root directory:

```env
# Database Configuration
MONGO_URL=mongodb://localhost:27017/wanderlust

# Session Configuration
SESSION_SECRET=your_super_secret_session_key

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# MapTiler Configuration
MAPTILER_API_KEY=your_maptiler_api_key

# Environment
NODE_ENV=development
```

### **4. Database Setup**

Initialize the database with sample data:

```bash
node init/index.js
```

### **5. Start the Development Server**

```bash
node app.js
```

The application will be available at: `http://localhost:8080`

---

## 🔧 Environment Variables

| Variable           | Description                               | Required |
| ------------------ | ----------------------------------------- | -------- |
| `MONGO_URL`        | MongoDB connection string                 | ✅       |
| `SESSION_SECRET`   | Secret key for session encryption         | ✅       |
| `CLOUD_NAME`       | Cloudinary cloud name                     | ✅       |
| `CLOUD_API_KEY`    | Cloudinary API key                        | ✅       |
| `CLOUD_API_SECRET` | Cloudinary API secret                     | ✅       |
| `MAPTILER_API_KEY` | MapTiler API key for geocoding            | ✅       |
| `NODE_ENV`         | Environment mode (development/production) | ⭕       |

---

## 🛣️ API Endpoints

### **Authentication Routes**

```
GET  /signup          # Render signup form
POST /signup          # Create new user account
GET  /login           # Render login form
POST /login           # Authenticate user
GET  /logout          # Logout user
```

### **Listing Routes**

```
GET    /listings           # Get all listings
GET    /listings/new       # Render create listing form
POST   /listings           # Create new listing
GET    /listings/:id       # Get specific listing
GET    /listings/:id/edit  # Render edit listing form
PUT    /listings/:id       # Update specific listing
DELETE /listings/:id       # Delete specific listing
```

### **Review Routes**

```
POST   /listings/:id/reviews           # Create review for listing
DELETE /listings/:id/reviews/:reviewId # Delete specific review
```

---

## 🗄️ Database Schema

### **User Model**

```javascript
{
  username: String (required, unique),
  email: String (required),
  // password fields handled by passport-local-mongoose
}
```

### **Listing Model**

```javascript
{
  title: String (required),
  description: String,
  image: {
    url: String,
    filename: String
  },
  price: Number,
  location: String,
  country: String,
  coordinates: [Number], // [longitude, latitude]
  reviews: [ObjectId] (ref: Review),
  owner: ObjectId (ref: User)
}
```

### **Review Model**

```javascript
{
  comment: String (required),
  rating: Number (1-5, required),
  createdAt: Date (default: Date.now),
  author: ObjectId (ref: User)
}
```

---

## 🛡️ Middleware & Security

### **Authentication Middleware**

- `isLoggedIn`: Protects routes requiring authentication
- `saveRedirectUrl`: Saves original URL for post-login redirect

### **Authorization Middleware**

- `isOwner`: Ensures only listing owners can edit/delete
- `isReviewAuthor`: Ensures only review authors can delete reviews

### **Validation Middleware**

- `validateListing`: Joi schema validation for listing data
- `validateReview`: Joi schema validation for review data

### **Security Features**

- Password hashing with salt
- Session-based authentication
- CSRF protection
- Secure cookie configuration
- Input sanitization and validation

---

## � Deployment

### **Environment Setup for Production**

```env
NODE_ENV=production
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust
SESSION_SECRET=your_production_session_secret
# ... other production environment variables
```

### **Deployment Platforms**

- **Render**: Recommended for easy deployment
- **Heroku**: Alternative platform option
- **Railway**: Modern deployment option

### **Pre-deployment Checklist**

- [ ] Environment variables configured
- [ ] MongoDB Atlas connection string updated
- [ ] Cloudinary account set up
- [ ] MapTiler API key obtained
- [ ] Static file serving configured
- [ ] Error handling tested

---

## 🤝 Contributing

We welcome contributions to WanderLust! Here's how you can help:

### **Getting Started**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Contribution Guidelines**

- Follow existing code style and conventions
- Add comments for complex logic
- Update documentation for new features
- Test your changes thoroughly
- Ensure all existing tests pass

### **Areas for Contribution**

- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX improvements
- 🧪 Test coverage expansion
- 🚀 Performance optimizations

---

## 👨‍💻 Author

**Ankit Mishra**

- 🌐 GitHub: [@AnkitMishra2006](https://github.com/AnkitMishra2006)
- 📧 Email: ankit.kumar.mishra2006@gmail.com

---

## � License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by Airbnb's user experience and functionality
- Built as part of web development learning journey
- Thanks to the open-source community for amazing tools and libraries
- Special thanks to MapTiler for geocoding services
- Cloudinary for seamless image management

---

## 📞 Support

If you encounter any issues or have questions:

1. 📝 **Documentation**: Check this README first
2. 🐛 **Bug Reports**: Open an issue on GitHub
3. 💡 **Feature Requests**: Open an issue with the "enhancement" label
4. 💬 **Questions**: Start a discussion on GitHub Discussions

---

⭐ **Star this repository if you found it helpful!**
