const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const { default: mongoose } = require("mongoose");

router.post('/appointments', async (req, res) => {
    try {
      const { doctorId, date, patientName } = req.body;

      const id = new mongoose.Types.ObjectId(doctorId);

      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }

      const existingAppointments = await Appointment.find({
        doctor: id,
        date,
      });

      if (existingAppointments.length >= doctor.maxPatientsPerDay) {
        return res.status(400).json({ error: 'No available slots for this date' });
      }

      const appointment = new Appointment({ doctor: id, date, patientName});
      await appointment.save();

      res.status(201).json(appointment);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;