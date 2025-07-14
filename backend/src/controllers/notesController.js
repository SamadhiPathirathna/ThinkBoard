import Note from '../models/Note.js';

export async function getAllNotes (req, res)  {
   try{
      const notes = await Note.find().sort({createdAt:-1});//newest first
      res.status(200).json(notes);

   }catch{
      console.error("Error fetching notes:", error);
      // Send a 500 Internal Server Error response if there's an error fetching notes
   res.status(500).json({message:"Error fetching notes"})
   }
}

export async function createNote (req, res) {
   try{
      const { title, content } = req.body;

      // Create a new note
      const newNote = new Note({
         title,
         content,
      });

      // Validate the request body
      if (!title || !content) {
         return res.status(400).json({message:"Title and content are required"});
      }

      // Save the note to the database
      await newNote.save();

      // Send a success response with the created note
      res.status(201).json(newNote);

   } catch (error) {
      console.error("Error creating note:", error);
      res.status(500).json({message:"Error creating note"})
   }
}

export async function updateNote (req, res) {
   const { id } = req.params;
   const { title, content } = req.body;

   try {
      // Find the note by ID and update it
      const updatedNote = await Note.findByIdAndUpdate(
         id,
         { title, content },
         { new: true }
      );

      // If the note is not found, send a 404 Not Found response
      if (!updatedNote) {
         return res.status(404).json({message:"Note not found"});
         
      }

      // Send the updated note as a response
      res.status(200).json(updatedNote);
   } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({message:"Error updating note"})
   }
}

export async function deleteNote (req, res) {   
   try{
      const { id } = req.params;

      // Find the note by ID and delete it
      const deletedNote = await Note.findByIdAndDelete(id);

      // If the note is not found, send a 404 Not Found response
      if (!deletedNote) {
         return res.status(404).json({message:"Note not found"});
      }

      // Send a success response
      res.status(200).json({message:"Note deleted successfully"});

   }catch{
      console.error("Error deleting note:", error);
      res.status(500).json({message:"Error deleting note"})
   }
}


export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found!" });
    res.json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}