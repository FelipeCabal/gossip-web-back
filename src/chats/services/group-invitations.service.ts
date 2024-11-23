import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitacionesGrupos } from '../entities/invitaciones.entity';
import { UsersService } from 'src/users/services/users.service';
import { GroupChatsService } from './gruop-chats.service';
import { Status } from 'src/config/enums/status.enum';

@Injectable()
export class GroupInvitationsService {
    constructor(
        @InjectRepository(InvitacionesGrupos)
        private readonly groupInvitationRepository: Repository<InvitacionesGrupos>,

        private readonly usersService: UsersService,

        private readonly groupService: GroupChatsService,
    ) { }

    async createInvitation(senderId: number, receiverId: number, groupId: number): Promise<InvitacionesGrupos> {
        const sender = await this.usersService.findOneUser(senderId);
        const receiver = await this.usersService.findOneUser(receiverId);

        if (senderId === receiverId) {
            throw new Error('No puedes invitarte a ti mismo.');
        }

        const group = await this.groupService.findGroupById(groupId);

        if (group.miembros.some((miembro) => miembro.id === receiverId)) {
            throw new Error('El usuario ya pertenece al grupo.');
        }

        const newInvitation = this.groupInvitationRepository.create({
            user: receiver,
            grupo: group,
            status: Status.Pendiente,
        });

        return await this.groupInvitationRepository.save(newInvitation);
    }

    async acceptInvitation(invitationId: number): Promise<void> {
        const invitation = await this.groupInvitationRepository.findOne({
            where: { id: invitationId },
            relations: ['grupo', 'user'],
        });

        if (!invitation) {
            throw new NotFoundException('Invitación no encontrada.');
        }

        if (invitation.status !== Status.Pendiente) {
            throw new Error('La invitación ya fue procesada.');
        }

        invitation.status = Status.Aceptada;
        await this.groupInvitationRepository.save(invitation);

        try {
            await this.groupService.addUserToGroup(invitation.grupo.id, invitation.user);
        } catch (error) {
            throw new Error(`Error al agregar usuario al grupo: ${error.message}`);
        }
    }

    async rejectInvitation(invitationId: number): Promise<void> {
        const invitation = await this.groupInvitationRepository.findOne({
            where: { id: invitationId },
        });

        if (!invitation) {
            throw new NotFoundException('Invitación no encontrada.');
        }

        await this.groupInvitationRepository.remove(invitation);
    }

    async findUserInvitations(userId: number): Promise<InvitacionesGrupos[]> {
        return await this.groupInvitationRepository.find({
            where: { user: { id: userId } },
            relations: ['grupo', 'user'],
        })
    }
}
