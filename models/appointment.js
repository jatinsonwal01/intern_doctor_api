const mongoose =  require('mongoose');

const appointmentModel = new mongoose.Schema( {
    doctor: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Doctor',
         required: true,
        },
    date:{
            type: Date,
            required: true,
        },
    patientName : {
        type: String,
        required: true,
    },

});

const Appointment = mongoose.model("Appointment", appointmentModel);
module.exports = Appointment;