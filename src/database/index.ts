import 'dotenv/config'
import { DataSource, DataSourceOptions } from "typeorm"
import { join } from "path";


export const appDataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.DB_USERNAME,
    password: String(process.env.DATABASE_PASSWORD),
    database: process.env.DATABASE_NAME,
    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
    schema: process.env.DATABASE_SCHEMA,
    entities: [join(__dirname, "./entities/**/*.entity.{ts,js}")],
    migrations: [join(__dirname, "./migrations/**/*.migration.{ts,js}")],
    migrationsTableName: "migrations"

}


export const connection: DataSource = new DataSource(appDataSourceOptions)