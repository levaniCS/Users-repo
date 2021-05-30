/* eslint-disable prettier/prettier */
import { NextFunction } from 'express'
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide your username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 4,
    maxLength: 20
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tasks'
    }
  ]
}, {
  // when data will outputed as JSON
  toJSON: {
    virtuals: true,
  },
  // when data will outputed as Object
  toObject: {
    virtuals: true,
  },
})



// this refers to document
AuthSchema.pre('save', async function (next: NextFunction) {
  // if we are not modified password on document change
  if (!this.isModified('password')) return next();

  // hash the password (encryption)
  const hashedPassword = await bcrypt.hash(this.get('password'), 12)
  this.set('password', hashedPassword);
  next();
});

AuthSchema.statics.correctPassword = async function (
  typedPassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(typedPassword, userPassword);
};

export { AuthSchema };