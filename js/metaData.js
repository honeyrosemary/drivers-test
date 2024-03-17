global.responseObject = {
    status: "",
    message: "",
    licenseData: null
};

global.setSuccess = (message) => {
    responseObject = {
        message,
        status: 'Success'
    };
}

global.setError = (message) => {
    responseObject = {
        message,
        status: 'Error'
    };
}

const APP_APIS = {
    GET: {
        'G_TEST': '/gtest',
        'G_MAIN': '/G',
        'G2_TEST': '/g-two',
        'G2_MAIN': '/G2',
        'USER_LOGOUT': '/logout'
    },
    POST: {
        'DRIVE_G': '/drive/G',
        'DRIVE_G2': '/drive/G2',
        'DRIVE_UPDATE_G2': '/driveUpdate/G2',
        'CREATE_NEW_USER': '/user/create',
        'USER_LOGIN': '/users/login'
    }
}

module.exports = { APP_APIS }; 