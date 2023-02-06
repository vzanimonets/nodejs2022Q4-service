import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Database } from '../db/database';
import { Favorites } from './favorites.interface';
import { Album } from '../album/album.interface';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = Database.favorites;

  async get(): Promise<Favorites> {
    const response = <Favorites>{};
    Object.entries(this.favorites).map(([key, value]) => {
      response[key] = value;
    });
    return response;
  }

  async addTrack(id: string): Promise<void> {
    const idx = Database.tracks.findIndex((track) => track.id === id);

    if (idx === -1) {
      throw new NotFoundException("Track id doesn't exist");
    }
    const exist = this.favorites.tracks.find((_id) => _id === id);
    if (!exist) this.favorites.tracks.push(id);
  }

  async deleteTrack(id: string): Promise<void> {
    const idx = Database.tracks.findIndex((track) => track.id === id);
    if (idx === -1) {
      throw new UnprocessableEntityException("Track id doesn't exist");
    }
    // this.favorites.tracks.map((track) => {
    //   if (track.albumId === id) track.albumId = null;
    // });

    this.favorites.tracks.splice(idx, 1);
  }
  async deleteAlbum(id: string): Promise<void> {
    const idx = this.favorites.albums.findIndex((fid) => fid === id);
    if (idx === -1) {
      throw new UnprocessableEntityException("Track id doesn't exist");
    }
    this.favorites.tracks.filter((fid) => fid !== id);

    this.favorites.albums.splice(idx, 1);
  }
  async deleteArtist(id: string): Promise<void> {
    const idx = Database.artists.findIndex((track) => track.id === id);
    if (idx === -1) {
      throw new UnprocessableEntityException("Track id doesn't exist");
    }
    // this.favorites.tracks.map((track) => {
    //   if (track.albumId === id) track.albumId = null;
    // });

    this.favorites.artists.splice(idx, 1);
  }

  async addAlbum(id: string): Promise<Album> {
    const idx = Database.albums.findIndex((track) => track.id === id);

    if (idx === -1) {
      throw new NotFoundException("Album id doesn't exist");
    }
    Database.favorites.albums.push(id);
    return Database.albums.find((_id) => _id === id);
    // if (!exist)
  }
  async addArtist(id: string): Promise<void> {
    const idx = Database.artists.findIndex((track) => track.id === id);

    if (idx === -1) {
      throw new NotFoundException("Track id doesn't exist");
    }
    const exist = this.favorites.artists.find((_id) => _id === id);
    // if (!exist)
    Database.favorites.artists.push(id);
    const artist = Database.artists.find((artist) => {
      return artist.id === id;
    });
    return artist;
  }
}
