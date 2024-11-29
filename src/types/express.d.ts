import { UserEntity } from "src/database/entities/user.entity";



declare global {
    namespace Express {
        export interface Request {
            user?: UserEntity;

        }
    }
}


