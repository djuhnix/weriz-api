import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  public firstname? = '';

  @IsString()
  public lastname? = '';

  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsNotEmpty()
  public userId: string;

  @IsString()
  public communityCode?: string;
}

export class GetMemberDto {
  @IsString()
  @IsOptional()
  public firstname? = '';

  @IsString()
  @IsOptional()
  public lastname? = '';

  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsNotEmpty()
  @IsOptional()
  public userId?: string;

  @IsString()
  @IsOptional()
  public communityCode?: string;
}
