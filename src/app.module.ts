import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistService } from './artist/artist.service';
import { ArtistController } from './artist/artist.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    AlbumModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          database: config.get<string>('TYPEORM_DB'),
          username: config.get<string>('TYPEORM_USERNAME'),
          password: config.get<string>('TYPEORM_PASSWORD'),
          host: config.get<string>('TYPEORM_DB_HOST'),
          port: config.get<number>('TYPEORM_PORT'),
          entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
          synchronize: true,
          autoLoadEntities: true,
          logging: true,
        };
      },
    }),
  ],

  controllers: [AppController, ArtistController, FavoritesController],
  providers: [AppService, ArtistService, FavoritesService],
})
export class AppModule {}
