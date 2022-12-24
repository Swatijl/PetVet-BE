const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

require("dotenv").config();
// const userModel = require("./models");
const app = express();
const port = process.env.PORT || 5000;

// const middleware = require('./src/middleware/index')
// app.use(middleware.decodeToken);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", ()=>{
	console.log("MongoDb connected!!")
})

const userRouter = require("./routes/api/users");
app.use('/api/users', userRouter )

const availabilityRouter = require("./routes/api/availability");
app.use('/api/availability', availabilityRouter )

const appointmentRouter = require("./routes/api/appointments");
app.use('/api/appointments', appointmentRouter )


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
