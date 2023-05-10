import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
    // return { id: user.id, email: user.email, name: user.name };
  }
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Get()
  async getAllUsers() {
    return this.authService.findAll();
  }

  @Get(':id')
  async getUser(
    @Param('id')
    id: string,
  ) {
    return this.authService.findById(id);
  }
}
