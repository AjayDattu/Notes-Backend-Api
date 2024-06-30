const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const {getNote,getNotes,create,deleteNote,update} = require('../controllers/Notescontroller')
const requireAuth = require('../middleware/requireAuth')

//requrie all auth routes
router.use(requireAuth)
// Get all notes data
router.get('/', getNotes);

// Get a single note
router.get('/:id', getNote);

// Post a new workout
router.post('/',create);

// Delete a note
router.delete('/:id', deleteNote);

// Update a note
router.patch('/:id',update);

module.exports = router; // Corrected module.exports
