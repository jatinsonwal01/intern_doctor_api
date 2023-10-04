const express = require('express');
const router = express.Router();
const Doctor = require("../models/doctor");

router.post('/doctors' , async(req, res)  => {
    try{
      const {name , specialty , maxPatientNumber } = req.body;
      const doctor= new Doctor({name , specialty , maxPatientNumber});
      await doctor.save();

      res.status(201).json(doctor);
    }
    catch(error)
    {
      res.status(500).json({ error: 'Internal server error' });
    }

})


router.get('/doctors', async(req , res)=>{
    try{
        const doctors= await Doctor.find();
        res.json(doctors);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/doctors/:id', async (req, res) => {
    try {
      const doctor = await Doctor.findById(req.params.id);
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.json(doctor);
    } catch (error) {
      
      if (error.name === 'CastError') {
        return res.status(404).json({ error: 'Doctor not found' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;