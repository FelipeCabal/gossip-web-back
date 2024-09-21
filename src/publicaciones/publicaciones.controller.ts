import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionesDto } from './dto/create-publicacione.dto';
import { UpdatePublicacionesDto } from './dto/update-publicacione.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('publicaciones')
@ApiTags('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) { }

  @Post()
  @ApiOperation({ summary: "Create a new posts" })
  create(@Body() createPublicacionesDto: CreatePublicacionesDto) {
    return this.publicacionesService.create(createPublicacionesDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all posts" })
  findAll() {
    return this.publicacionesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Get a posts" })
  findOne(@Param('id') id: string) {
    return this.publicacionesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update a posts" })
  update(@Param('id') id: string, @Body() updatePublicacionesDto: UpdatePublicacionesDto) {
    return this.publicacionesService.update(+id, updatePublicacionesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Delete a posts" })
  remove(@Param('id') id: string) {
    return this.publicacionesService.remove(+id);
  }
}
