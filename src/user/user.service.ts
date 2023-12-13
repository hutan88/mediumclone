import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {sign} from 'jsonwebtoken';
import { JWT_SECRET } from "src/config";
import { UserResponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "src/user/dto/loginUser.dto";
import { compare} from "bcrypt";


@Injectable() 
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity>
    {
        const userByEmail = await this.userRepository.findOne({email: createUserDto.email});
        const userByUsername = await this.userRepository.findOne({username: createUserDto.username});
        if (userByEmail || userByUsername) {
            throw new HttpException('Email Or UserName Already Exist',HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const newUser= new UserEntity();
        Object.assign(newUser,createUserDto);
        return await this.userRepository.save(newUser);
    }

    async login(logiUsernDto: LoginUserDto): Promise<UserEntity>
    {
        const user  = await this.userRepository.findOne(
            {username: logiUsernDto.username},
            {select: ['id','username','email','bio','image','password']});
        if (!user) {
            throw new HttpException('Credebtial are not valid',HttpStatus.UNPROCESSABLE_ENTITY);
        };
        const isPasswordCorrect = await compare(logiUsernDto.password,user.password);

        if (!isPasswordCorrect) {
            throw new HttpException('Password is wrong',HttpStatus.BAD_REQUEST);
        }
        delete user.password;
        return user;
        
    }

    async findById(id: number): Promise<UserEntity>
    {
        return await this.userRepository.findOne(id);
    }
    generateJwt(user: UserEntity):string {
        return  sign({
            id: user.id,
            username: user.username,
            email: user.email
        },
        JWT_SECRET);
    }
    buildUserResponse(user:UserEntity): UserResponseInterface {
        return{
            user:{
                ...user,
                token: this.generateJwt(user)
            }
        }
    }
} 