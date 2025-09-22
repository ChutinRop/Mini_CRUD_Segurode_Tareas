// backend/data-source.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config(); // Carga las variables de entorno del archivo .env

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5434', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // CAMBIA ESTAS LÍNEAS PARA APUNTAR A LA CARPETA SRC
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});