import express from "express"
import { deleteNoteById, getNote, getNoteById, postNote, updateNoteById } from "../controllers/notesController.js";

const route = express.Router();

route
    .post("/", postNote)
    .get("/", getNote)
    .get("/:id", getNoteById)
    .put("/update/:id", updateNoteById)
    .delete("/delete/:id", deleteNoteById)

export default route