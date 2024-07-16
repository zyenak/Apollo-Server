import { Sequelize } from 'sequelize';
import { db_host, db_port, db_name, db_user, db_password } from './config.js';



console.log(db_host, db_name, db_port, db_user);

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: db_host,
  port: db_port,
  database: db_name,
  username: db_user,
  password: db_password,
});

export default sequelize;
