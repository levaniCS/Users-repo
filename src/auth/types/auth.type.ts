import { Document, Model } from 'mongoose';

// An interface that describes the properties
// that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Doc has
export interface UserDoc extends Document {
  username: string;
  password: string;
}

// An interface that describes the properties
// that the user model has
export interface UserModel extends Model<UserDoc> {
  correctPassword: (p1: string, p2: string) => Promise<boolean>;
}