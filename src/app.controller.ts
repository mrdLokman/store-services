import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/Authorization/role.decorator';
import { RolesGuard } from './auth/Authorization/role.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.gaurd';
import { UserRole } from './users/users.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHelloAnonymous(): string {
    return this.appService.getHello("anonymous");
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getHelloUser(): string {
    return this.appService.getHello("user");
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('/admin')
  getHelloAdmin(): string {
    return this.appService.getHello("admin");
  }
}
