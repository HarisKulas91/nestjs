import { Controller, Get, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBody, ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ResponseDto } from './common/dto/ResponseDto.dto';
import { LoginDto, LoginResponse } from './common/dto/Login.dto';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
@Controller()
export class AppController {
  constructor(private authService: AuthService, private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  @ApiTags('Employees')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status:201, type: LoginResponse})
  @ApiResponse({ status: 401, description: 'Unauthorized' , type: ResponseDto})
  @ApiResponse({ status: 500, description: 'Internal server error', type: ResponseDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get()
  @ApiExcludeEndpoint()
  getHello(): string {
    return this.appService.getHello();
  }
}
