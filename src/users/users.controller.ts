import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUsersController, IUsersService } from './users.interfaces';
import { UsersService } from './users.service';
import { CredentialsDto } from './dto/credentials.dto';
import { GetUserDto } from './dto/get-user.dto';
import { AuthService } from '../auth/auth.service';
import { IAuthService } from '../auth/auth.interfaces';
import { Cookies } from '../constants/constants';
import { AuthenticationGuard } from '../auth/authentification.guard';
import { Roles } from './entities/roles.decorator';
import { Role } from './entities/user.entity';

@Controller('users')
export class UsersController implements IUsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: IUsersService,
    @Inject(AuthService) private readonly authService: IAuthService,
  ) {}

  @Post('signIn')
  async signIn(
    @Res() response: Response,
    @Body() credentials: CredentialsDto,
  ): Promise<GetUserDto> {
    try {
      const user = await this.usersService.findOne({
        username: credentials.login,
      });
      await this.authService.authenticate(user, credentials.password);
      const jwt = await this.authService.getJWToken(user);
      const responseUser = this.usersService.castUserToGetUserDto(user);
      response.cookie(Cookies.User, jwt);
      response.json(responseUser);
      return responseUser;
    } catch (ex) {
      throw NotFoundException;
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return this.usersService.castUserToGetUserDto(user);
    } catch (ex) {
      throw ex;
    }
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  @Roles(Role.ADMIN)
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return users.map(this.usersService.castUserToGetUserDto);
    } catch (ex) {
      throw ex;
    }
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.findOneById(+id);
      return this.usersService.castUserToGetUserDto(user);
    } catch (ex) {
      throw ex;
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return this.usersService.castUserToGetUserDto(user);
    } catch (ex) {
      throw ex;
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.usersService.remove(+id);
    } catch (ex) {
      throw ex;
    }
  }
}
