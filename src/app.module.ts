import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', true);

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
  ],
})
export class AppModule {}
