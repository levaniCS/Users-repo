import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', true);

@Module({
  imports: [
    // Parse & load .env file from root of project
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
