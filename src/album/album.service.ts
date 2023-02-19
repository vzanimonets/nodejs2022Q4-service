import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '../entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuid } from 'uuid';
import { UpdateAlbumDto } from './dto/put-album.dto';
import { Database } from '../db/database';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async findAll(): Promise<Album[]> {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async findOne(id: string): Promise<Album> {
    const found = await this.albumRepository.findOneBy({ id });
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
    await this.albumRepository.save(newAlbum);
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

    await this.albumRepository.update(id, album);
    return album;
  }

  async delete(id: string) {
    const found = await this.albumRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Album with ${id} not found!`);
    }
    await this.albumRepository.delete(id);
  }
}
