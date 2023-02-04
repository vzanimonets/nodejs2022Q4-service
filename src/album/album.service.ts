import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuid } from 'uuid';
import { UpdateAlbumDto } from './dto/put-album.dto';
import { Database } from '../db/database';

@Injectable()
export class AlbumService {
  private albums: Album[] = Database.albums;

  async findAll(): Promise<Album[]> {
    return this.albums;
  }

  async findOne(id: string): Promise<Album> {
    const found = this.albums.find((track) => track.id === id);
    if (found) {
      return found;
    }
    throw new NotFoundException(`Album with ${id} not found!`);
  }

  async create(dto: CreateAlbumDto): Promise<Album> {
    const newAlbum: Album = {
      id: uuid(),
      ...dto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<Album> {
    const _album = await this.findOne(id);

    if (!_album) {
      throw new NotFoundException(`Album with ${id} not found!`);
    }

    Database.tracks.map((track) => {
      if (track.albumId === id) track.albumId = album.id;
    });

    const album = {
      ..._album,
      ...dto,
    };

    Database.albums.push(album);

    return album;
  }

  async delete(id: string) {
    const idx = this.albums.findIndex((album) => album.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Album with ${id} not found!`);
    }
    Database.tracks.map((track) => {
      if (track.albumId === id) track.albumId = null;
    });

    this.albums.splice(idx, 1);
  }
}
