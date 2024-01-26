import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  async findAll() {
    const [data, count] = await this.roleRepository.findAndCount();
    return {
      data,
      count,
    };
  }

  async findByIds(ids: number[]) {
    return await this.roleRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async findOne(id: number) {
    return await this.roleRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    // role.name = updateRoleDto.name;
    const newRole = this.roleRepository.merge(role, updateRoleDto);
    return await this.roleRepository.save(newRole);
  }

  async remove(id: number) {
    // delete  -> AfterRemove 不会触发
    return await this.roleRepository.delete(id);
  }
}
