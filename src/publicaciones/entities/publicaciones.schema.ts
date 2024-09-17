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
        default: () => new Types.ObjectId
    })
    id: Types.ObjectId

    @Prop({
        unique: true
    })
    publicacionId: number

    @Prop()
    comentarios: comentariosSchema

}

export const publicacionModelSchema = SchemaFactory.createForClass(publicacionesSchema)