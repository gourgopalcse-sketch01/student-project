const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let notes = [];
let nextId = 1;

// Get all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// Add a new note
app.post('/notes', (req, res) => {
  const { text, createdAt } = req.body;
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Please write something' });
  }
  const newNote = { 
    id: nextId++, 
    text: text.trim(),
    createdAt: createdAt || new Date().toISOString()
  };
  notes.unshift(newNote);
  res.status(201).json(newNote);
});

// Delete a note
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.json({ message: 'Note deleted' });
});

app.listen(5000, () => {
  console.log('QuickNotes API running on http://localhost:5000');
});