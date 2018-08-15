 const schedule = require('node-schedule');
 const userCron = require('../app/modules/zkteco/controller/zkteco');

 schedule.scheduleJob('*/40 * * * * *', userCron.readUserDeviceUpdateUserAccount); // run on every 40 second
 // schedule.scheduleJob('*/30 * * * * *', userCron.insertAttendance); // run on every 40 second

