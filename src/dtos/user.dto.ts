import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsOptional()
  @IsEmail()
  public email?: string;
}

export class ForgotPasswordDto {
  @IsOptional()
  @IsEmail()
  public email?: string;
}

export class ResetPasswordDto {
  @IsString()
  public password: string;

  @IsString()
  public token: string;
}

export class GetUserDto {
  @IsBoolean()
  @IsOptional()
  public authenticated?: boolean;

  @IsEmail()
  @IsOptional()
  public email?: string;
}
