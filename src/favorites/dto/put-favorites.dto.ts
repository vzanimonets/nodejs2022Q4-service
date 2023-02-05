import { IsString } from 'class-validator';

export class UpdateFavoritesDto {
  @IsString()
  name: string;
  artistId: string | null; // refers to Artist
}
