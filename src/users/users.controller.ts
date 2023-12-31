import { Controller, Post, UseGuards, Body, Get, Req } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger/dist';
import { UsersSignUpDto, UsersLoginDto } from './dto/users.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { ErrorFunction } from '../error.service';

@ApiTags('Auth')
@Controller('auth')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly errorFunction:ErrorFunction
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: UsersLoginDto,
  })
  async login(@Req() req) {
    return this.authService.login(req.user).catch(this.errorFunction.RelationError);
  }

  @Post('signup')
  async signup(@Body() body: UsersSignUpDto) {
    return this.authService.signup(body).catch(this.errorFunction.RelationError);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  @ApiBearerAuth('JWT-auth')
  async getAllUsers() {
    return this.usersService.getAllUsers().catch(this.errorFunction.RelationError);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth('JWT-auth')
  async meData(@Req() req) {
    return this.usersService.meData(req.user).catch(this.errorFunction.RelationError);
  }
}
