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

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  get(): Promise<Favorites> {
    return this.favoritesService.get();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', new ParseUUIDPipe()) id): Promise<void> {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('album/:id')
  async findOneAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.favoritesService.addAlbum(id);
    return album;
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id): Promise<void> {
    await this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  async findOneArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id): Promise<void> {
    await this.favoritesService.deleteArtist(id);
  }
  //
  // @Post('artist/:id')
  // async findOneArtist(@Param('id', new ParseUUIDPipe()) id: string) {
  //   return await this.favoritesService.findOne(id);
  // }
  //
  // @Delete('artist/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // deleteArtist(@Param('id', new ParseUUIDPipe()) id): Promise<void> {
  //   //return this.favoritesService.delete(id);
  // }
}
