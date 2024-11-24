import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Mensajes extends Document {
    @Prop({ required: true })
    usuarioId: number;

    @Prop({ required: true, trim: true })
    mensaje: string;

    @Prop({ required: true })
    chatId: string;

    @Prop({ required: true })
    chatType: string; // Tipo de chat: 'private', 'group', 'community'
}

export const MensajesSchema = SchemaFactory.createForClass(Mensajes);
