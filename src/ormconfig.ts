import {ConnectionOptions } from "typeorm";

const config:ConnectionOptions={
    type: 'postgres',
    host: '192.168.245.170',
    port: 6543,
    username: 'mediumclone',
    password: '123',
    database: 'mediumclone', 
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },

}
export default config;
