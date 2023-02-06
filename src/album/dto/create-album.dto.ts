import {
  IsDefined,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsDefined()
  name: string;
  @IsNumber()
  @IsDefined()
  year: number;
  @ValidateIf((_, value) => !(value === null))
  @IsUUID()
  artistId: string | null; // refers to Artist
}
