import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicacionesDto } from './create-publicacione.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdatePublicacionesDto extends PartialType(CreatePublicacionesDto) {
    @IsString()
    description?: string

    @IsBoolean()
    esAnonimo?: boolean;

}
