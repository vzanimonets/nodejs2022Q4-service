import { IsString } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  name: string;
  artistId: string | null; // refers to Artist
}
