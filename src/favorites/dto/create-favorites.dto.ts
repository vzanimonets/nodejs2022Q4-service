import { IsString } from 'class-validator';

export class CreateFavoritesDto {
  @IsString()
  name: string;
  grammy: boolean;
}
