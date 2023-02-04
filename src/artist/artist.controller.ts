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
import { ArtistService } from './artist.service';
import { Artist } from './artist.interface';
import { UpdateArtistDto } from './dto/put-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAllPosts(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.artistService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArtist(@Body() artist: Artist): Promise<Artist> {
    return await this.artistService.create(artist);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    return await this.artistService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id): Promise<void> {
    return this.artistService.delete(id);
  }
}
