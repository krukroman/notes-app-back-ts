import {
  Sequelize,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes
} from 'sequelize';

import Joi from 'joi';
require('dotenv').config();

const { POSTGRES_USER, POSTGRES_PASSWORD, NODE_ENV } = process.env;

if (!POSTGRES_USER || !POSTGRES_PASSWORD) {
  throw new Error('Can`t get access to db user and db pass');
}
export const sequelize = new Sequelize(
  'notes_db',
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  {
    dialect: 'postgres',
    host: NODE_ENV === 'development' ? 'localhost' : 'db'
  }
);

class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare category: string;
  declare content: string;
  declare dates: CreationOptional<string>;
  declare archived: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Note.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dates: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  },
  { sequelize, tableName: 'notes' }
);

export const noteValidationJoi = Joi.object({
  name: Joi.string().required().min(1),
  category: Joi.string().required(),
  content: Joi.string().required().min(1)
});

export const archivedValidationJoi = Joi.object({
  archived: Joi.boolean().required()
});

export default Note;
