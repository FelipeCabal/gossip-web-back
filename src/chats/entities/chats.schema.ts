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
        default: () => new Types.ObjectId()
    })
    chatId: Types.ObjectId

    @Prop({
        trim: true
    })
    mensaje: mensajesSchema
}

export const chatModelSchema = SchemaFactory.createForClass(chatsSchema)