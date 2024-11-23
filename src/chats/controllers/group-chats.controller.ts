import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { GroupChatsService } from "../services/gruop-chats.service";
import { createGrupoDto } from "../dto/GruposDto/create-grupos.dto";
import { Grupos } from "../entities/chats.entity";
import { updateGruposDto } from "../dto/GruposDto/update-grupos.dto";

@Controller('group')
@ApiTags('group-chats')
@UseGuards(AuthGuard)
export class GroupChatsController {
    constructor(private readonly groupChatsService: GroupChatsService) { }

    @Post()
    @ApiOperation({ summary: 'Create Group' })
    create(
        @Body() createChatDto: createGrupoDto
    ) {
        return this.groupChatsService.create(createChatDto)
    }

    @Get()
    @ApiOperation({ summary: 'Get all users group' })
    findAllGroupsByUser(@Request() req: any) {
        const userId = req.user.id
        return this.groupChatsService.findAll(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: "Get a group chat" })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.groupChatsService.findGroupById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: "Update a group chat" })
    async updateGroup(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateChatDto: updateGruposDto,
    ): Promise<Grupos> {
        return await this.groupChatsService.update(id, updateChatDto);
    }

    @Delete(':groupId/usuarios/:userId')
    @ApiOperation({ summary: "Delete an user from group chat" })
    async removeUserFromGroup(
        @Param('groupId', ParseIntPipe) groupId: number,
        @Param('userId', ParseIntPipe) userId: number,
    ): Promise<Grupos> {
        return await this.groupChatsService.removeUserFromGroup(groupId, userId);
    }


    @Delete(':id')
    @ApiOperation({ summary: "Delete a group chat" })
    async removeGroup(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.groupChatsService.remove(id);
    }

}