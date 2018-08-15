'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

let userLeaveSchema = new schema({
    zktecoUserid: { type: Number },
    leaves: [ {
        typeOfLeave: { type: schema.Types.ObjectId, ref: 'leaveType' },
        totalLeave: { type: Number },
        remainingLeave: { type: Number },
        totalNumberOfLeavesAllow: { type: Number }
    } ]
});

userLeaveSchema.plugin(mongoose_timestamps);

module.exports = mongoose.model('userLeaves', userLeaveSchema);