import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
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
        @Body('userEnviaId') userEnviaId: number
    ) {
        return this.solicitudesAmistadService.sendFriendRequest(userEnviaId, userRecibeId);
    }

    @Get('user/received')
    @UseGuards(AuthGuard)
    async receivedRequest(
        @Body('userId') userId: number
    ) {
        return this.solicitudesAmistadService.findAllReceiveRequest(userId);
    }

    @Post('request/:requestId/status')
    @UseGuards(AuthGuard)
    async updateRequestStatus(
        @Param('requestId') requestId: number,
        @Body('userId') userId: number,
        @Body('newStatus') newStatus: Status
    ) {
        if (!Object.values(Status).includes(newStatus)) {
            throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
        }

        return this.solicitudesAmistadService.updateRequest(requestId, userId, newStatus);
    }

    @Delete(':requestId')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'delete a friend request' })
    async deleteRequest(
        @Param('requestId') requestId: number,
        @Body('userId') userId: number
    ) {
        return this.solicitudesAmistadService.deleteRequest(requestId, userId);
    }
}