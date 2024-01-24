import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: `Username must be between $constraint1 and $constraint2 characters long, current value is $value`,
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 64, {
    message: `Password must be between $constraint1 and $constraint2 characters long, current value is $value`,
  })
  password: string;
}
