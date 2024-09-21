import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { createGrupoDto } from './dto/GruposDto/create-grupos.dto';
import { updateGruposDto } from './dto/GruposDto/update-grupos.dto';

@Controller('chats')
@ApiTags('Grupos y Comunidades')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }

  @Post()
  @ApiOperation({ summary: 'Create new group or community' })
  create(@Body() createGrupoDto: createGrupoDto) {
    return this.chatsService.create(createGrupoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all the groups or communities' })
  findAll() {
    return this.chatsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a group or community' })
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update group or community info' })
  update(@Param('id') id: string, @Body() updateGruposDto: updateGruposDto) {
    return this.chatsService.update(+id, updateGruposDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a group or community' })
  remove(@Param('id') id: string) {
    return this.chatsService.remove(+id);
  }
}
