const mongoose = require('mongoose'),
    userRole = mongoose.model('userRole');

let getEmployeeRole = async () => {

    let filter = { role: 'employee' },
        roleObj = await userRole.findOne(filter);

    return roleObj;
};

module.exports = {
    getEmployeeRole
};
