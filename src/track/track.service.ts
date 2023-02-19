import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '../entities/track.entity';
import { v4 as uuid } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/put-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async findAll() {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async findOne(id: string): Promise<Track> {
    const found = await this.trackRepository.findOneBy({ id });
    if (found) {
      return found;
    }
    throw new NotFoundException(`Track with ${id} not found!`);
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    const newUser = this.trackRepository.create(dto);
    await this.trackRepository.save(newUser);
    return newUser;
  }

  async update(id: string, dto: UpdateTrackDto): Promise<Track> {
    const _track = await this.findOne(id);

    if (!_track) {
      throw new NotFoundException(`Track with ${id} not found!`);
    }
    const track = {
      ..._track,
      ...dto,
    };
    await this.trackRepository.update(id, track);
    return track;
  }

  async delete(id: string) {
    const found = await this.trackRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Track with ${id} not found!`);
    }

    await this.trackRepository.delete(id);
  }
}
