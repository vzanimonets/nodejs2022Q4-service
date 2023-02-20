import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorites } from './favorites.interface';
import { Artist } from '../entities/artist.entity';
import { Album } from '../entities/album.entity';
import { Track } from '../entities/track.entity';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  get(): Promise<Favorites> {
    return this.favoritesService.get();
  }

  @Post('/:type/:id')
  @HttpCode(HttpStatus.CREATED)
  addFavorite(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Artist | Album | Track> {
    return this.favoritesService.addFavorite(type, id);
  }

  @Delete('/:type/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavorite(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.favoritesService.deleteFavorite(type, id);
  }
}
