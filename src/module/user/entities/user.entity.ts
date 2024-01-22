import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Log } from 'src/module/log/entities/log.entity';
import { Role } from 'src/module/role/entities/role.entity';
import { Profile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile;

  @OneToMany(() => Log, (log) => log.user, { cascade: true })
  logs: Log[];

  @ManyToMany(() => Role, (role) => role.users, { cascade: ['insert'] })
  @JoinTable({ name: 'users_roles' })
  roles: Role[];
}
