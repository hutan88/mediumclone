import { ConnectionOptions } from "typeorm";
import { TagEntity } from "./tag/tag.entity";

const config:ConnectionOptions={
    type: 'postgres',
    host: '192.168.245.170',
    port: 6543,
    username: 'postgres',
    password: 'postgres',
    database: 'mediumclone', 
    entities: [TagEntity],
    synchronize: true,
}
export default config;
