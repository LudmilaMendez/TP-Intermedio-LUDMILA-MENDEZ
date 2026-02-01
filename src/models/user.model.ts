import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../types/auth';

export interface IUser extends Document {   //! LAS INTERFACES EN MONGODB EXTENDEN DE Document
    username: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(  //! EL DOCUMENT CONTIENE UN ESQUEMA CON LAS PROPIEDADES, es como se definirian las tablas en mysql
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido'],  //! ESTO AHORRARIA LAS VALIDACIONES
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: 'user',
        } as any,
    },
    {
        timestamps: true,
    }
);

//userSchema.index({ email: 1 });
//userSchema.index({ username: 1 });

export const User = mongoose.model<IUser>('User', userSchema);

// Funciones del modelo (equivalente a MySQL)
export interface UserData {  //! 
    id: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
}

export const findUser = async (
    email: string = '',
    username: string = ''
): Promise<UserData | null> => {
    const user = await User.findOne({  //!  PARA BUSCAR POR EMAIL O USERNAME EL QUE LE PASES
        $or: [{ email }, { username }],
    }).lean ();;

    if (!user) return null;

    return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role as UserRole,
    };
};

export const createUser = async (
    user: Omit<UserData, 'id' | 'role'>
): Promise<string> => {
    const newUser = new User({
        username: user.username,
        email: user.email,
        password: user.password,
        role: 'user', //!  Rol por defecto ya que MONGO NO UTILIZA TRIGGER
    });

    const saved = await newUser.save();
    return saved._id.toString();
};