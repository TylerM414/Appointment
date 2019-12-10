const express = require("express")
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const appointmentRouter = require('./routes/appointments')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

//Link variable for connection to MongoDB
const DB_URL = ('mongodb+srv://dbTylerM:yh5MsVCeQq9Md3Df@appointment-pljpa.mongodb.net/test?retryWrites=true&w=majority')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

//Establish connection to database. 
const mongoose = require('mongoose')
mongoose.connect( DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: false, // Leads to errors version deprecated
  
})
.then(() => console.log('DB Connected!'))
.catch(err => {
  console.error(err)
});


app.use('/', indexRouter)
app.use('/appointments', appointmentRouter)


app.listen(process.env.PORT || 3000)