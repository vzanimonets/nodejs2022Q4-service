import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Favorites')
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  typeId: string;
}
