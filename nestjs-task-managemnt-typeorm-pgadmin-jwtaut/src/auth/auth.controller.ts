import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/registerdto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // controller to register a new user
  @Post('/register')
  async register(@Body() newuser: UserDto): Promise<User> {
    return await this.authService.register(newuser);
  }

  @Post('/login')
  async login(@Body() userlogin: UserDto): Promise<{ accesstoken: string }> {
    return await this.authService.login(userlogin);
  }
  // validate teh route
  @Post('/test')
  @UseGuards(AuthGuard())
  async test(@Req() req) {
    console.log(req.user.username);
  }
}
