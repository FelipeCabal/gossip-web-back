import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { mensajesSchema } from "./mensajes.schema";

@Schema({
    timestamps: true
})
export class chatsSchema {

    @Prop({
        unique: true
    })
    chatId: number

    @Prop({
        trim: true
    })
    mensajes: mensajesSchema
}

export const chatModelSchema = SchemaFactory.createForClass(chatsSchema)