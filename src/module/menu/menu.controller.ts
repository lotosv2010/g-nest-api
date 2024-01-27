import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Roles } from 'src/common/decorators';
import { Action, Role } from 'src/common/constants';
import { JwtGuard, RoleGuard } from 'src/common/guards';
import { CaslGuard } from 'src/common/guards/casl.guard';
import { Can, CheckPolices } from 'src/common/decorators/casl.decorator';
import { Menu } from './entities/menu.entity';

@Controller('menu')
@Roles(Role.ADMIN)
@UseGuards(JwtGuard, RoleGuard, CaslGuard)
@CheckPolices((ability) => ability.can(Action.Read, Menu))
@Can(Action.Read, Menu)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @Can(Action.Create, Menu)
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @Can(Action.Read, Menu)
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.remove(id);
  }
}
