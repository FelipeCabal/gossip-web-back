import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SolicitudAmistad } from "../entities/solicitud.entity";
import { UsersService } from "./users.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Status } from "src/config/enums/status.enum";

export class SolicitudesAmistadService {
    constructor(
        private readonly usersService: UsersService,
        @InjectRepository(SolicitudAmistad)
        private readonly solicitudRepository: Repository<SolicitudAmistad>
    ) { }

    async sendFriendRequest(userSendId: number, userReceiveId: number) {
        const userSend = await this.usersService.findOneUser(userSendId);
        const userReceive = await this.usersService.findOneUser(userReceiveId);

        if (!userSend || !userReceive) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        if (userSend === userReceive) {
            throw new HttpException("You cann't to send request to yourself", HttpStatus.BAD_REQUEST);
        }

        const requestExistitng = await this.solicitudRepository.findOne({
            where: [
                { userEnvia: userSend, userRecibe: userReceive, status: Status.Pendiente },
                { userEnvia: userReceive, userRecibe: userSend, status: Status.Pendiente }
            ]
        });

        if (requestExistitng) {
            throw new HttpException("request already exists", HttpStatus.CONFLICT);
        }

        const friendRequest = this.solicitudRepository.create({
            userEnvia: userSend,
            userRecibe: userReceive,
            status: Status.Pendiente
        });

        await this.solicitudRepository.save(friendRequest);

        return friendRequest;
    }

    async findAllReceiveRequest(userId: number) {
        const user = await this.usersService.findOneUser(userId);

        if (!user) {
            throw new HttpException("user not found", HttpStatus.NOT_FOUND);
        }

        const receiveReq = await this.solicitudRepository.find({
            where: {
                userRecibe: user,
                status: Status.Pendiente
            },
            relations: ['userEnvia']
        })

        return receiveReq;
    }

    async findOneReq(requestId: number) {
        const friendRequest = await this.solicitudRepository
            .createQueryBuilder('solicitud')
            .leftJoinAndSelect('solicitud.userEnvia', 'userEnvia')
            .leftJoinAndSelect('solicitud.userRecibe', 'userRecibe')
            .where('solicitud.id = :requestId', { requestId })
            .getOne();

        return friendRequest;
    }

    async updateRequest(requestId: number, userId: number, newStatus: Status) {
        const request = await this.findOneReq(requestId);

        if (!request) {
            throw new HttpException("request not found", HttpStatus.NOT_FOUND);
        }

        if (request.userRecibe.id !== userId) {
            throw new HttpException("You don't authorized for this action", HttpStatus.UNAUTHORIZED);
        }

        if (newStatus === Status.Aceptada) {
            return this.solicitudRepository.update(
                { id: requestId }, { status: Status.Aceptada });
        }
        if (newStatus === Status.Rechazada) {
            return this.solicitudRepository.update(
                { id: requestId },
                { status: Status.Rechazada });
        }
        throw new HttpException("invalid action", HttpStatus.BAD_REQUEST);
    }

    async deleteRequest(requestId: number, userId: number) {
        const user = await this.usersService.findOneUser(userId);

        if (!user) {
            throw new HttpException("user not found", HttpStatus.NOT_FOUND);
        }
        const friendRequest = await this.findOneReq(requestId);

        if (!friendRequest) {
            throw new HttpException("friend request not found", HttpStatus.NOT_FOUND);
        }

        if (friendRequest.userEnvia.id !== userId) {
            throw new HttpException("You don't have authorization for this action", HttpStatus.UNAUTHORIZED);
        }

        const deleteRequest = await this.solicitudRepository.delete({ id: requestId });
        if (deleteRequest.affected === 0) {
            throw new HttpException("The request wasn't deleted", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return deleteRequest
    }
}
