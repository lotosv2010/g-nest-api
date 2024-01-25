import { Exclude, Expose } from 'class-transformer';
import { Log } from 'src/module/log/entities/log.entity';
import { Role } from 'src/module/role/entities/role.entity';
import { Profile } from '../entities/profile.entity';

export class PublicUserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Expose()
  logs: Log[];

  @Expose()
  roles: Role[];

  @Expose()
  profile: Profile;
}
