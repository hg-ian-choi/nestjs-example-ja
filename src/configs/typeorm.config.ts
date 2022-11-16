import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1213',
  database: 'nestjs-example-ja',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
