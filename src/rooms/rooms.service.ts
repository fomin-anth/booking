import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { CsvProvider } from '../storages/csv/csv.provider';
import { IStorage } from '../storages/storage.interfaces';

@Injectable()
export class RoomsService {
  constructor(@Inject(CsvProvider) private roomStorage: IStorage<Room>) {}
  create(createRoomDto: CreateRoomDto) {
    return this.roomStorage.create(createRoomDto);
  }

  findAll() {
    return this.roomStorage.find();
  }

  findOne(id: number) {
    return this.roomStorage.findOne({ id });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
