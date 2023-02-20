import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '../entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/put-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    private eventEmitter: EventEmitter2,
  ) {}

  async findAll(): Promise<Artist[]> {
    const artists = await this.artistsRepository.find();
    return artists;
  }

  async findOne(id: string): Promise<Artist> {
    const found = await this.artistsRepository.findOneBy({ id });
    if (found) {
      return found;
    }
    throw new NotFoundException(`Artist with ${id} not found!`);
  }

  async create(dto: CreateArtistDto): Promise<Artist> {
    const newArtist = await this.artistsRepository.save(dto);
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
    await this.artistsRepository.update(id, artist);
    return artist;
  }

  async delete(id: string) {
    const found = await this.artistsRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Artist with ${id} not found!`);
    }

    this.eventEmitter.emit('delete.artist', id);
    await this.artistsRepository.delete(id);
  }

  async findByIds(ids: string[]): Promise<Artist[]> {
    return this.artistsRepository.find({ where: { id: In(ids) } });
  }
}
