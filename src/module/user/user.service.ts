import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.password = createUserDto.password;
    return this.userRepository.save(newUser);
  }

  async findAll(queryUserDto: QueryUserDto) {
    console.log(queryUserDto);
    const {
      page = 1,
      pageSize = 20,
      username = '',
      gender = '',
      role = '',
    } = queryUserDto;
    const total = await this.userRepository.count({
      where: {
        username: Like(`%${username}%`),
        profile: {
          gender: Like(`%${gender}%`),
        },
        roles: {
          name: Like(`%${role}%`),
        },
      },
    });
    const data = await this.userRepository.find({
      select: {
        id: true,
        username: true,
      },
      relations: {
        profile: true,
        roles: true,
        logs: true,
      },
      where: {
        username: Like(`%${username}%`),
        profile: {
          gender: Like(`%${gender}%`),
        },
        roles: {
          name: Like(`%${role}%`),
        },
      },
      skip: (+page - 1) * +pageSize,
      take: +pageSize,
    });
    return {
      total,
      data,
    };
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const profile = await this.findProfileOne(id);
    const newUser = this.userRepository.merge(profile, updateUserDto);
    return this.userRepository.save(newUser);
  }

  async remove(id: number) {
    const delUser = await this.findOne(id);
    return this.userRepository.remove(delUser);
  }

  async findProfileOne(id: number) {
    return await this.userRepository.findOne({
      relations: {
        profile: true,
      },
      where: { id },
    });
  }
}
