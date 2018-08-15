const mongoose = require('mongoose'),
    userAccount = mongoose.model('userAccount');

let getUserAccounts = async () => {
    try {
        let users = await userAccount.find();
        return users;
    } catch ( err ) {
        throw ({ msgCode: 900 });
    }
};

module.exports = {
    getUserAccounts
};
