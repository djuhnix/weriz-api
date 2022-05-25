import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  public firstname? = '';

  @IsString()
  public lastname? = '';

  @IsNotEmpty()
  public userId: string;
}
