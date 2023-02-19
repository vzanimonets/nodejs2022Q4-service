import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  artistId: string;
}
