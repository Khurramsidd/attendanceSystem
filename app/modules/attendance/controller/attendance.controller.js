const mongoose = require('mongoose'),
    attendance = mongoose.model('attendance');

let getAllAttendance = async () => {

    let attendanceObj = await attendance.find();

    return attendanceObj;
};

module.exports = {
    getAllAttendance
};
