import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(_authCredentialDto: AuthCredentialDto): Promise<User> {
    const { username, password } = _authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (_error) {
      if (_error.code === '23505') {
        throw new ConflictException(`Existing username`);
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async signIn(_authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = _authCredentialDto;
    const user = await this.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'Login success';
    } else {
      throw new UnauthorizedException('Login failed');
    }
  }
}
