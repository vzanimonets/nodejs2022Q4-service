import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistService } from './artist/artist.service';
import { TrackService } from './track/track.service';
import { ArtistController } from './artist/artist.controller';
import { TrackController } from './track/track.controller';
import { AlbumController } from './album/album.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { AlbumService } from './album/album.service';
import { FavoritesService } from './favorites/favorites.service';

@Module({
  imports: [UserModule],
  controllers: [
    AppController,
    ArtistController,
    TrackController,
    AlbumController,
    FavoritesController,
  ],
  providers: [
    AppService,
    ArtistService,
    TrackService,
    AlbumService,
    FavoritesService,
  ],
})
export class AppModule {}
