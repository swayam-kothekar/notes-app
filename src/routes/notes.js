const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// In-memory storage
const notes = [];

// GET /notes - Return all notes
router.get('/', (req, res) => {
  res.json(notes);
});

// GET /notes/:id - Return a single note
router.get('/:id', (req, res) => {
  const note = notes.find((n) => n.id === req.params.id);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  res.json(note);
});

// POST /notes - Create a new note
router.post('/', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Both title and content are required' });
  }

  const note = {
    id: uuidv4(),
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  notes.push(note);
  res.status(201).json(note);
});

// DELETE /notes/:id - Delete a note
router.delete('/:id', (req, res) => {
  const index = notes.findIndex((n) => n.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }
  notes.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
