import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Repository } from '../../constants/constants';

@Entity(Repository.BOOKING)
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(Repository.ROOM)
  @Column({ nullable: false })
  roomId: number;

  @ManyToOne(Repository.USER)
  @Column({ nullable: false, foreignKeyConstraintName: 'id' })
  userId: number;

  @Column({ type: 'timestamp', nullable: false })
  startDate: Date;

  @Column()
  days: number;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;
}
