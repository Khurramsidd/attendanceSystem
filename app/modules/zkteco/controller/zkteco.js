const zk = require('../../../../config/attendanceDevice'),
    userAccountCtrl = require('../../userAccounts/controller/userAccount.controller.js'),
    mongoose = require('mongoose'),
    userAccount = mongoose.model('userAccount'),
    attendanceModel = mongoose.model('attendance'),
    moment = require('moment'),
    winston = require('winston');


let getUsers = () => {
    return new Promise(function (resolve, reject) {
        zk.getUser((err, user) => {
            if ( err ) {
                reject({ msgCode: 900 });
            } else {
                resolve(user);
            }

        });
    });
};

let getAttendance = () => {
    return new Promise(function (resolve, reject) {
        zk.getAttendance((err, att) => {
            if ( err ) {
                reject({ msgCode: 901 });
            } else {
                resolve(att);
            }

        });
    });
};

let clearAttendanceLog = () => {
    return new Promise(function (resolve, reject) {
        zk.clearAttendanceLog((err, att) => {
            if ( err ) {
                zk.disconnect();
                reject({ msgCode: 901 });
            } else {
                resolve(att);
            }

        });
    });
};

//  This function read the users from device and update userAccount model if new entry exist in device
let readUserDeviceUpdateUserAccount = async () => {
    winston.info('******************** Read the users from device and update userAccount model **************************');
    try {
        let userList = await  getUsers(),
            userAccountList = await userAccountCtrl.getUserAccounts(),
            updateUserList = [];
        if ( userAccountList.length > 0 ) {
            userList.forEach(user => {
                let updateUser = userAccountList.find(userAccount => userAccount.zktecoUid === user.uid);

                if ( updateUser ) {
                    if ( updateUser.zktecoUserid != user.userid ) {
                        updateUserList.push({
                            'zktecoUserid': user.userid,
                            'zktecoUid': user.uid,
                            'zktecoName': user.name
                        });
                    }
                } else {
                    updateUserList.push({
                        'zktecoUserid': user.userid,
                        'zktecoUid': user.uid,
                        'zktecoName': user.name
                    });
                }
            });
            if ( updateUserList.length > 0 ) {
                // console.log(updateUserList)
                userAccount.insertMany(updateUserList);
                winston.info('*********************************/ User Updated./**********************************************');


            } else {
                winston.info('**********************/ Cron Job Finish No New User Found./********************');
            }
        } else {
            winston.info('*********************************/No user Found./**********************************************');
        }
    } catch ( err ) {
        winston.error(err);
    }
};
let insertAttendance = async () => {
    winston.info('*********/ Insert Attendance Cron./***********************');
    try {
        let attendanceList = await getAttendance(),
            attendanceArray = [];
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
        attendanceModel.insertMany(attendanceArray);
        winston.info('*********/ Attendance Cron Finish./***********************');

    } catch ( err ) {
        winston.error(err);
    }
};

module.exports = {
    readUserDeviceUpdateUserAccount,
    insertAttendance,
    clearAttendanceLog
};
