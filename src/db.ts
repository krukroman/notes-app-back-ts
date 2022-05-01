import { Sequelize } from 'sequelize';
require('dotenv').config();

const { HOST, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, NODE_ENV } = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error('Can`t get access to db user or db pass or db name');
}
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: NODE_ENV === 'development' ? HOST : DB_HOST
});

export default sequelize;
