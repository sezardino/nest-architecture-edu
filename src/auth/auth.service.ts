import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: AuthDto) {
    const salt = genSaltSync(10);
    const newUser = new this.userModel({ email: dto.login, hashedPassword: hashSync(dto.password, salt) });

    return newUser.save();
  }

  find(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async validateUser(user: UserModel, password: string) {
    return await compare(password, user.hashedPassword);
  }
}
