import { Controller, Post, Body, UseGuards, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MessagesService } from '../services/mensajes.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateMessageDto } from '../dto/mensajesDto/create-mensaje.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('mensajes')
@ApiTags('mensajes')
@UseGuards(AuthGuard)
export class MensajesController {
    constructor(private readonly mensajesService: MessagesService) { }

    @Post('send')
    @ApiOperation({ summary: 'Send Message to Group' })
    async sendMessage(@Body() createMessageDto: CreateMessageDto) {
        return await this.mensajesService.createMessage(createMessageDto);
    }

    @Get(':groupId/type/:type')
    @ApiOperation({ summary: 'Send Message to Group' })
    async findAllMessages(
        @Param('groupId', ParseIntPipe) groupId: number,
        @Param('type') type: string,
    ) {
        return await this.mensajesService.findMessagesByChatId(groupId, type)

    }
}
