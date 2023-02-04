import { IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
