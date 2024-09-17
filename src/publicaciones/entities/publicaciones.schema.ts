import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { comentariosSchema } from "./comentarios.schema";


@Schema({
    timestamps: true
})
export class publicacionesSchema {

    @Prop({
        unique: true,
        type: Types.ObjectId,
        default: () => new Types.ObjectId()

    })
    publicacionId: Types.ObjectId

    comentario: comentariosSchema

}

export const publicacionModelSchema = SchemaFactory.createForClass(publicacionesSchema)