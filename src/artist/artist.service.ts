import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from './artist.interface';
import { Database } from '../db/database';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuid } from 'uuid';
import { UpdateArtistDto } from './dto/put-artist.dto';
import { from, Observable } from 'rxjs';

@Injectable()
export class ArtistService {
  private artists: Artist[] = Database.artists;

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  async findOne(id: string): Promise<Artist> {
    const found = this.artists.find((artist) => artist.id === id);
    if (found) {
      return found;
    }
    throw new NotFoundException(`Artist with ${id} not found!`);
  }

  async create(dto: CreateArtistDto): Promise<Artist> {
    const newArtist: Artist = {
      id: uuid(),
      ...dto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist> {
    const _artist = await this.findOne(id);

    if (!_artist) {
      throw new NotFoundException(`Artist with ${id} not found!`);
    }
    const artist = {
      ..._artist,
      ...dto,
    };
    // if (artist.password !== dto.oldPassword) {
    //   throw new ForbiddenException('artist not unauthorized');
    // }
    //
    // artist.password = dto.newPassword;
    // artist.updatedAt = Date.now();
    // artist.version++;
    Database.artists.push(artist);
    return artist;
  }

  save(data: Artist): Observable<Artist> {
    this.artists = [...this.artists, data];
    return from(this.artists);
  }

  async delete(id: string) {
    const idx = this.artists.findIndex((artist) => artist.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Artist with ${id} not found!`);
    }
    Database.tracks.map((track) => {
      if (track.artistId === id) track.artistId = null;
    });

    this.artists.splice(idx, 1);
  }
}
