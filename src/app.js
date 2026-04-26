import express from 'express'

const app = express() // Create an instance server 
app.use(express.json()) // Middleware to parse JSON request bodies

const notes = [] // In-memory array to store notes

// Define a simple route for testing
app.post('/AddNote', (req, res) => {

    notes.push(req.body) // Add the request body to the notes array
    console.log(notes) // Log the notes array to the console
    res.status(200).json({ message: 'Note added successfully!' })

})


app.get('/GetNotes', (req, res) => {
    res.json({ message: 'Notes retrieved successfully!', notes: notes }) // Send the notes array as a JSON response
})

app.delete('/DeleteNote/:index', (req, res) => {
    const { index } = req.params; // Extract the index from the request parameters
    console.log("index " + index) // Log the index to the console
    // const index = notes.findIndex(note => note.id === id) // Find the index of the note with the given id   
    if (index >= 0 && index < notes.length) { // If the note exists
        notes.splice(index, 1) // Remove the note from the array
        res.json({ message: 'Note deleted successfully!' }) // Send a success response
    } else { // If the note does not exist
        res.status(404).json({ message: 'Note not found!' }) // Send a not found response
    }
})

// Patch route to update a note
app.patch('/UpdateNote/:index', (req, res) => {
    const { index } = req.params; // Extract the index from the request parameters  
    console.log("index " + index) // Log the index to the console
    if (index >= 0 && index < notes.length) { // If the note exists
        notes[index] = req.body // Update the note with the request body
        res.status(200).json({ message: 'Note updated successfully!' }) // Send a success response
    } else { // If the note does not exist
        res.status(404).json({ message: 'Note not found!' }) // Send a not found response
    }
})


export default app;
