import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class GetUserDto {
  @IsBoolean()
  @IsOptional()
  public authenticated?: boolean;
}
