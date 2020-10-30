import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    min: 4,
    max: 128,
    required: true
  },
  PasswordHash: {
    type: String,
    required: true
  },
  CreationDate: {
    type: Number,
    required: true
  }
})

export const UserEntity = mongoose.model('Users', UserSchema);
