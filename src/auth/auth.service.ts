import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserModel } from './types/auth.type';
import { JwtPayload } from './types/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private userModel: UserModel,
    private jwtService: JwtService,
    ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }>{
    try {
      const user = new this.userModel(authCredentialsDto);
      await user.save()

      const accessToken = this.jwtService.sign({ username: user.username })
      console.log(JSON.stringify(accessToken))
      return { accessToken }
    } catch(err) {
      // Duplicate username
      if(err.code === 11000) {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }>{
    const { password, username } = authCredentialsDto
    const currentUser = await this.userModel.findOne({ username })
    if (!currentUser || !(await this.userModel.correctPassword(password, currentUser.password))) {
      throw new UnauthorizedException('Incorrect email or password')
    }

    const payload: JwtPayload= { username }
    const accessToken = this.jwtService.sign(payload)

    return { accessToken }
  }

}
