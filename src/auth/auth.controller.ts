import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dtos/users.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUsernamePassword(@Request() req): any{
    return this.service.login(req.user);
  }

  @Post('register')
  async registerUsernamePassword(@Body() user: RegisterUserDto): Promise<any>{
    return await this.service.register(user);
  }
}
