import { Controller, Post, UseGuards, Body, Get, Req } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger/dist';
import { UsersSignUpDto, UsersLoginDto } from './dto/users.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { RelationError } from 'src/ErrFunction';

@ApiTags('Auth')
@Controller('auth')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: UsersLoginDto,
  })
  async login(@Req() req) {
    return this.authService.login(req.user).catch(RelationError);
  }

  @Post('signup')
  async signup(@Body() body: UsersSignUpDto) {
    return this.authService.signup(body).catch(RelationError);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  @ApiBearerAuth('JWT-auth')
  async getAllUsers() {
    return this.usersService.getAllUsers().catch(RelationError);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth('JWT-auth')
  async meData(@Req() req) {
    return this.usersService.meData(req.user).catch(RelationError);
  }
}
