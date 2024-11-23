import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grupos } from '../entities/chats.entity';
import { User } from 'src/users/entities/user.entity';
import { createGrupoDto } from '../dto/GruposDto/create-grupos.dto';
import { updateGruposDto } from '../dto/GruposDto/update-grupos.dto';

@Injectable()
export class GroupChatsService {
    constructor(
        @InjectRepository(Grupos)
        private readonly groupRepository: Repository<Grupos>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createChatDto: createGrupoDto): Promise<Grupos> {
        const newGroup = this.groupRepository.create(createChatDto);
        return await this.groupRepository.save(newGroup);
    }

    async findAll(userId: number): Promise<Grupos[]> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['grupos'],
        });

        if (!user) {
            throw new NotFoundException('Usuario no encontrado.');
        }

        return user.grupos;
    }

    async findGroupById(id: number): Promise<Grupos> {
        const group = await this.groupRepository.findOne({
            where: { id },
            relations: ['miembros'],
        });

        if (!group) {
            throw new NotFoundException(`Grupo con ID ${id} no encontrado.`);
        }

        return group;
    }

    async addUserToGroup(groupId: number, user: User): Promise<Grupos> {
        const group = await this.findGroupById(groupId);

        if (group.miembros.some((miembro) => miembro.id === user.id)) {
            throw new NotFoundException(`El usuario ya pertenece al grupo.`);
        }

        group.miembros.push(user);
        return await this.groupRepository.save(group);
    }

    async removeUserFromGroup(groupId: number, userId: number): Promise<Grupos> {
        const group = await this.findGroupById(groupId);
        const user = group.miembros.find((miembro) => miembro.id === userId);

        if (!user) {
            throw new NotFoundException(`El usuario no está en este grupo.`);
        }

        group.miembros = group.miembros.filter((miembro) => miembro.id !== userId);
        return await this.groupRepository.save(group);
    }

    async update(id: number, updateChatDto: updateGruposDto): Promise<Grupos> {
        const group = await this.findGroupById(id);

        Object.assign(group, updateChatDto);
        return await this.groupRepository.save(group);
    }

    async remove(id: number): Promise<void> {
        const group = await this.findGroupById(id);
        await this.groupRepository.remove(group);
    }
}
