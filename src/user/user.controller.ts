import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "src/dto/createUser.dto";
import { UserResponseInterface } from "./types/userResponse.interface";

@Controller()
export class UserController{
    constructor(private readonly userService:UserService){}
    @Post('users')
    @UsePipes(new ValidationPipe)
    async createUser(@Body('user') createUserDto:CreateUserDto):Promise<UserResponseInterface>{
        
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Get('users')
    async getUsers(){
        return await this.userService.getUsers();
    }
}   