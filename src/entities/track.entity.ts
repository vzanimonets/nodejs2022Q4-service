import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from './album.entity';
import { Artist } from './artist.entity';

@Entity('Track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string;

  @Column({ nullable: true })
  albumId: string;

  @Column()
  duration: number;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  artist: Artist;

  @ManyToOne(() => Album, { onDelete: 'SET NULL' })
  album: Album;
}
