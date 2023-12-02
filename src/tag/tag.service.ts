import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TagEntity } from "./tag.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { privateDecrypt } from "crypto";

@Injectable()
export class TagService{
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepositoy: Repository<TagEntity>,
    ){}
 async   findAll(): Promise<TagEntity[]>
    {
        return await  this.tagRepositoy.find();
    }
}