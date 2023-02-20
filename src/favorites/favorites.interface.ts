import { Artist } from '../entities/artist.entity';
import { Album } from '../entities/album.entity';
import { Track } from '../entities/track.entity';

export interface Favorites {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}
