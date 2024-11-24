import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserQueries {
    @IsNumber()
    @IsOptional()
    limit?: number;

    @IsString()
    @IsOptional()
    search?: string;

    @IsString()
    @IsOptional()
    country?: string
}