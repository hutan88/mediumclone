import { UserEntity } from "src/user/user.entity";
import { Request } from "express";

export interface ExpressRequest extends Request{
    user?: UserEntity
}