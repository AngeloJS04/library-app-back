import { IsString, IsInt, IsOptional, IsBoolean, IsArray, IsUUID, IsNumber } from 'class-validator';

export class SearchBooksDto {
    @IsString()
    @IsOptional()
    author?: string;

    @IsString()
    @IsOptional()
    year?: number;

    @IsString()
    @IsOptional()
    genre?: string

    // @IsString()
    // @IsOptional()
    // name?: string

}
