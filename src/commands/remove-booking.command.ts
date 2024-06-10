import { Command, CommandRunner, Option } from 'nest-commander';
import { AuthService } from '../auth/auth.service';
import { IAuthOptions, IRemoveBookingOptions } from './intefaces.commands';
import { UsersService } from '../users/users.service';
import { Role } from '../users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { BookingsService } from '../bookings/bookings.service';

@Command({ name: 'RemoveBooking', description: 'Removes booking' })
export class RemoveBooking extends CommandRunner {
  constructor(
    private readonly authService: AuthService,
    private readonly bookingService: BookingsService,
  ) {
    super();
  }

  async run(
    _: string[],
    options?: IRemoveBookingOptions & IAuthOptions,
  ): Promise<void> {
    const user = await this.authService.getJWTPayload(options.token);
    if (user.role !== Role.ADMIN) {
      throw NotFoundException;
    }
    this.bookingService.remove(options.bookingId);
  }

  @Option({
    flags: '-t, --token [string]',
    description: 'Auth token',
  })
  parseToken(val: string): string {
    return val;
  }

  @Option({
    flags: '-b, --bookingId [string]',
    description: 'Booking id to delete',
  })
  parseNumber(val: string): number {
    return parseInt(val);
  }
}
