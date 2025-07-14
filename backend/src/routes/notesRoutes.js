import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  getNoteById,
} from "../controllers/notesController.js";

const router =express.Router();

router.get("/getNotes", getAllNotes);

router.get("/getNotes/:id", getNoteById);

router.post("/createNotes", createNote);

router.put("/editNotes/:id",updateNote);

router.delete("/deleteNotes/:id", deleteNote);

export default router;