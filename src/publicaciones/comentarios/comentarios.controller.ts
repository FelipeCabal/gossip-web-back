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

    @Post(':post')
    @ApiOperation({ summary: 'Create a new comment' })
    create(
        @Body() createComentariosDto: CreateComentariosDto,
        @Param('post') post: string,
        @Request() req
    ) {
        const userId = req.user;
        console.log("userId", userId)
        return this.comentariosService.create(createComentariosDto, +post, userId.id)
    }

    @Get(':postId')
    @ApiOperation({ summary: 'Get all comments from a post' })
    async findAll(
        @Param('postId') postId: string,
    ) {
        return this.comentariosService.findAllComments(+postId)
    }

    @Delete(':post/:commentId')
    @IsPrivate()
    @ApiOperation({ summary: 'Delete a comment' })
    async delete(
        @Param('commentId') commentId: string,
        @Param('post') post: number,
        @Request() req: any
    ) {
        const usuario = req.user
        return this.comentariosService.deleteComment(commentId, usuario.id, post)
    }
}
