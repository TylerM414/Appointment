const express = require('express')
const router = express.Router()
const Author = require('../models/author')
 
//All authors Router
router.get('/', async (req,res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors, 
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

//New authors router
router.get('/new', (req,res) =>{
    res.render('authors/new', {author: new Author() })
})

//create authors router
router.post('/', async (req,res) =>{
    const author = new Author({
        name: req.body.name,
        publishDate: new Date(req.body.publishDate),
        description: req.body.description

    })
    try{
        const newAuthor = await author.save()
        res.redirect(`authors/${newAuthor.id}`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
         })
    }
})

router.get('/:id', async (req,res) => {
    try{
        const author = await Author.findById(req.params.id)
        res.render('authors/show', {
            author: author
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/:id/edit', async (req,res) => {
    try{
        const author = await Author.findById(req.params.id)
        res.render('authors/edit', {author: author})
    }catch{
        res.redirect('/authors')
    }
})

//Use of put and delete methods to update data
//Import library method @override
router.put('/:id', async (req,res) => {
    let author
    try{
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        author.description = req.body.description
        author.publishDate = req.body.publishDate
        await author.save()
        res.redirect(`/authors/${author.id}`)
    } catch  {
        if(author == null) {
            res.redirect('/')
        }else {
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error updating Author'
             })
        }
    }
})

router.delete('/:id', async (req,res) => {
    let author
    try{
        author = await Author.findById(req.params.id)
        await author.remove()
        res.redirect('/authors')
    } catch {
        if(author == null) {
            res.redirect('/')
        }else {
           res.redirect(`/authors/${author.id}`)
        }
    }
})
module.exports = router