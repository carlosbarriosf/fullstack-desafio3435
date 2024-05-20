import express from "express"
import { deleteNoteById, getNote, getNoteById, postNote, updateNoteById } from "../controllers/notesController.js";
import { body, param } from "express-validator";
import { validationErrorResponse } from "../middlewares/validations.js";

const route = express.Router();

route
    .post(
        "/",
        [
            body('title')
                .exists()
                .withMessage('El título es obligatorio')
                .bail()
                .isString()
                .withMessage('El título debe ser de tipo string')
                .bail()
                .isLength({min: 1})
                .withMessage('El título no puede estar vacío'),
            body('description')
                .exists()
                .withMessage('La descripción es obligatoria')
                .bail()
                .isString()
                .withMessage('La descripción debe ser de tipo string')
                .bail()
                .isLength({min: 3})
                .withMessage('La descripción debe tener al menos 3 caracteres'),
            validationErrorResponse
        ] ,
        postNote
    )
    .get("/", getNote)
    .get(
        "/:id", 
        [
            param('id').isMongoId().withMessage('El id de la nota no es válido'),
            validationErrorResponse
        ],
        getNoteById)
    .put(
        "/update/:id",
        [
            param('id').isMongoId().withMessage('El id de la nota no es válido'),
            body('title')    
                .optional()
                .isString()
                .withMessage('El título debe ser de tipo string')
                .bail()
                .isLength({min: 1})
                .withMessage('El título no puede estar vacío'),
            body('description')
                .optional()
                .isString()
                .withMessage('La descripción debe ser de tipo string')
                .bail()
                .isLength({min: 3})
                .withMessage('La descripción debe tener al menos 3 caracteres'),
                validationErrorResponse
        ], 
        updateNoteById)
    .delete(
        "/delete/:id", 
        [
            param('id').isMongoId().withMessage('El id de la nota no es válido'),
            validationErrorResponse
        ],
        deleteNoteById)

export default route