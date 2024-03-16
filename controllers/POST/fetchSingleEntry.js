const DriveModel = require("../../models/DriveModel");
const { setSuccess, setError, responseObject } = require("../metaData");

module.exports = async (req, res) => {
    try {
        console.log('>> req.body ', req.body);
        const { licenseNumber } = req.body;
        // Search for the data in the database based on the license number
        if (!licenseNumber) {
            setError('Please enter your license number!');
            res.redirect('/gtest');
        } else {
            const foundData = await DriveModel.findOne({ licenseNumber });
            console.log('>> foundData ', foundData);
            if (foundData) {
                // setSuccess("Your data has been fetched successfully!");
                let responseObject = {
                    message: "Your data has been fetched successfully!",
                    status: 'Success',
                    licenseData: foundData
                };
                console.log('>> responseObject ', responseObject);
                // res.render('G', { responseObjectG: responseObject });

                res.redirect('/gtest');
            } else {
                // If license info is not found, render an error message or redirect to an error page
                setError("No data found based on the license number provided!");
                res.redirect('/gtest');
            }
        }
    } catch (error) {
        setError('Something went wrong. Please try again!');
        res.redirect('/gtest');
    }
}