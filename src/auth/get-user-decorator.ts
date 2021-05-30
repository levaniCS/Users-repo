import { createParamDecorator } from '@nestjs/common';
import { UserDoc } from './types/auth.type';

export const GetUser = createParamDecorator((_, req): UserDoc => req.user)