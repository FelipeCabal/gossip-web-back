import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({
    timestamps: true
})
export class comentariosSchema {

    @Prop({
        unique: true,
        type: Types.ObjectId,
        default: () => new Types.ObjectId()
    })
    comentarioId: Types.ObjectId

    @Prop({
        unique: true,
        type: Types.ObjectId,
        default: () => new Types.ObjectId()
    })
    usuarioId: Types.ObjectId

    @Prop({
        trim: true
    })
    comentario: string
}

export const comentarioModelSchema = SchemaFactory.createForClass(comentariosSchema)