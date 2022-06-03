import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  site_admin: boolean;
}
