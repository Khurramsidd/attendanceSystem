'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema,
    moment = require('moment'),
    zk = require('../../../../config/attendanceDevice');


/** ************************************************ User Accounts Model ****************************************************/
let attendanceSchema = new schema({
    zktecoTimestamp: { type: String, default: '' },
    zktecoTimestampUnix: { type: Number, default: '' },
    zktecoUserid: { type: Number },
    zktecoState: { type: Number }, //  1 for checkIn and  2 for CheckOut
    year: { type: Number },
    month: { type: Number },
    dayOfMonth: { type: Number },
    weekOfYear: { type: Number },
});

attendanceSchema.plugin(mongoose_timestamps);
/** *************************************************************************************************************************/

const attendanceObject = mongoose.model('attendance', attendanceSchema);

let insertDeviceAttendance = () => {
    return new Promise(function (resolve, reject) {
        let attendanceArray = [];
        zk.getAttendance((err, attendanceList) => {
            if ( err ) {
                reject({ msgCode: 901 });
            } else {
                attendanceList.forEach(attendance => {
                    attendanceArray.push({
                        'zktecoTimestamp': attendance.timestamp,
                        'zktecoTimestampUnix': moment(attendance.timestamp).unix(),
                        'year': moment(attendance.timestamp).year(),
                        'month': moment(attendance.timestamp).month(),
                        'dayOfMonth': moment(attendance.timestamp).date(),
                        'weekOfYear': moment(attendance.timestamp).week(),
                        'zktecoUserid': attendance.id,
                        'zktecoState': attendance.state
                    });
                });
                return resolve(attendanceArray);
            }

        });
    });

};

attendanceObject.find({}).then(userObjects => {
    if ( !userObjects.length ) {
        insertDeviceAttendance().then(attendanceArray => {
            attendanceObject.insertMany(attendanceArray);
        }).catch(err => {
            if ( err.msgCode == 901 ) {
                console.log('Error while fetching attendance from device.');
            } else {
                console.log(err);
            }
        });
    }
});
module.exports = attendanceObject;

