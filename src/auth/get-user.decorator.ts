import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const getUser = createParamDecorator(
  (_data, _ctx: ExecutionContext): User => {
    const req = _ctx.switchToHttp().getRequest();
    return req.user;
  },
);
