import {Category} from "../models/categories.models";
import {ICategory} from "../types/categories";


export const getAllCategory = async (): Promise<ICategory[]> => {
    return await Category.find().exec(); //
}

export const getCategoryById = async (id: string): Promise<ICategory | null> => {
return await Category.findById(id);
}

export const createCategory = async (data: ICategory) => {
    const newCategory = new Category(data);
    return await newCategory.save();
}

export const updateCategory = async (id: string, data: ICategory) => {
const category =  Category.findByIdAndUpdate(id, data, {new: true}); //new para que devuelva el objeto actualizado
return category; //si mongo no encuentra el id, devuelve null
};

export const deleteCategory = async (id: string): Promise<ICategory | null> => {
    return await Category.findByIdAndDelete(id);
}