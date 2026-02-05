import mongoose, {Schema} from "mongoose";
import { ICategory } from "../types/categories";

// Definimos Schema
const categorySchema: Schema<ICategory> = new Schema<ICategory>(
    {
        name: { 
            type: String, 
            required: true, 
            unique: true, 
            trim: true, // elimina espacios en blanco al inicio y al final
    },
        description: { type: String },
    },
    { timestamps: true } // crea createdAt y updatedAt automáticamente
);

// Definimos el modelo
export const Category = mongoose.model<ICategory>('Category', categorySchema);