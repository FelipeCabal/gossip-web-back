import { Controller, Post, Param, UseGuards, Req, Get } from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('likes')
@UseGuards(AuthGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @Post(':postId')
  async manejoLikes(
    @Param('postId') postId: number,
    @Req() req: any
  ) {
    const userId = req.user;
    return this.likesService.manejoLikes(userId.id, postId);
  }

  @Get(':postId')
  async findAllLikes(
    @Param('postId') postId: number
  ) {
    return this.likesService.findAllLikes(postId);
  }

  @Get('like/:likeId')
  async findOneLike(
    @Param('likeId') likeId: number
  ) {
    return this.likesService.findOneLike(likeId);
  }
}
