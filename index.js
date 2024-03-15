// Modules
const express = require('express');
const mongoose = require('mongoose');
const driveModel = require('./models/driveModel');
const fileUpload = require('express-fileupload');
let responseObject = {
  status: "",
  message: "",
  licenseData: null
};

// MongoDB connection
const mongoCS = 'mongodb+srv://honeymb916:mongodb13019966@cluster0.rlsowo8.mongodb.net/';
mongoose.connect(mongoCS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected!!!')).catch(err => console.error('MongoDB Not Connected!!!', err));

// Creating Application
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.static('assets'));
app.use(express.static('js', { 'Content-Type': 'text/javascript' }));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// GET ROUTING

// 1. Index
app.get('/', async (req, res) => {
  res.render('Dashboard');
});

// 2.a G Dynamic Routing
app.get('/g-one', (req, res) => {
  res.render('G', { responseObjectG: responseObject });
  responseObject = { status: '', message: '', licenseData: null };
});

// 2.b G Manual Routing
app.get('/G', (req, res) => {
  responseObject = { status: '', message: '', licenseData: null };
  res.render('G', { responseObjectG: responseObject });
});

// 3.a G2 Dynamic Routing
app.get('/g-two', (req, res) => {
  res.render('G2', { responseObject });
  responseObject = { status: '', message: '', licenseData: null };
});

// 3.b G2 Manual Routing
app.get('/G2', (req, res) => {
  responseObject = { status: '', message: '', licenseData: null };
  res.render('G2', { responseObject });
});

// 4. Login
app.get('/login', (req, res) => {
  res.render('login');
});

const setSuccess = (message) => {
  responseObject = {
    message,
    status: 'Success'
  };
}

const setError = (message) => {
  responseObject = {
    message,
    status: 'Error'
  };
}

// POST route to add new entry
app.post('/drive/G2', async (req, res) => {
  try {
    const { firstName, lastName, age, licenseNumber, make, model, year, plateNumber, dob } = req.body;
    // Create a new user instance using driveModel
    const newUser = new driveModel({
      firstName,
      lastName,
      age: parseInt(age), // Convert age to number format
      licenseNumber,
      dob,
      carDetails: {
        make,
        model,
        year: parseInt(year), // Convert year to number format
        plateNumber
      }
    });
    // Save the new user to the database
    await newUser.save();
    setSuccess("Your data has been saved successfully!");
    res.redirect('/g-two');
  } catch (error) {
    // Error while saving to the database
    setError("Please enter all the mandatory fields before proceeding.");
    res.redirect('/g-two');
  }
});

app.post('/driveUpdate/G2', async (req, res) => {
  try {
    // Extract updated user information from the request body
    const {
      firstName,
      lastName,
      age,
      dob,
      licenseNumber,
      make, model, year, plateNumber,
    } = req.body;
    // Simple validations for make, model, year, and platno
    if (!make || !model || !year || !plateNumber) {
      throw new Error("Make, model, year, and plate number cannot be empty.");
    }
    // Additional validation for year
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
      throw new Error("Invalid year.");
    }
    // Define the update object
    const updatePayload = {
      firstName,
      lastName,
      age,
      dob,
      carDetails: {
        make,
        model,
        year,
        plateNumber
      }
    };
    // Find the user in the database based on the license number and update its information
    await driveModel.findOneAndUpdate({ licenseNumber }, updatePayload);
    // Redirect to a success page
    setSuccess("Your data has been updated successfully!");
    res.redirect('/g-one');
  } catch (error) {
    setError("Error : " + error.message);
    res.redirect('/g-one');
  }
});

app.post('/drive/G', async (req, res) => {
  try {
    const { licenseNumber } = req.body;
    // Search for the data in the database based on the license number
    if (!licenseNumber) {
      setError('Please enter your license number!');
      res.redirect('/g-one');
    } else {
      const foundData = await driveModel.findOne({ licenseNumber });
      if (foundData) {
        setSuccess("Your data has been fetched successfully!");
        responseObject = { ...responseObject, licenseData: foundData };
        res.redirect('/g-one');
      } else {
        // If license info is not found, render an error message or redirect to an error page
        setError("No data found based on the license number provided!");
        res.redirect('/g-one');
      }
    }
  } catch (error) {
    setError('Something went wrong. Please try again!');
    res.redirect('/g-one');
  }
});

// Default PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('application link: http://localhost:4000/')
});