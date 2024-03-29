import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { AuthGuard } from "src/user/guards/auth.guards";
import { User } from "src/user/decoratores/user.decorator";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { UserEntity } from "src/user/user.entity";
import { ArticleResponseInterface } from "./types/articleResponse.interface";

@Controller('articles')
export class ArticleController
{
    constructor(private readonly articleService: ArticleService){}
 @Post()
 @UseGuards(AuthGuard)
 @UsePipes(new ValidationPipe())
 async create(@User()currentUser: UserEntity,
 @Body('article')createArticleDto:CreateArticleDto): Promise<ArticleResponseInterface>
 {
    const article= await this.articleService.createArticle(currentUser,createArticleDto);
    return this.articleService.buildArticleResponse(article);
 }

 @Get(':slug')
 async getSinlgeArticle(@Param('slug') slug: string): Promise<ArticleResponseInterface >
 {
   const article = await this.articleService.findBySlug(slug);
   return this.articleService.buildArticleResponse(article);
 }

 @Delete(':slug')
 @UseGuards(AuthGuard)
 async deleteArticle(@User('id') currentUserId: number, @Param('slug')slug: string)
 {
   return await this.articleService.deleteArticle(slug, currentUserId);
 }
 
 @Put(':slug')
 @UseGuards(AuthGuard)
 @UsePipes(new ValidationPipe())
 async updateArticle(@User('id') currentUserId: number, @Param('slug') slug: string, 
 @Body('article') updateArticleDto: CreateArticleDto)
 {
  const article= await this.articleService.updateArticle(slug, updateArticleDto, currentUserId);
  return await this.articleService.buildArticleResponse(article);
 }

}
