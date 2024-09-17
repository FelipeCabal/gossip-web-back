import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { mensajesSchema } from "./mensajes.schema";

@Schema({
    timestamps: true
})
export class chatsSchema {

    @Prop({
        unique: true,
        type: Types.ObjectId,
        default: () => new Types.ObjectId
    })
    id: Types.ObjectId

    @Prop({
        unique: true
    })
    chatId: number

    @Prop()
    mensajes: mensajesSchema
}

export const chatModelSchema = SchemaFactory.createForClass(chatsSchema)