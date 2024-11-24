import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MessagesService } from '../services/mensajes.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateMessageDto } from '../dto/mensajesDto/create-mensaje.dto';

@Controller('mensajes')
export class MensajesController {
    constructor(private readonly mensajesService: MessagesService) { }

    @UseGuards(AuthGuard)
    @Post('send')
    async sendMessage(@Body() createMessageDto: CreateMessageDto) {
        return await this.mensajesService.createMessage(createMessageDto);
    }
}
