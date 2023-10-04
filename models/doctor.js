const mongoose = require('mongoose');

const doctorModel = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required : true
    },
    maxPatientNumber: {
        type: Number,
        required : true
    },
});

const Doctor = mongoose.model("Doctor", doctorModel);

module.exports = Doctor;