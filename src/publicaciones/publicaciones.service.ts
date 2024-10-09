import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePublicacionesDto } from './dto/create-publicacione.dto';
import { UpdatePublicacionesDto } from './dto/update-publicacione.dto';
import { UsersService } from 'src/users/users.service';
import { Publicaciones } from './entities/publicaciones.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class PublicacionesService {

  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Publicaciones)
    private readonly publicacionesRepository: Repository<Publicaciones>

  ) { }


  /**
   * Create new post
   * @param userId id from post' creator 
   * @param createPublicacionesDto data to create a new post
   * @returns post newly created 
   */
  async create(userId: number, createPublicacionesDto: CreatePublicacionesDto) {
    if (createPublicacionesDto.esAnonimo === true) {
      const newPost = await this.publicacionesRepository.create(createPublicacionesDto);

      return this.publicacionesRepository.save(newPost);
    }

    const user = await this.usersService.findOneUser(userId);
    const newPost = await this.publicacionesRepository.create(createPublicacionesDto);
    newPost.user = user;

    return this.publicacionesRepository.save(newPost)
  }

  /**
   * Find all posts 
   * @returns array with all posts done 
   * @throws {HttpException} if there are not posts
   */
  async findAll() {
    const publicaciones = await this.publicacionesRepository
      .createQueryBuilder('publicaciones')
      .leftJoinAndSelect('publicaciones.user', 'users')
      .orderBy('publicaciones.id', 'DESC')
      .getMany();

    if (!publicaciones.length) {
      throw new HttpException('posts not found', HttpStatus.NOT_FOUND);
    }
    return publicaciones;
  }

  /**
   * Find one post 
   * @param id from post that being searched
   * @returns post with the given id 
   * @throws {HttpException} if there is not post
   */
  async findOne(id: number) {
    const publicacion = await this.publicacionesRepository.findOne({
      where: { id: id.toString() },
      relations: ['users'],
    });

    if (!publicacion) {
      throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    }
    return publicacion;
  }

  /**
   * findByUser
   * @param user is the id from users that have created post 
   * @returns all posts that have been created for the given user
   * @throws {HttpException} if the user not found 
   */
  async findByUser(userId: number) {
    const userPosts = await this.publicacionesRepository
      .createQueryBuilder('publicaciones')
      .leftJoinAndSelect('publicaciones.user', 'users')
      .where('users.id = :userId', { userId })
      .orderBy('publicaciones.id', 'DESC')
      .getMany();

    if (!userPosts.length) {
      throw new HttpException("user's posts not found", HttpStatus.NOT_FOUND);
    }
    return userPosts;
  }

  /**
   * update 
   * @param id from post that is being updated
   * @param updatePublicacionesDto updated data 
   * @returns post updted
   * @throws {HttpException} if there is not post
   */
  async update(id: number, updatePublicacionesDto: UpdatePublicacionesDto) {
    const updatePost = await this.publicacionesRepository.update(id, updatePublicacionesDto);
    if (updatePost.affected === 0) {
      throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    }
    return updatePost;
  }

  /**
   * remove
   * @param id from post that is deleted 
   * @returns post deleted 
   * @throws {HttpException} if there it not post
   */
  async remove(id: number) {
    const deletePost = await this.publicacionesRepository.delete(id);
    if (deletePost.affected === 0) {
      throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    }
    return deletePost;
  }
}
