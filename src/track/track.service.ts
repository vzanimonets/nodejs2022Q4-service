import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './track.interface';
import { v4 as uuid } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/put-track.dto';
import { Database } from '../db/database';

@Injectable()
export class TrackService {
  private tracks: Track[] = Database.tracks;

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  async findOne(id: string): Promise<Track> {
    const found = this.tracks.find((track) => track.id === id);
    if (found) {
      return found;
    }
    throw new NotFoundException(`Track with ${id} not found!`);
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    const newTrack: Track = {
      id: uuid(),
      ...dto,
    };
    this.tracks.push(newTrack);
    return newTrack;
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
    this.tracks.push(track);
    return track;
  }

  async delete(id: string) {
    const idx = this.tracks.findIndex((track) => track.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Track with ${id} not found!`);
    }

    this.tracks.splice(idx, 1);
  }
}
