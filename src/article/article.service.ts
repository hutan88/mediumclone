import { Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { ArticleEntity } from "./article.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "src/user/user.entity";
import { ArticleResponseInterface } from "./types/articleResponse.interface";
import slugify from "slugify";
import { IsLowercase } from "class-validator";
@Injectable()
export class ArticleService{
    constructor(
        @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>){}
async createArticle(
    currentUser: UserEntity,
    createArticleDto: CreateArticleDto): Promise<ArticleEntity>
{
    const article = new ArticleEntity();
    Object.assign(article,createArticleDto);
    if(!article.tagList){
        article.tagList=[];
    }
    article.slug= this.getSlug(createArticleDto.title);
    article.author=currentUser;
    return await this.articleRepository.save(article);
}
    buildArticleResponse(article: ArticleEntity): ArticleResponseInterface{

        return {article};
    }

    private getSlug(title: string): string{

        return slugify(title, {lower: true})+ 
        '-' +
         ((Math.random() * Math.pow(36,6))|0).toString(36);
    }

}