import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/constants/bycript.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async createUser(createUser: CreateUserDto) {
    createUser.password = bcrypt.hashSync(createUser.password, SALT_ROUNDS)
    const exists = await this.userRepository.findOne({
      where: { email: createUser.email }
    })
    if (exists) {
      throw new HttpException('user already exist', HttpStatus.CONFLICT)
    }
    const user = await this.userRepository.save(createUser)

    return user
  }

  findAllUsers() {

  }

  async findOneUser(id: number) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return user
  }

  async update(id: number, updateUser: UpdateUserDto) {
    if (updateUser.password) {
      updateUser.password = await bcrypt.hashSync(updateUser.password, SALT_ROUNDS)
    }

    const newData = await this.userRepository.update(id, updateUser)

    if (newData.affected === 0) {
      throw new HttpException("User haven't been update", HttpStatus.CONFLICT)
    }
    return newData
  }

  async remove(id: number) {
    const userDelete = await this.userRepository.delete(id)

    if (!userDelete) {
      throw new HttpException("User can't be delete", HttpStatus.CONFLICT)
    }
  }
}
