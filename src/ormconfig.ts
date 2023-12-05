import { ConnectionOptions, DataSourceOptions } from "typeorm";
import { TagEntity } from "./tag/tag.entity";

const config:DataSourceOptions={
    type: 'postgres',
    host: '192.168.245.170',
    port: 6543,
    username: 'postgres',
    password: 'postgres',
    database: 'mediumclone', 
    entities: [TagEntity],
    synchronize: false,
}
export default config;
