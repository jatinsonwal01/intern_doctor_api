const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app= express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URL;

mongoose.connect(uri, {
  useNewUrlParser: true,
});

const Doctor= require("./models/doctor");
const Appointment = require("./models/appointment");
const doctorRouter= require("./router/doctor");
const appointmentRouter = require("./router/appointment");


console.log(mongoose.connection.readyState);

app.use(bodyParser.json());
app.use(doctorRouter);
app.use(appointmentRouter);

app.listen(port, ()=>{
    console.log(`server is running successfully on ${port}`);
});

