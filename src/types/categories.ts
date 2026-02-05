export interface ICategory {
    id?: string;
    name: string;
    description?: string; // el ? indica que es opcional
    createdAt?: Date;
    updatedAt?: Date;
}
