'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema,
    zk = require('../../../../config/attendanceDevice');


/** ************************************************ User Accounts Model ****************************************************/
let userAccount = new schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    name: { type: String, default: '' },
    designation: { type: String, default: '' },
    status: { type: String, default: '' },
    mobileNumber: { type: String, default: '' },
    email: { type: String, default: '' },
    zktecoUserid: { type: Number },
    zktecoUid: { type: Number },
    zktecoName: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    role: { type: schema.Types.ObjectId, ref: 'userRole' }
});

userAccount.plugin(mongoose_timestamps);
/** *************************************************************************************************************************/

const userObject = mongoose.model('userAccount', userAccount);


let insertDeviceUser = () => {
    return new Promise(function (resolve, reject) {
        let userArray = [];
        zk.getUser((err, getUsersList) => {
            if ( err ) {
                console.log(err);
                reject({ msgCode: 900 });
            } else {
                getUsersList.forEach(user => {
                    userArray.push({
                        'zktecoUserid': user.userid,
                        'zktecoUid': user.uid,
                        'zktecoName': user.name,
                        'role': '5b73fe1f58f0541af8b2969c'
                    });
                });
                return resolve(userArray);
            }

        });
    });

};

userObject.find({}).then(userObjects => {
    if ( !userObjects.length ) {
        insertDeviceUser().then(userArray => {
            userObject.insertMany(userArray);
        }).catch(err => {
            if ( err.msgCode == 900 ) {
                console.log('Error while fetching user from device.');
            } else {
                console.log(err);
            }
        });
    }
});
module.exports = userObject;

