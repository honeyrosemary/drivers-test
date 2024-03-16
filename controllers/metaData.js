let responseObject = {
    status: "",
    message: "",
    licenseData: null
};

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

const APP_APIS = {
    GET: {
        'G_TEST': '/gtest',
        'G_MAIN': '/G',
        'G2': '/g-two',
        'G2_MAIN': '/G2',
    },
    POST: {
        'DRIVE_G': '/drive/G',
        'DRIVE_G2': '/drive/G2',
        'DRIVE_UPDATE_G2': '/driveUpdate/G2',
    }
}

module.exports = { responseObject, setSuccess, setError, APP_APIS }; 