const express = require('express');
const router = express.Router();
const authenticateuser = require('../middleware/authenticateuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// Route 1: Get all notes using GET - at /api/notes/getuser
router.get("/fetchallnotes", authenticateuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch(error) {
        // console.error(error.message);
        res.status(500).send('Internal server error occurred');
    }
});


// Add a new note using POST - at /api/notes/addnote
router.post('/addnote', authenticateuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Body of note must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id,
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch(error) {
        // console.error(error.message);
        res.status(500).send('Internal server error occurred');
    }
});


// Edit an existing note using PUT - at /api/notes/updatenote
router.put("/updatenote/:id", authenticateuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if(title) { newNote.title = title; }
        if(description) { newNote.description = description; }
        if(tag) { newNote.tag = tag; }

        // Find note to be updated and edit it
        let note = await Notes.findById(req.params.id);
        if(!note) {
            return res.status(404).send('Not found');
        }

        if(note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch(error) {
        // console.error(error.message);
        res.status(500).send('Internal server error');
    }
});


// Delete an existing note using DELETE - at /api/notes/deletenote
router.delete('/deletenote/:id', authenticateuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if(!note) {
            return res.status(404).send('Not found')
        }
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({
            'Success': `Note with id ${req.params.id} has been deleted`,
            note: note
        });
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Internal server error')
    }
});


module.exports = router;
