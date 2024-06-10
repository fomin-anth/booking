import { Module } from '@nestjs/common';
import { StorageModule } from '../storages/storage.module';
import { UsersModule } from '../users/users.module';
import { RoomsModule } from '../rooms/rooms.module';
import { BookingsModule } from '../bookings/bookings.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    StorageModule,
    UsersModule,
    RoomsModule,
    BookingsModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
