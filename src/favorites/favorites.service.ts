import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Favorites } from '../entities/favorites.entity';
import { Favorites as FavoritesResponse } from './favorites.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';
import { Track } from '../entities/track.entity';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async get(): Promise<FavoritesResponse> {
    const allFavorites = await this.favoritesRepository.find();
    const ids = {
      artistIds: [],
      albumIds: [],
      trackIds: [],
    };
    allFavorites.forEach((fav) => {
      if (fav.type === 'artist') {
        ids.artistIds.push(fav.typeId);
      }
      if (fav.type === 'album') {
        ids.albumIds.push(fav.typeId);
      }
      if (fav.type === 'track') {
        ids.trackIds.push(fav.typeId);
      }
    });
    const artists = await this.artistService.findByIds(ids.artistIds);
    const albums = await this.albumService.findByIds(ids.albumIds);
    const tracks = await this.trackService.findByIds(ids.trackIds);

    return { artists, albums, tracks };
  }

  async addFavorite(type: string, id: string): Promise<Artist | Album | Track> {
    switch (type) {
      case 'artist':
        const artist = (await this.artistService.findAll()).find(
          (artist) => artist.id === id,
        );
        if (!artist) throw new UnprocessableEntityException('Artist not found');
        await this.favoritesRepository.save({
          type: 'artist',
          typeId: id,
        });
        return this.artistService.findOne(id);
      case 'album':
        const album = (await this.albumService.findAll()).find(
          (album) => album.id === id,
        );
        if (!album) throw new UnprocessableEntityException('Album not found');
        await this.favoritesRepository.save({
          type: 'album',
          typeId: id,
        });
        return this.albumService.findOne(id);
      case 'track':
        const track = (await this.trackService.findAll()).find(
          (track) => track.id === id,
        );
        if (!track) throw new UnprocessableEntityException('Track not found');
        await this.favoritesRepository.save({
          type: 'track',
          typeId: id,
        });
        return this.trackService.findOne(id);
      default:
        throw new Error('Unknown type');
    }
  }

  async deleteFavorite(type: string, id: string) {
    switch (type) {
      case 'artist':
        return this.favoritesRepository.delete({ type: 'artist', typeId: id });
      case 'album':
        return this.favoritesRepository.delete({ type: 'album', typeId: id });
      case 'track':
        return this.favoritesRepository.delete({ type: 'track', typeId: id });
      default:
        throw new Error('Unknown type');
    }
  }

  @OnEvent('delete.track')
  async deleteTrack(id: string) {
    await this.favoritesRepository.delete({ type: 'track', typeId: id });
  }

  @OnEvent('delete.artist')
  async deleteArtist(id: string) {
    await this.favoritesRepository.delete({ type: 'artist', typeId: id });
  }

  @OnEvent('delete.album')
  async deleteAlbum(id: string) {
    await this.favoritesRepository.delete({ type: 'album', typeId: id });
  }
}
