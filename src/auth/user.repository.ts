import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(_authCredentialDto: AuthCredentialDto): Promise<User> {
    const { username, password } = _authCredentialDto;

    const user = this.create({ username, password });
    await this.save(user);

    return user;
  }
}
