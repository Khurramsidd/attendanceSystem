
'use strict';

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

let leaveTypeSchema = new schema({
    leaveTypeName: { type: String },
    totalNumberOfLeavesAllow: { type: Number },

});

leaveTypeSchema.plugin(mongoose_timestamps);

module.exports = mongoose.model('leaveType', leaveTypeSchema);