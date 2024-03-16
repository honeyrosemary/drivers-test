let { responseObject } = require("../metaData");

const routeMethods = {
    getGTestDynamic(req, res) {
        console.log('>> getGTestDynamic responseObject ', responseObject)
        res.render('G', { responseObjectG: responseObject });
        responseObject = { status: '', message: '', licenseData: null };
    },
    getGTestManual(req, res) {
        console.log('>> getGTestManual responseObject ', responseObject)
        responseObject = { status: '', message: '', licenseData: null };
        res.render('G', { responseObjectG: responseObject });
    },
    getG2TestDynamic(req, res) {
        console.log('>> getG2TestDynamic responseObject ', responseObject)
        res.render('G2', { responseObject });
        responseObject = { status: '', message: '', licenseData: null };
    },
    getG2TestManual(req, res) {
        console.log('>> getG2TestManual responseObject ', responseObject)
        responseObject = { status: '', message: '', licenseData: null };
        res.render('G2', { responseObject });
    }
};

module.exports = { routeMethods };