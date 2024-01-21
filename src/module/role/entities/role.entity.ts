import { User } from 'src/module/user/entities/user.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
