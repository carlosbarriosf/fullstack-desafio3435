import { Schema, model } from "mongoose";


const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
    }
}, {timestamps: true})

export const Notes = model("Notes", NotesSchema)