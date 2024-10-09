import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionesDto } from './dto/create-publicacione.dto';
import { UpdatePublicacionesDto } from './dto/update-publicacione.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('publicaciones')
@ApiTags('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) { }

  /**
   * ENDPOINT to create a new post 
   * @param createPublicacionesDto data to create a new post
   * @returns post newly created
   */
  @Post()
  @Public()
  @ApiOperation({ summary: "Create a new posts" })
  create(
    @Body() createPublicacionesDto: CreatePublicacionesDto,
    @Request() req: any,
  ) {
    const usuario = req.user
    return this.publicacionesService.create(usuario.id, createPublicacionesDto);
  }


  /**
   * ENDPOINT to get all posts 
   * @returns array with all posts
   */
  @Get()
  @Public()
  @ApiOperation({ summary: "Get all posts" })
  findAll() {
    return this.publicacionesService.findAll();
  }


  /**
   * ENDPOINT to get one post
   * @param id from post that is searched 
   * @returns post searched
   */
  @Get(':id')
  @ApiOperation({ summary: "Get a post" })
  findOne(@Param('id') id: string) {
    return this.publicacionesService.findOne(+id);
  }


  /**
   * ENDPOINT to get all post from an user 
   * @param user id from user
   * @returns all an user's post
   */
  @Get('user/:user')
  @ApiOperation({ summary: "Get all an user's posts" })
  findByUser(@Param('user') user: number) {
    return this.publicacionesService.findByUser(user);
  }


  /**
   * ENDPOINT to update a post
   * @param id from post 
   * @param updatePublicacionesDto update data
   * @returns post updated 
   */
  @Patch(':id')
  @ApiOperation({ summary: "Update a posts" })
  update(@Param('id') id: string, @Body() updatePublicacionesDto: UpdatePublicacionesDto) {
    return this.publicacionesService.update(+id, updatePublicacionesDto);
  }


  /**
   * ENDPOINT to delete a post
   * @param id from post
   * @returns post deleted
   */
  @Delete(':id')
  @ApiOperation({ summary: "Delete a posts" })
  remove(@Param('id') id: string) {
    return this.publicacionesService.remove(+id);
  }
}
