import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { comentariosSchema } from "../comentarios/entities/comentarios.schema";


@Schema({
    timestamps: true
})
export class publicacionesSchema {

    @Prop({
        required: true
    })
    publicacionId: number

    @Prop()
    comentarios: comentariosSchema

}

export const publicacionModelSchema = SchemaFactory.createForClass(publicacionesSchema)