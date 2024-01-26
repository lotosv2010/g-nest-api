import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const menu = await this.menuRepository.create(createMenuDto);
    return await this.menuRepository.save(menu);
  }

  async findAll() {
    const [data, count] = await this.menuRepository.findAndCount();
    return { data, count };
  }

  async findOne(id: number) {
    return await this.menuRepository.findBy({
      id,
    });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.menuRepository.findOne({ where: { id } });
    const newMenu = await this.menuRepository.merge(menu, updateMenuDto);
    return this.menuRepository.save(newMenu);
  }

  remove(id: number) {
    return this.menuRepository.delete(id);
  }
}
