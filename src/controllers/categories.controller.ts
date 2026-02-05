import { Request, Response } from 'express';
import { ICategory } from '../types/categories';
import * as categoriesService from '../services/categories.service';
// CRUD de categorias
// getAll()
export const getAll= async (_req: Request, res: Response)=>{
    // lógica para obtener todas las categorías
    try {
        const categories = await categoriesService.getAllCategory();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener las categorías' });
    }
};
// getById()
export const getById= async (req: Request, res: Response)=>{
    // lógica para obtener una categoría por ID
    const {id} = req.params;
    try {
        const category = await categoriesService.getCategoryById(id as string);
        if (!category) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener la categoría por ID' });
    }
};
// create()
//export const create= async (req: Request, res: Response)=>{
    // lógica para crear una nueva categoría
    //try {
        //const categoryData: ICategory = req.body;
        //const newCategory = await categoriesService.createCategory(categoryData);
       // return res.status(201).json(newCategory);
    //} catch (error) {
        //return res.status(500).json({ error: 'Error al crear la categoría' });
   // }
//};

export const create = async (req: Request, res: Response) => {
    try {
        // Log para ver qué está llegando desde PowerShell
        console.log("Datos recibidos:", req.body); 

        const categoryData = req.body as ICategory;
        const newCategory = await categoriesService.createCategory(categoryData);
        
        return res.status(201).json(newCategory);
    } catch (error) {
        // Para ver el error por consola
        console.error("Detalle del error:", error); 
        return res.status(500).json({ error: 'Error al crear la categoría', detail: error });
    }
};

// update()
export const update= async (req: Request, res: Response)=>{
    // lógica para actualizar una categoría por ID
    try {
        const {id} = req.params;
        const categoryData: ICategory = req.body;
        const updatedCategory = await categoriesService.updateCategory(id as string, categoryData);
        
        if (!updatedCategory) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        return res.status(200).json(updatedCategory);
    } catch (error: any) {
        // MANEJO ESPECIFICO PARA CLAVE DUPLICADA EN MONGO
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Ya existe una categoría con ese nombre' });
        }
        return res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
};
// delete()
export const deleteById= async (req: Request, res: Response)=>{
    // lógica para eliminar una categoría por ID
    try {
        const {id} = req.params;
        const deletedCategory = await categoriesService.deleteCategory(id as string);
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        return res.status(200).json({ message: `Categoría con ID ${id} eliminada exitosamente` });
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
};
