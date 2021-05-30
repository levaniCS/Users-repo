import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserDoc, UserModel } from './types/auth.type';
import { JwtPayload } from './types/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('Auth') private userModel: UserModel
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET || 'topSecret51',
    })
  }

  async validate(payload: JwtPayload): Promise<UserDoc> {
    const { username } = payload 
    const user = await this.userModel.findOne({ username })
    if(!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}