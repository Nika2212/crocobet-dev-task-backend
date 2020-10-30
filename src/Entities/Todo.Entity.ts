import * as mongoose from 'mongoose';
import { Schema } from "mongoose";

const TodoSchema = new mongoose.Schema({
  Title: {
    type: String,
    min: 2,
    max: 255,
    required: true
  },
  Description: {
    type: String,
    max: 255 * 255,
    required: false
  },
  Status: {
    type: Boolean,
    required: true,
    default: false
  },
  CreationDate: {
    type: Number,
    required: true
  },
  ExpirationDate: {
    type: Number,
    required: false
  },
  AssignedUserIds: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
})

export const TodoEntity = mongoose.model('Todos', TodoSchema);
