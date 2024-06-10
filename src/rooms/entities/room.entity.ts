import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Repository } from '../../constants/constants';

@Entity(Repository.ROOM)
export class Room {
  @PrimaryGeneratedColumn()
  id: number = -1;

  @Column()
  name: string = '';

  @Column()
  userId: number = -1;
}
