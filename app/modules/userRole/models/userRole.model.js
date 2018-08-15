'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;
/** ************************************************ User Accounts Model ****************************************************/
let userRoleSchema = new schema({
    role: { type: String, default: '' },
});

userRoleSchema.plugin(mongoose_timestamps);
/** *************************************************************************************************************************/

const userRoleObject = mongoose.model('userRole', userRoleSchema);
var role = [
    {
        _id: '5b73fe1f58f0541af8b29699',
        role: 'admin',
    },
    {
        _id: '5b73fe1f58f0541af8b2969a',
        role: 'pm',
    },
    {
        _id: '5b73fe1f58f0541af8b2969b',
        role: 'hr',
    },
    {
        _id: '5b73fe1f58f0541af8b2969c',
        role: 'employee',
    }
];

userRoleObject.find({}).then(userObjects => {
    if ( !userObjects.length ) {
        userRoleObject.insertMany(role);

    }
});
module.exports = userRoleObject;

