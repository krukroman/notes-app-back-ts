import { Schema, model } from 'mongoose';
import * as Joi from 'joi';

export interface INote {
  name: string;
  category: string;
  content: string;
  dates?: string;
  archived?: boolean;
  createdAt?: string;
}

const noteSchema = new Schema<INote>(
  {
    name: {
      type: String,
      required: [true, `Set name for note`]
    },
    category: {
      type: String,
      required: [true, `Set category for note`]
    },
    content: {
      type: String,
      required: [true, `Set comment for note`]
    },
    dates: {
      type: String,
      default: ''
    },
    archived: {
      type: Boolean,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export const Note = model('note', noteSchema);

export const noteValidationJoi = Joi.object({
  name: Joi.string().required().min(1),
  category: Joi.string().required(),
  content: Joi.string().required().min(1)
});

export const archiveValidationJoi = Joi.object({
  archived: Joi.boolean().required()
});
