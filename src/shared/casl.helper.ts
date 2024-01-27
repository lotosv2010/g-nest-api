import { Log } from 'src/module/log/entities/log.entity';
import { Menu } from 'src/module/menu/entities/menu.entity';
import { Role } from 'src/module/role/entities/role.entity';
import { User } from 'src/module/user/entities/user.entity';

export const getEntities = (path: string) => {
  // /users ->User , /logs -> Logs, /roles -> Roles, /menus -> Menus, /auth -> 'Auth'
  const map = {
    '/users': User,
    '/logs': Log,
    '/roles': Role,
    '/menus': Menu,
    '/auth': 'Auth',
  };

  for (let i = 0; i < Object.keys(map).length; i++) {
    const key = Object.keys(map)[i];
    if (path.startsWith(key)) {
      return map[key];
    }
  }
};
