const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route 1: Getting all the notes using : GET '/api/notes/createuser'. require login
router.get('/fetchnotes', fetchUser, async (req, res) => {
    try {
        // console.log(req.user.id)
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (err) {
        console.error(err)
        res.status(500).send("Internal server error occured!")
    }
})

// Route 2: Adding a new note using : POST '/api/notes/addnotes'. require login
router.post('/addnotes', fetchUser, [
    body('description', 'Description should be atleast of five character long').isLength({ min: 5 }),
    body('title', 'Title should be atleast of three character long').isLength({ min: 3 }),], async (req, res) => {
        try {

            const { title, description, tag } = req.body;
            // Checks if there are any errors, return bad requests
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote)

        } catch (err) {
            console.error(err)
            res.status(500).send("Internal server error occured!")
        }
    })

// Route 3: Updating an existing note using : PUT '/api/notes/updatenote'. require login
router.put('/updatenotes/:id', fetchUser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            // create new notes object
            const newNote = {};
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }

            // Find the note to be updated 
            let note = await Notes.findById(req.params.id)
            if (!note) { res.status(404).send("Notes not found") };

            if (note.user.toString() != req.user.id) {
                return res.status(401).send("Not allowed")
            }
            note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
            res.json({note})

        } catch (err) {
            console.error(err)
            res.status(500).send("Internal server error occured!")
        }
    })
// Route 4: Deleting an existing note using : DELETE '/api/notes/deletenotes'. require login
router.delete('/deletenotes/:id', fetchUser,
    async (req, res) => {
        try {
            // Find the note to be deleted 
            let note = await Notes.findById(req.params.id)
            if (!note) { res.status(404).send("Notes not found") };

            if (note.user.toString() != req.user.id) {
                return res.status(401).send("Not allowed")
            }
            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({note})

        } catch (err) {
            console.error(err)
            res.status(500).send("Internal server error occured!")
        }
    })
module.exports = router;