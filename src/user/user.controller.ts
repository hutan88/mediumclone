import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "src/user/dto/createUser.dto";
import { UserResponseInterface } from "./types/userResponse.interface";
import { LoginUserDto} from "src/user/dto/loginUser.dto";
import { User } from "./decoratores/user.decorator";
import { UserEntity } from "./user.entity";

@Controller()
export class UserController{
    constructor(private readonly userService:UserService){}
    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') createUserDto:CreateUserDto):Promise<UserResponseInterface>{
        
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Post('users/login')
    @UsePipes(new ValidationPipe())
    async login(@Body('user') loginUserDto:LoginUserDto): Promise<UserResponseInterface>
    {
        const user = await this.userService.login(loginUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Get('user')
    async currentUser(
        @User() user: UserEntity
        ): Promise<UserResponseInterface>
    {
        return this.userService.buildUserResponse(user);
    }
}   