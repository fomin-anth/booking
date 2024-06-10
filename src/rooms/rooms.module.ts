import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { CsvModule } from '../storages/csv/csv.module';
import { Room } from './entities/room.entity';

@Module({
  imports: [CsvModule.forEntity(Room)],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
