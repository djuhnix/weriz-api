import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  public name? = '';

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public code? = '';
}
