import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({
    timestamps: true
})
export class mensajesSchema {

    @Prop({
        unique: true,
        type: Types.ObjectId,
        default: () => new Types.ObjectId()
    })
    mensajeId: Types.ObjectId

    @Prop({
        unique: true
    })
    usuarioId: number

    @Prop({
        trim: true
    })
    mensajes: string
}

export const mensajeModelSchema = SchemaFactory.createForClass(mensajesSchema)