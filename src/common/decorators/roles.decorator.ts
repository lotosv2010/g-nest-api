import { SetMetadata } from '@nestjs/common';
import { ROLE_KEY, Role } from '../constants';

export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
