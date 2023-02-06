import { IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
