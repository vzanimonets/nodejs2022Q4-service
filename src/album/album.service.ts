import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '../entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/put-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    private eventEmitter: EventEmitter2,
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
    return this.albumRepository.save(dto);
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<Album> {
    const _album = await this.findOne(id);

    if (!_album) {
      throw new NotFoundException(`Album with ${id} not found!`);
    }

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

    this.eventEmitter.emit('delete.album', id);

    await this.albumRepository.delete(id);
  }
}
