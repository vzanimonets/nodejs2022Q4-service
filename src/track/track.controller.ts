import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './track.interface';
import { UpdateTrackDto } from './dto/put-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAllPosts(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.trackService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTrack(@Body() track: CreateTrackDto): Promise<Track> {
    return await this.trackService.create(track);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    return await this.trackService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id): Promise<void> {
    return this.trackService.delete(id);
  }
}
