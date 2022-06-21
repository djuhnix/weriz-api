import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  public name? = '';
}

export class JoinCommunityDto {
  @IsString()
  @IsNotEmpty()
  public code? = '';
}

export class GetCommunityDto {
  @IsString()
  @IsOptional()
  public name? = '';

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public code? = '';
}
