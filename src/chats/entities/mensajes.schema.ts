import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({
    timestamps: true
})
export class mensajesSchema {

    @Prop({
        required: true
    })
    usuarioId: number

    @Prop({
        trim: true
    })
    mensaje: string
}

export const mensajeModelSchema = SchemaFactory.createForClass(mensajesSchema)