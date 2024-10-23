import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SolicitudesAmistadService } from "../services/solicitudesAmistad.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { Status } from "src/config/enums/status.enum";

@Controller('friend-request')
@ApiTags('solicitudes de amistad')
@UseGuards(AuthGuard)
export class solicitudesController {
    constructor(
        private readonly solicitudesAmistadService: SolicitudesAmistadService
    ) { }

    @Post('request/:userRecibeId')
    @ApiOperation({ summary: 'Send friends request' })
    async FriendRequestSent(
        @Param('userRecibeId') userRecibeId: number,
        @Request() req: any
    ) {
        const userEnviaId = req.user
        return this.solicitudesAmistadService.sendFriendRequest(userEnviaId.id, userRecibeId);
    }

    @Get('user/received')
    @ApiOperation({ summary: 'all friend requested received for an user' })
    async receivedRequest(
        @Request() req: any
    ) {
        const userId = req.user
        return this.solicitudesAmistadService.findAllReceiveRequest(userId);
    }

    @Patch('request/:requestId/status')
    @ApiOperation({ summary: 'update status from friend request' })
    async updateRequestStatus(
        @Param('requestId') requestId: number,
        @Request() req: any,
        @Body('newStatus') newStatus: Status
    ) {
        const userId = req.user
        if (!Object.values(Status).includes(newStatus)) {
            throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
        }
        return this.solicitudesAmistadService.updateRequest(requestId, userId, newStatus);
    }

    @Delete(':requestId')
    @ApiOperation({ summary: 'delete a friend request' })
    async deleteRequest(
        @Param('requestId') requestId: number,
        @Request() req: any
    ) {
        const userId = req.user
        return this.solicitudesAmistadService.deleteRequest(requestId, userId);
    }
}