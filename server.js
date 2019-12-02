const express = require("express")
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const DB_URL = ('mongodb+srv://dbTylerM:yh5MsVCeQq9Md3Df@appointment-pljpa.mongodb.net/test?retryWrites=true&w=majority')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect( DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: false, // commented out currently
  
})
.then(() => console.log('DB Connected!'))
.catch(err => {
  console.error(err)
});


app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)