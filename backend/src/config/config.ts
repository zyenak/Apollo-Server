import dotenv from 'dotenv';
dotenv.config();

export const db_host = String('localhost');
export const db_port = Number(process.env.DB_PORT) || 5432;
export const db_name = String('postgres');
export const db_user = String('postgres');
export const db_password = String('password');

console.log(db_host, db_name, db_port, db_user);
