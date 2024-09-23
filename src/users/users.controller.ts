import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  @ApiOperation({ summary: 'Create a new User' })
  //@ApiResponse({ status: 200, description: '' })
  async create(@Body() createUser: CreateUserDto) {
    return this.usersService.createUser(createUser);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }


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
