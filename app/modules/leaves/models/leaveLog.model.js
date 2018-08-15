
'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

let leaveLogSchema = new schema({
    zktecoUserid: { type: Number },
    typeOfLeave: { type: schema.Types.ObjectId, ref: 'leaveType' },
    reasonOfLeave: { type: String, default: '' },
    message: { type: String, default: '' },
    leaveApprove: { type: Boolean, default: false },
    leaveDate:  { type: Number },
    leaveApplyTime: { type: Number },
    leaveApproveTime: { type: Number }
});

leaveLogSchema.plugin(mongoose_timestamps);

module.exports = mongoose.model('leaveLog', leaveLogSchema);