import mongoose from "mongoose";
import { Notes } from "../models/Notes.js";


export const postNote = async (req, res) => {
    const {body} = req;
    try {
        
        const newNote = await Notes.create(body);
        res.json({
            ok: true,
            newNote,
            msg: 'Nota creado con éxito'
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Ha habido un error en el servidor'
        })
    }
}

export const getNote = async (req, res) => {
    try {
        const notes = await Notes.find({deletedAt: {$in: [null, undefined]}})
        res.json({
            ok: true,
            notes
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Ha habido un error en el servidor'
        })
    }
}

export const getNoteById = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            msg: 'ID de nota no es válido'
        });
    }

    try {
        const note = await Notes.findById(id)
        if(!note || note.deletedAt) {
            return res.status(404)
                      .json({
                        ok: false,
                        msg: 'No se pudo encontrar la nota'
                      })  
        }
        res.json({
            ok: true,
            note
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Ha habido un error en el servidor'
        })
    }
}

export const updateNoteById = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            msg: 'ID de nota no es válido'
        });
    }

    const {body} = req;

    try {
        
        const noteToUpdate = await Notes.findByIdAndUpdate(id, body, {new : true})
        if(!noteToUpdate || noteToUpdate.deletedAt) {
            return res.status(404)
                      .json({
                        ok: false,
                        msg: 'La nota a editar no fue encontrada o no existe'
                      })  
        }

        res.json({
            ok: true,
            noteToUpdate,
            msg: 'Nota editada con éxito'
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Ha habido un error en el servidor'
        })
    }
}

export const deleteNoteById = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            msg: 'ID de nota no es válido'
        });
    }

    try {
        
        const noteToDelete = await Notes.findById(id)
        if(!noteToDelete || noteToDelete.deletedAt) {
            return res.status(404)
                      .json({
                        ok: false,
                        msg: 'La nota a eliminar no fue encontrada o no existe'
                      })  
        }

        await Notes.findByIdAndUpdate(id, { deletedAt: new Date()}, {new: true})

        res.json({
            ok: true,
            msg: 'La nota fue eliminada con éxito'
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Ha habido un error en el servidor'
        })
    }
}