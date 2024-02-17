import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { AuthGuard } from "src/user/guards/auth.guards";
import { User } from "src/user/decoratores/user.decorator";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { UserEntity } from "src/user/user.entity";

@Controller('articles')
export class ArticleController
{
    constructor(private readonly articleService: ArticleService){}
 @Post()
 @UseGuards(AuthGuard)
 async create(@User()currentUser: UserEntity,
 @Body('article')createArticleDto:CreateArticleDto): Promise<any>
 {
    return await this.articleService.createArticle(currentUser,createArticleDto);
 }
}
