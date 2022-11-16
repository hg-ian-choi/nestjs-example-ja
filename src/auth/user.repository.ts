import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(_authCredentialDto: AuthCredentialDto): Promise<User> {
    const { username, password } = _authCredentialDto;

    const user = this.create({ username, password });

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
}
