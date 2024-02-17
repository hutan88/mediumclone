import { IsNotEmpty } from "class-validator";

export class CreateArticleDto{

    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly describtion: string;

    @IsNotEmpty()
    readonly body: string;

    readonly tagList?: string[];

}