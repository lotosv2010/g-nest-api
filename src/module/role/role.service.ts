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
  create(createRoleDto: CreateRoleDto) {
    console.log(createRoleDto);
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all role`;
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

  update(id: number, updateRoleDto: UpdateRoleDto) {
    console.log(updateRoleDto);
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
