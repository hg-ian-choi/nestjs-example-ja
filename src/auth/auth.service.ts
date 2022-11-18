import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  signUp(_authCredentialDto: AuthCredentialDto): Promise<User> {
    return this.userRepository.createUser(_authCredentialDto);
  }

  signIn(_authCredentialDto: AuthCredentialDto): Promise<string> {
    return this.userRepository.signIn(_authCredentialDto);
  }
}
