import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RemoveBooking } from './remove-booking.command';
import { AuthenticationGuard } from './authentification.guard';
import { BookingsModule } from '../bookings/bookings.module';
import { BookingsService } from '../bookings/bookings.service';

@Module({
  imports: [AuthModule, BookingsModule],
  providers: [RemoveBooking, AuthenticationGuard, BookingsService],
  exports: [RemoveBooking],
})
export class CommandsModule {}
