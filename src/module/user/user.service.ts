import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { QueryUserDto } from './dto/query-user.dto';
import { dbConditionForamt } from 'src/shared';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly roleService: RoleService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.password = createUserDto.password;
    if (!createUserDto.roles) {
      const role = await this.roleService.findOne(2);
      newUser.roles = [role];
    }
    if (
      Array.isArray(createUserDto.roles) &&
      typeof createUserDto.roles[0] === 'number'
    ) {
      newUser.roles = await this.roleService.findByIds(
        createUserDto.roles as number[],
      );
    }
    return this.userRepository.save(newUser);
  }

  async findAll(queryUserDto: QueryUserDto) {
    const {
      page = 1,
      pageSize = 20,
      username = '',
      gender = '',
      role = '',
    } = queryUserDto;

    const conditions = {
      'profile.gender': gender,
      'roles.name': role,
    };
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.logs', 'logs')
      .where('user.username Like :username ', { username: `%${username}%` });

    const [data, total] = await dbConditionForamt(queryBuilder, conditions)
      .skip((+page - 1) * +pageSize)
      .take(+pageSize)
      .getManyAndCount();

    return {
      total,
      data,
    };
  }

  find(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const profile = await this.findProfileOne(id);
    const newUser = this.userRepository.merge(profile, updateUserDto as User);
    return this.userRepository.save(newUser);
  }

  async remove(id: number) {
    const delUser = await this.findOne(id);
    return this.userRepository.remove(delUser);
  }

  async findProfileOne(id: number) {
    return await this.userRepository.findOne({
      select: {
        id: true,
        username: true,
        create_time: true,
      },
      where: {
        // id,
        ...(id && { id }),
      },
      relations: {
        profile: true,
      },
    });
  }
}
