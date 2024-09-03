import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionesDto } from './dto/create-publicacione.dto';
import { UpdatePublicacionesDto } from './dto/update-publicacione.dto';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) { }

  @Post()
  create(@Body() createPublicacionesDto: CreatePublicacionesDto) {
    return this.publicacionesService.create(createPublicacionesDto);
  }

  @Get()
  findAll() {
    return this.publicacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicacionesDto: UpdatePublicacionesDto) {
    return this.publicacionesService.update(+id, updatePublicacionesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionesService.remove(+id);
  }
}
