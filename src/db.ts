import { Sequelize } from 'sequelize';
require('dotenv').config();

const { HOST, DB_HOST, DB_USER, DB_PASSWORD, NODE_ENV } = process.env;

if (!DB_USER || !DB_PASSWORD) {
  throw new Error('Can`t get access to db user and db pass');
}
const sequelize = new Sequelize('notes_db', DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: NODE_ENV === 'development' ? HOST : DB_HOST
});

export default sequelize;
