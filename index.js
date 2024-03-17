// Modules
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const flash = require("connect-flash");
const { APP_APIS } = require("./js/metaData");

// Controllers
const addNewEntry = require("./controllers/addNewEntry");
const fetchSingleEntry = require("./controllers/fetchSingleEntry");
const updateEntryDetails = require("./controllers/updateEntryDetails");
const getGTestDynamic = require("./controllers/getGTestDynamic");
const getGTestManual = require("./controllers/getGTestManual");
const getG2TestDynamic = require("./controllers/getG2TestDynamic");
const getG2TestManual = require("./controllers/getG2TestManual");
const dashboardController = require("./controllers/dashboardController");
const createNewUser = require("./controllers/createNewUser");
const loginController = require("./controllers/loginController");
const userLoginController = require("./controllers/loginNewUser");
const userLogoutController = require("./controllers/logoutController");

// Middlewares
const ifAuthRedirect = require("./middlewares/ifAuthRedirect");
const authMidware = require("./middlewares/authMidware");

// MongoDB connection
const mongoCS =
  "mongodb+srv://honeymb916:mongodb13019966@cluster0.rlsowo8.mongodb.net/";
mongoose
  .connect(mongoCS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected!!!"))
  .catch((err) => console.error("MongoDB Not Connected!!!", err));

// Creating Application
const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.static("js", { "Content-Type": "text/javascript" }));
app.use(fileUpload());
app.use(
  session({
    // session configuration
    secret: "ASDFQWER4321",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// GET routes to redirect to the specific routes
// Index
app.get("/", dashboardController);
// Login
app.get("/login", ifAuthRedirect, loginController);

// G and G2 Dynamic Routing and Manual Routing
app.get(APP_APIS.GET.G_TEST, authMidware, getGTestDynamic); // To show data fetch success message and error message in G Test
app.get(APP_APIS.GET.G_MAIN, authMidware, getGTestManual); // To route by navigation click to G Test
app.get(APP_APIS.GET.G2_TEST, authMidware, getG2TestDynamic); // To show data fetch success message and error message in G2 Test
app.get(APP_APIS.GET.G2_MAIN, authMidware, getG2TestManual); // To route by navigation click to G2 Test
app.get(APP_APIS.GET.USER_LOGOUT, userLogoutController); // Logout URL

// POST routes to add new entry
app.post(APP_APIS.POST.CREATE_NEW_USER, authMidware, createNewUser);
app.post(APP_APIS.POST.DRIVE_G2, authMidware, addNewEntry);
app.post(APP_APIS.POST.DRIVE_UPDATE_G2, updateEntryDetails);
app.post(APP_APIS.POST.DRIVE_G, fetchSingleEntry);
app.post(APP_APIS.POST.USER_LOGIN, ifAuthRedirect, userLoginController);

// Default PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Application link: http://localhost:4000/");
});
