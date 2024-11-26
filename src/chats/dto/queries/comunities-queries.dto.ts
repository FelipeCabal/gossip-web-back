import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ComunityAndGroupQueries {
    @IsNumber()
    @IsOptional()
    limit?: number;

    @IsString()
    @IsOptional()
    search?: string;

}