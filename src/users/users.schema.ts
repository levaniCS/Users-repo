/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
  type: String,
  site_admin: Boolean,
}, {
  // when data will outputed as JSON
  toJSON: {
    virtuals: true,
  }
})

export { UsersSchema };
