import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  @ApiOperation({ summary: 'Create a new User' })
  //@ApiResponse({ status: 200, description: '' })
  async create(@Body() createUser: CreateUserDto) {
    return this.usersService.createUser(createUser);
  }

  @Get(':id/friends')
  @ApiOperation({ summary: "Get all friends from an user" })
  findAll(
    @Request() req: any
  ) {
    const userId = req.user
    return this.usersService.findAllFriends(userId.id);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get an User' })
  async findOne(@Param('id') id: number) {
    return this.usersService.findOneUser(id);
  }


  @Patch(':id')
  @ApiOperation({ summary: "Update the User's info" })
  async update(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
    return this.usersService.update(id, updateUser);
  }


  @Delete(':id')
  @ApiOperation({ summary: "Delete an User" })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
