import { BadRequestException, UnauthorizedException, ValidationPipe } from '@nestjs/common';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { USER_ALREADY_EXIST, USER_NOT_FOUNT, WRONG_PASSWORD } from './auth.const';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const hasUser = await this.authService.find(dto.login);

    if (hasUser) {
      throw new BadRequestException(USER_ALREADY_EXIST);
    }

    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    const neededUser = await this.authService.find(dto.login);

    if (!neededUser) {
      throw new UnauthorizedException(USER_NOT_FOUNT);
    }

    const passwordMatch = await this.authService.validateUser(neededUser, dto.password);

    if (!passwordMatch) {
      return new UnauthorizedException(WRONG_PASSWORD);
    }

    return this.authService.login(dto.login);
  }
}
