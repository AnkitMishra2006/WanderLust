const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs for auth routes
  message: {
    error: "Too many authentication attempts, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Configure helmet for security headers
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
      ],
      scriptSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "https://api.maptiler.com",
      ],
      imgSrc: [
        "'self'",
        "https://res.cloudinary.com",
        "https://images.unsplash.com",
        "https://plus.unsplash.com",
        "data:",
        "https://api.maptiler.com",
      ],
      connectSrc: ["'self'", "https://api.maptiler.com"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      frameSrc: ["'self'", "https://api.maptiler.com"], // Allow MapTiler iframes
    },
  },
  crossOriginEmbedderPolicy: false,
});

module.exports = {
  limiter,
  authLimiter,
  helmetConfig,
  mongoSanitize: mongoSanitize(),
};
