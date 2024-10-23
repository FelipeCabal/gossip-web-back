import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { comentariosSchema } from './entities/comentarios.schema';
import { Model } from 'mongoose';
import { CreateComentariosDto } from './dto/create-comentarios.dto';
import { PublicacionesService } from '../publicaciones.service';


@Injectable()
export class ComentariosService {
    constructor
        (
            private readonly publicacionesService: PublicacionesService,
            @InjectModel(comentariosSchema.name) private comentariosModel: Model<comentariosSchema>
        ) { }

    /**
     * 
     * @param postId 
     * @param createComentarioDto 
     * @returns 
     */
    async create(postId: number, createComentarioDto: CreateComentariosDto) {
        const postToComment = await this.publicacionesService.findOne(postId);

        if (!postToComment) {
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
        }

        const newComment = new this.comentariosModel({
            postId,
            ...createComentarioDto
        });

        return newComment.save();
    }

    /**
     * 
     * @param postId 
     * @returns 
     */
    async findAllComments(postId: number) {
        const comments = await this.comentariosModel.find({ postId }).exec();
        return comments;
    }

    /**
     * 
     * @param commentId 
     * @param userId 
     * @returns 
     */
    async deleteComment(commentId: string, userId: number) {
        const comment = await this.comentariosModel.findById(commentId);
        if (!comment) {
            throw new HttpException('comment not found', HttpStatus.NOT_FOUND);
        }

        const post = await this.publicacionesService.findOne(comment.postId);
        if (!post) {
            throw new HttpException('post not found', HttpStatus.NOT_FOUND);
        }
        const ownerComment = comment.usuarioId === userId;
        const ownerPost = post.user.id === userId;

        if (!ownerComment && !ownerPost) {
            throw new HttpException('You dont have permission for this action', HttpStatus.UNAUTHORIZED);
        }
        return await this.comentariosModel.findByIdAndDelete(commentId);
    }
}
