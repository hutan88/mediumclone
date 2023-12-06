import { ConnectOptions, DataSourceOptions } from "typeorm";

const config:DataSourceOptions={
    type: 'postgres',
    host: '192.168.245.170',
    port: 6543,
    username: 'mediumclone',
    password: '123',
    database: 'mediumclone', 
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
}
export default config;
