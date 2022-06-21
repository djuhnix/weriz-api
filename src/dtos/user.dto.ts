import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}

export class GetUserDto {
  @IsBoolean()
  @IsOptional()
  public authenticated?: boolean;
}
