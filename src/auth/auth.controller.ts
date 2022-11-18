import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) _authCredentialDto: AuthCredentialDto,
  ): Promise<User> {
    return this.authService.signUp(_authCredentialDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) _authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(_authCredentialDto);
  }

  @UseGuards(AuthGuard())
  @Post('/test')
  test(@Req() _req) {
    console.log('req', _req);
  }
}
