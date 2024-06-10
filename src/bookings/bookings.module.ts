import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "./entities/booking.entity";
import { PostgresqlModule } from "../storages/postgresql/postgresql.module";

@Module({
  imports: [PostgresqlModule.forEntity(Booking)],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
