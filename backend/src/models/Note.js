import mongoose from 'mongoose';

// Define the schema for the Note model
// This schema defines the structure of the documents in the 'notes' collection
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    }, {
    timestamps: true,
})
// Export the Note model
// This model will be used to interact with the 'notes' collection in MongoDB
const Note = mongoose.model('Note', noteSchema);

export default Note;