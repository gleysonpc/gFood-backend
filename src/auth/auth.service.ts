import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  async signIn(email: string) {
    const user = await User.findOne({ where: { email }, relations: ['store'] });
    if (!user) {
      throw new UnauthorizedException('Email not found ');
    }
    return user;
  }
}
