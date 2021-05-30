/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['DONE', 'IN_PROGRESS', 'OPEN'],
    default: 'OPEN'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
    select: false, // password should not be visible for Client
  }
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

TaskSchema.index({ status: 1 });
TaskSchema.index({ title: 1 });

export { TaskSchema };
