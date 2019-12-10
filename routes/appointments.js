const express = require('express')
const router = express.Router()
const Appointment = require('../models/appointment')
 
//All appointments Router
router.get('/', async (req,res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const appointments = await Appointment.find(searchOptions)
        res.render('appointments/index', { 
            appointments: appointments, 
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

//New appointments router
router.get('/new', (req,res) =>{
    res.render('appointments/new', {appointment: new Appointment() })
})

//create appointments router
router.post('/', async (req,res) =>{
    const appointment= new Appointment({
        name: req.body.name,
        publishDate: new Date(req.body.publishDate),
        description: req.body.description

    })
    try{
        const newAppointment = await appointment.save()
        res.redirect(`appointments/${newAppointment.id}`)
    } catch {
        res.render('appointments/new', {
            appointment: appointment,
            errorMessage: 'Error creating Appointment'
         })
    }
})

router.get('/:id', async (req,res) => {
    try{
        const appointment = await Appointment.findById(req.params.id)
        res.render('appointments/show', {
            appointment: appointment
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/:id/edit', async (req,res) => {
    try{
        const appointment = await Appointment.findById(req.params.id)
        res.render('appointments/edit', {appointment: appointment})
    }catch{
        res.redirect('/appointments')
    }
})

//Use of put and delete methods to update data
//Import library method @override
router.put('/:id', async (req,res) => {
    let appointment
    try{
        appointment = await Appointment.findById(req.params.id)
        appointment.name = req.body.name
        appointment.description = req.body.description
        appointment.publishDate = req.body.publishDate
        await appointment.save()
        res.redirect(`/appointments/${appointment.id}`)
    } catch  {
        if(appointment == null) {
            res.redirect('/')
        }else {
            res.render('appointments/edit', {
                appointment: appointment,
                errorMessage: 'Error updating Appointment'
             })
        }
    }
})

router.delete('/:id', async (req,res) => {
    let appointment
    try{
        appointment = await Appointment.findById(req.params.id)
        await appointment.remove()
        res.redirect('/appointments')
    } catch {
        if(appointment == null) {
            res.redirect('/')
        }else {
           res.redirect(`/appointments/${appointment.id}`)
        }
    }
})
module.exports = router