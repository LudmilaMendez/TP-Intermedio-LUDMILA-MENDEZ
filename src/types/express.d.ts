
import { JwtPayload } from './auth'; // Tu import actual

declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload;
    }
}
