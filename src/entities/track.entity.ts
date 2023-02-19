import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
