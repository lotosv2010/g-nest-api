import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from 'src/module/role/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 200)
  password: string;

  roles?: number[] | Role[];
}
