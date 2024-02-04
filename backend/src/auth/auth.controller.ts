import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, VerifyDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(200)
  Signin(@Body() dto: AuthDto) {
    return this.authService.Signin(dto);
  }
  
  @Post('signup')
  @HttpCode(200)
  Signup(@Body() dto: AuthDto) {
    return this.authService.Signup(dto);
  }
  
  @Post('verify')
  @HttpCode(200)
  Verify(@Body() dto: VerifyDto) {
    return this.authService.Verify(dto);
  }
}
