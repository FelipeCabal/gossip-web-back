import { Controller, Delete, Get, Param, Request, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PrivateChatsService } from "../services/private-chats.service";
import { AuthGuard } from "src/auth/guards/auth.guard";

@Controller('private')
@ApiTags('private-chats')
@UseGuards(AuthGuard)
export class PrivateChatsController {
    constructor(private readonly privateChatsService: PrivateChatsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all the groups or communities' })
    findAllPrivateChats(@Request() req: any) {
        const userId = req.user.id
        return this.privateChatsService.findAllUserChats(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: "Get a chat" })
    findOne(@Param('id') id: string) {
        return this.privateChatsService.findOne(+id);
    }

}