if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Security imports
const {
  helmetConfig,
  limiter,
  authLimiter,
  mongoSanitize,
} = require("./utils/security.js");
const logger = require("./utils/logger.js");

const listingRouter = require("./Routes/listing.js");
const reviewRouter = require("./Routes/review.js");
const userRouter = require("./Routes/user.js");
const wrapAsync = require("./utils/wrapAsync.js");

const port = 8080;

// Use environment variable for MongoDB URL, fallback to localhost
const MONGO_URL = process.env.MONGO_URL;
// Use environment variable for session secret, fallback to a default (should be set in production)
const SESSION_SECRET = process.env.SESSION_SECRET;

// Validate required environment variables
if (!MONGO_URL) {
  console.error("❌ MONGO_URL environment variable is required");
  process.exit(1);
}

if (!SESSION_SECRET) {
  console.error("❌ SESSION_SECRET environment variable is required");
  process.exit(1);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Security middleware
app.use(helmetConfig);
app.use(limiter);
app.use(mongoSanitize);

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.engine("ejs", ejsMate);

main()
  .then(() => {
    logger.info("Connection to DB Successful");
  })
  .catch((err) => {
    logger.error("Database connection failed:", err);
    process.exit(1);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: {
    secret: SESSION_SECRET,
  },
  touchAfter: 24 * 3600, // time in seconds after which the session will be updated
});

store.on("error", () => {
  logger.error("Session Store Error");
});

const sessionOptions = {
  store: store,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only set secure in production
  },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize()); //Initializes passport
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; //Can't use req.user in /includes/navbar.ejs can't use it in ejs files so we need to pass it through locals
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", authLimiter, userRouter); // Apply stricter rate limiting to auth routes

app.get("/", (req, res) => {
  res.send("Welcome to WanderLust!");
});
// app.get(
//   "/demo",
//   wrapAsync(async (req, res) => {
//     let fakeUser = new User({
//       email: "demonaccount@gmail.com",
//       username: "Demo",
//     });

//     let registeredUser = await User.register(fakeUser, "HelloWorld"); //
//     res.send(registeredUser);
//   })
// );

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  logger.error("Error occurred:", err);
  res.status(statusCode).render("Error.ejs", { err });
});

app.listen(port, () => {
  logger.info(`App is listening on port ${port}`);
});
