import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ComentariosService } from './comentarios.service';
import { CreateComentariosDto } from './dto/create-comentarios.dto';
import { IsPrivate } from 'src/auth/decorators/isPrivate.decorator';

@Controller('posts/comments')
@ApiTags('comments')
@UseGuards(AuthGuard)

export class ComentariosController {
    constructor(
        private readonly comentariosService: ComentariosService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new comment' })
    create(
        @Body() createComentariosDto: CreateComentariosDto,
        @Request() req: any
    ) {
        const post = req.postId
        return this.comentariosService.create(post.id, createComentariosDto)
    }

    @Get(':postId')
    @ApiOperation({ summary: 'Get all comments from a post' })
    findAll(
        @Param('postId') postId: string,
    ) {
        return this.comentariosService.findAllComments(+postId)
    }

    @Delete(':id')
    @IsPrivate()
    @ApiOperation({ summary: 'Delete a comment' })
    delete(
        @Param('id') id: string,
        @Request() req: any
    ) {
        const usuario = req.usarioId
        return this.comentariosService.deleteComment(id, usuario.id)
    }
}
